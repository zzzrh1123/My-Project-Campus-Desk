(() => {
    "use strict";

    const storageKey = "campus-desk-transition-v1";
    const duration = 1580;
    const moveRunDuration = 1450;
    const routeTypes = new Map([
        ["study.html", "study"],
        ["loadout.html", "loadout"],
        ["move.html", "move"]
    ]);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const transitionPreview = window.self !== window.top
        && new URLSearchParams(window.location.search).has("transition-preview");

    const safeRead = () => {
        try {
            const value = sessionStorage.getItem(storageKey);
            return value ? JSON.parse(value) : null;
        } catch (error) { return null; }
    };
    const safeWrite = value => {
        try { sessionStorage.setItem(storageKey, JSON.stringify(value)); } catch (error) {}
    };
    const safeRemove = () => {
        try { sessionStorage.removeItem(storageKey); } catch (error) {}
    };
    const pageName = href => new URL(href, window.location.href).pathname.split("/").pop();
    const stickStudent = className => `
        <svg class="transition-student ${className}" viewBox="0 0 130 180" aria-hidden="true">
            <circle class="student-head" cx="75" cy="25" r="17"></circle>
            <path d="M70 44 L62 88"></path>
            <path class="runner-arm-back" d="M68 52 L42 74 L25 96"></path>
            <path class="runner-arm-front" d="M69 52 L91 68 L108 83"></path>
            <path class="runner-leg-back" d="M62 88 L45 124 L27 151"></path>
            <path class="runner-leg-front" d="M62 88 L81 121 L98 151"></path>
        </svg>`;

    const libraryStudent = () => `
        <svg class="transition-student library-student" viewBox="0 0 130 180" aria-hidden="true">
            <circle class="student-head" cx="75" cy="25" r="17"></circle>
            <path class="library-body" d="M72 44 Q68 74 66 105"></path>
            <path class="library-arm library-arm--back" d="M70 57 L53 78 L43 99"></path>
            <path class="library-arm library-arm--push" d="M71 57 L90 78 L108 96"></path>
            <path class="library-leg library-leg--back" d="M66 105 L48 130 L35 157"></path>
            <path class="library-leg library-leg--front" d="M66 105 L83 130 L99 157"></path>
        </svg>`;

    const runningStudent = () => `
        <svg class="transition-student runner-student" viewBox="0 0 120 180" aria-hidden="true">
            <ellipse class="runner-ground-shadow" cx="60" cy="162" rx="23" ry="4"></ellipse>
            <circle class="student-head" cx="60" cy="24" r="17"></circle>
            <path class="runner-torso" d="M60 43 L60 103"></path>
            <path class="runner-arm-left" d="M60 54 L43 73 L49 88"></path>
            <path class="runner-arm-right" d="M60 54 L77 73 L71 88"></path>
            <path class="runner-leg-left" d="M60 103 L47 129 L51 157"></path>
            <path class="runner-leg-right" d="M60 103 L73 129 L69 157"></path>
        </svg>`;

    const sceneMarkup = type => {
        if (type === "study") return `
            <div class="campus-transition__scene campus-transition--study" data-type="study">
                <div class="study-facade" aria-hidden="true"></div>
                <div class="campus-transition__light"></div><p class="campus-transition__label">Enter Study Shelf</p>
                <div class="study-arch" aria-hidden="true"></div>
                <div class="study-doorway">
                    <div class="study-interior" aria-hidden="true">
                        <iframe class="study-page-preview" src="study.html?transition-preview=1&v=16" title="" tabindex="-1"></iframe>
                    </div>
                    <div class="study-door study-door--left"></div><div class="study-door study-door--right"></div>
                </div>
                ${libraryStudent()}
            </div>`;
        if (type === "loadout") return `
            <div class="campus-transition__scene campus-transition--loadout" data-type="loadout">
                <div class="loadout-lobby"></div><p class="campus-transition__label">Enter Campus Loadout</p>
                <div class="automatic-door">
                    <iframe class="loadout-page-preview" src="loadout.html?transition-preview=1#loadout-preview" title="" tabindex="-1"></iframe>
                    <div class="door-rail"></div>
                    <div class="glass-pane glass-pane--fixed-left"></div>
                    <div class="glass-pane glass-pane--slide-left"></div>
                    <div class="glass-pane glass-pane--slide-right"></div>
                    <div class="glass-pane glass-pane--fixed-right"></div>
                </div>
                ${stickStudent("loadout-student")}
            </div>`;
        return `
            <div class="campus-transition__scene campus-transition--move" data-type="move">
                <img class="track-world" src="assets/active-breaks-track.svg" alt="" width="1600" height="1000" decoding="sync">
                <div class="track-atmosphere"></div>
                <p class="campus-transition__label">Enter Active Breaks</p>
                ${runningStudent()}
            </div>`;
    };

    const buildOverlay = (type, arrival = false) => {
        const overlay = document.createElement("div");
        overlay.className = `campus-transition campus-transition--${arrival ? "arrival" : "departure"}`;
        overlay.dataset.type = type;
        overlay.setAttribute("aria-hidden", "true");
        if (type === "move") {
            overlay.style.width = `${window.innerWidth}px`;
            overlay.style.height = `${window.innerHeight}px`;
        }
        overlay.innerHTML = arrival && type !== "move" ? "" : sceneMarkup(type);
        document.body.append(overlay);
        return overlay;
    };

    const lockMovePage = () => {
        if (document.body.classList.contains("move-transition-lock")) return;
        const gap = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.setProperty("--move-scrollbar-gap", `${gap}px`);
        document.body.classList.add("move-transition-lock", "transition-lock");
    };
    const unlockMovePage = () => {
        document.body.classList.remove("move-transition-lock", "transition-lock");
        document.body.style.removeProperty("--move-scrollbar-gap");
    };

    // Continue toward the far end of the track while dissolving into the loaded page.
    const revealMovePage = overlay => {
        const scene = overlay.querySelector(".campus-transition--move");
        if (!scene) { overlay.remove(); return; }
        scene.classList.add("is-settled");
        lockMovePage();
        const smallScreen = window.innerWidth <= 760;
        const revealDuration = smallScreen ? 880 : 1000;
        let finished = false;
        const finish = () => {
            if (finished) return;
            finished = true;
            overlay.remove();
            unlockMovePage();
        };
        if (typeof scene.animate !== "function") { finish(); return; }

        document.querySelectorAll(".active-breaks-page > .site-header, .break-main, .active-breaks-page > .site-footer").forEach(element => {
            element.animate([{ opacity: 0 }, { opacity: 0, offset: .12 }, { opacity: 1 }], {
                duration: revealDuration, easing: "ease-in-out"
            });
        });

        const zoom = smallScreen ? 1.09 : 1.15;
        const animation = scene.animate([
            { transform: "scale(1)", opacity: 1 },
            { transform: `scale(${1 + (zoom - 1) * .35})`, opacity: .76, offset: .35 },
            { transform: `scale(${zoom})`, opacity: 0 }
        ], { duration: revealDuration, easing: "cubic-bezier(.32,0,.2,1)", fill: "forwards" });
        animation.finished.then(finish, finish);
        window.setTimeout(finish, revealDuration + 180);
    };

    const showOpeningScene = type => {
        const overlay = buildOverlay(type);
        overlay.classList.add("is-opening");

        window.requestAnimationFrame(() => {
            overlay.querySelector(".campus-transition__scene")?.classList.add("is-active");
            document.documentElement.classList.remove("transition-pending");
        });

        if (type === "move") {
            lockMovePage();
            let revealing = false;
            const reveal = () => {
                if (revealing) return;
                revealing = true;
                revealMovePage(overlay);
            };
            overlay.querySelector(".runner-student")?.addEventListener("animationend", event => {
                if (event.animationName === "runner-recedes-into-distance") reveal();
            });
            window.setTimeout(reveal, moveRunDuration + 120);
            return;
        }
        const closingAt = type === "study" ? 1650 : 1380;
        window.setTimeout(() => overlay.classList.add("is-closing"), closingAt);
        window.setTimeout(() => overlay.remove(), closingAt + 380);
    };

    const showArrival = () => {
        const state = safeRead();
        const expected = pageName(window.location.href);
        const expectedType = routeTypes.get(expected);
        const isFresh = state && expectedType === state.type && Date.now() - state.startedAt < 15000;
        safeRemove();
        if (!expectedType || reducedMotion.matches) {
            document.documentElement.classList.remove("transition-pending");
            return;
        }

        if (isFresh) {
            const overlay = buildOverlay(state.type, true);
            document.documentElement.classList.remove("transition-pending");
            if (state.type === "move") {
                requestAnimationFrame(() => revealMovePage(overlay));
                return;
            }
            requestAnimationFrame(() => overlay.classList.add("is-arriving"));
            window.setTimeout(() => overlay.remove(), 620);
            return;
        }

        showOpeningScene(expectedType);
    };

    const canIntercept = event => event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
    const startDeparture = (event, link) => {
        if (!canIntercept(event) || event.defaultPrevented || reducedMotion.matches || link.target === "_blank") return;
        const file = pageName(link.href);
        const type = routeTypes.get(file);
        if (!type || file === pageName(window.location.href)) return;
        event.preventDefault();
        safeWrite({ type, startedAt: Date.now() });
        document.body.classList.add("transition-lock");
        const overlay = buildOverlay(type);
        requestAnimationFrame(() => {
            overlay.classList.add("is-active");
            overlay.querySelector(".campus-transition__scene")?.classList.add("is-active");
        });
        const destination = link.href;
        const departureDuration = type === "study" ? 1900 : type === "move" ? moveRunDuration : duration;
        window.setTimeout(() => window.location.assign(destination), departureDuration);
        // Keep normal navigation available if a visual animation ever fails mid-way.
        window.setTimeout(() => { if (window.location.href !== destination) window.location.assign(destination); }, departureDuration + 700);
    };

    const fillStudyPreviewBooks = () => {
        const titles = ["Mathematics", "Physics", "Design", "Literature", "Biology", "Economics", "History", "Research", "Campus Life", "Projects", "Languages", "Ideas", "Writing", "Planning", "Reading", "Science", "Culture", "Journal"];
        const covers = ["german", "custom-1", "custom-0", "git", "personal", "custom-2", "web", "custom-3"];
        let index = 0;
        document.querySelectorAll(".notes-case .notebook-row").forEach(row => {
            const existing = row.querySelectorAll(".notebook-book:not(.add-notebook-book)").length;
            for (let count = existing; count < 6; count++) {
                const book = document.createElement("span");
                book.className = `notebook-book notebook-${covers[index % covers.length]}`;
                book.dataset.previewBook = "";
                book.setAttribute("aria-hidden", "true");
                book.style.height = `${110 + index % 3 * 7}px`;
                const title = document.createElement("span");
                title.textContent = titles[index % titles.length];
                const subtitle = document.createElement("small");
                subtitle.textContent = "Notebook";
                book.append(title, subtitle);
                row.append(book);
                index++;
            }
        });
    };

    const fitStudyPreview = () => {
        const root = document.documentElement;
        const twoShelves = window.innerWidth >= 560;
        const width = twoShelves ? 1160 : 480;
        const scale = Math.max(.1, Math.min((window.innerWidth - 28) / width, (window.innerHeight - 28) / 590));
        root.dataset.studyPreviewLayout = twoShelves ? "two" : "one";
        root.style.setProperty("--study-preview-width", `${width}px`);
        root.style.setProperty("--study-preview-scale", scale.toFixed(4));
    };

    document.addEventListener("DOMContentLoaded", () => {
        if (transitionPreview) {
            document.documentElement.classList.remove("transition-pending");
            if (document.documentElement.classList.contains("study-transition-preview")) {
                fitStudyPreview();
                fillStudyPreviewBooks();
                const caseElement = document.querySelector(".notes-case .bookcase");
                if (caseElement) new MutationObserver(fillStudyPreviewBooks).observe(caseElement, { childList: true, subtree: true });
                window.addEventListener("resize", fitStudyPreview);
            }
            return;
        }
        showArrival();
        document.querySelectorAll("a[href]").forEach(link => {
            if (!routeTypes.has(pageName(link.href))) return;
            link.addEventListener("click", event => startDeparture(event, link));
        });
    });

    // A history return can restore the homepage from the back-forward cache.
    // Remove only the departed scene so the restored page is immediately usable.
    window.addEventListener("pageshow", event => {
        if (!event.persisted) return;
        unlockMovePage();
        document.documentElement.classList.remove("transition-pending");
        document.querySelectorAll(".campus-transition--departure").forEach(overlay => overlay.remove());
    });
})();
