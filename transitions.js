(() => {
    "use strict";

    const moveRunDuration = 1450;
    const moveFadeDuration = 760;
    const routeTypes = new Map([
        ["study.html", "study"],
        ["loadout.html", "loadout"],
        ["move.html", "move"]
    ]);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const transitionPreview = window.self !== window.top
        && new URLSearchParams(window.location.search).has("transition-preview");

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
                        <iframe class="study-destination-preview" src="study.html?transition-preview=1&full-page=1&v=26" title="" tabindex="-1"></iframe>
                        <iframe class="study-page-preview" src="study.html?transition-preview=1&v=26" title="" tabindex="-1"></iframe>
                    </div>
                    <div class="study-door study-door--left"></div><div class="study-door study-door--right"></div>
                </div>
                ${libraryStudent()}
            </div>`;
        if (type === "loadout") return `
            <div class="campus-transition__scene campus-transition--loadout" data-type="loadout">
                <div class="automatic-door">
                    <iframe class="loadout-page-preview" src="loadout.html?transition-preview=1&full-page=1" title="" tabindex="-1"></iframe>
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
                <div class="move-transition-blackout"></div>
                <p class="campus-transition__label">Enter Active Breaks</p>
                ${runningStudent()}
            </div>`;
    };

    const buildOverlay = type => {
        const overlay = document.createElement("div");
        overlay.className = "campus-transition campus-transition--opening is-opening";
        overlay.dataset.type = type;
        overlay.setAttribute("aria-hidden", "true");
        overlay.style.setProperty("--transition-page-width", `${window.innerWidth}px`);
        overlay.style.setProperty("--transition-page-height", `${window.innerHeight}px`);
        overlay.innerHTML = sceneMarkup(type);
        document.body.append(overlay);
        return overlay;
    };

    const lockPage = () => {
        const gap = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.setProperty("--transition-scrollbar-gap", `${gap}px`);
        document.body.classList.add("transition-lock");
    };
    const unlockPage = () => {
        document.body.classList.remove("transition-lock", "move-transition-lock");
        document.body.style.removeProperty("--transition-scrollbar-gap");
        document.body.style.removeProperty("--move-scrollbar-gap");
    };
    const wait = milliseconds => new Promise(resolve => window.setTimeout(resolve, milliseconds));
    const animate = (element, keyframes, options) => {
        if (!element || typeof element.animate !== "function") return Promise.resolve();
        return element.animate(keyframes, { fill: "forwards", ...options }).finished.catch(() => {});
    };
    const waitForPreview = overlay => {
        return Promise.all([...overlay.querySelectorAll("iframe")].map(preview => new Promise(resolve => {
            let timeout;
            const finish = () => {
                window.clearTimeout(timeout);
                preview.removeEventListener("load", finish);
                resolve();
            };
            preview.addEventListener("load", finish, { once: true });
            timeout = window.setTimeout(finish, 1800);
            try {
                if (preview.contentDocument?.readyState === "complete"
                    && preview.contentDocument.URL !== "about:blank") finish();
            } catch (error) {}
        })));
    };

    const fitLibraryDestination = overlay => {
        const doorway = overlay.querySelector(".study-doorway");
        const preview = overlay.querySelector(".study-destination-preview");
        if (!doorway || !preview) return;
        const viewport = overlay.getBoundingClientRect();
        const scale = Math.min(doorway.clientWidth / viewport.width, doorway.clientHeight / viewport.height);
        preview.style.transform = `translate(${(doorway.clientWidth - viewport.width * scale) / 2}px, ${(doorway.clientHeight - viewport.height * scale) / 2}px) scale(${scale})`;
    };

    // Expand the open doorway, then dissolve into the actual page beneath it.
    const revealLibraryPage = async overlay => {
        const doorway = overlay.querySelector(".study-doorway");
        if (!doorway) return Promise.resolve();
        const preview = overlay.querySelector(".study-destination-preview");
        const bounds = doorway.getBoundingClientRect();
        const viewport = overlay.getBoundingClientRect();
        const scale = Math.max(viewport.width / bounds.width, viewport.height / bounds.height) * 1.08;
        const revealDuration = 1200;
        const options = { duration: revealDuration, easing: "cubic-bezier(.22,.6,.25,1)" };
        const frameStyle = getComputedStyle(doorway);
        const destinationX = (bounds.width - viewport.width / scale) / 2 - parseFloat(frameStyle.borderLeftWidth);
        const destinationY = (bounds.height - viewport.height / scale) / 2 - parseFloat(frameStyle.borderTopWidth);
        const animations = [
            animate(doorway, [
                { transform: getComputedStyle(doorway).transform },
                { transform: `translate(-50%, -50%) scale(${scale.toFixed(4)})` }
            ], options),
            animate(preview, [
                { transform: getComputedStyle(preview).transform },
                { transform: `translate(${destinationX}px, ${destinationY}px) scale(${1 / scale})` }
            ], options),
            // The complete page appears through the expanding doorway. At the
            // end its pixels align with the real page, so the overlay can vanish.
            animate(overlay.querySelector(".study-page-preview"), [
                { opacity: 1 }, { opacity: 0 }
            ], { duration: 500, easing: "ease-in-out" })
        ];
        overlay.querySelectorAll(".study-arch, .study-door, .library-student, .campus-transition__label").forEach(element => {
            animations.push(animate(element, [{ opacity: getComputedStyle(element).opacity }, { opacity: 0 }], {
                duration: 340, easing: "ease-out"
            }));
        });
        await Promise.all(animations);
        await animate(overlay, [{ opacity: 1 }, { opacity: 0 }], {
            duration: 280, easing: "ease-in-out"
        });
    };

    // Preserve the existing glass panes, then blend the open room into the page.
    const revealLoadoutPage = overlay => {
        const animations = [
            animate(overlay.querySelector(".automatic-door"), [
                { transform: "scale(1)" }, { transform: "scale(1.025)" }
            ], { duration: 850, easing: "cubic-bezier(.22,.6,.25,1)" }),
            animate(overlay, [
                { opacity: 1 }, { opacity: 1, offset: .12 }, { opacity: 0 }
            ], { duration: 850, easing: "ease-in-out" })
        ];
        overlay.querySelectorAll(".transition-student, .door-rail, .glass-pane").forEach(element => {
            animations.push(animate(element, [{ opacity: getComputedStyle(element).opacity }, { opacity: 0 }], {
                duration: 300, easing: "ease-out"
            }));
        });
        return Promise.all(animations);
    };

    const revealMovePage = async overlay => {
        overlay.querySelector(".campus-transition--move")?.classList.add("is-settled");
        await animate(overlay.querySelector(".move-transition-blackout"), [
            { opacity: 0 }, { opacity: 1 }
        ], { duration: moveFadeDuration, easing: "ease-in-out" });
        await wait(140);
        // Fade the whole black scene away so the track cannot reappear.
        await animate(overlay, [{ opacity: 1 }, { opacity: 0 }], {
            duration: 920, easing: "ease-in-out"
        });
    };

    let openingOverlay = null;
    const showOpeningScene = async type => {
        if (openingOverlay) return;
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        lockPage();
        const overlay = buildOverlay(type);
        openingOverlay = overlay;
        let finished = false;
        let fallback;
        const finish = () => {
            if (finished) return;
            finished = true;
            window.clearTimeout(fallback);
            overlay.remove();
            if (openingOverlay === overlay) openingOverlay = null;
            document.documentElement.classList.remove("transition-pending");
            unlockPage();
        };
        fallback = window.setTimeout(finish, 8000);
        requestAnimationFrame(() => document.documentElement.classList.remove("transition-pending"));
        try {
            await waitForPreview(overlay);
            if (type === "study") fitLibraryDestination(overlay);
            await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
            if (!overlay.isConnected) return;
            overlay.querySelector(".campus-transition__scene")?.classList.add("is-active");
            await wait(type === "study" ? 1800 : type === "loadout" ? 1480 : moveRunDuration);
            if (!overlay.isConnected) return;
            if (type === "study") await revealLibraryPage(overlay);
            else if (type === "loadout") await revealLoadoutPage(overlay);
            else await revealMovePage(overlay);
        } finally {
            finish();
        }
    };

    const fitStudyPreview = () => {
        const root = document.documentElement;
        const width = 1160;
        const scale = Math.max(.1, Math.min((window.innerWidth - 28) / width, (window.innerHeight - 28) / 590));
        root.dataset.studyPreviewLayout = "two";
        root.style.setProperty("--study-preview-width", `${width}px`);
        root.style.setProperty("--study-preview-scale", scale.toFixed(4));
    };

    document.addEventListener("DOMContentLoaded", () => {
        if (transitionPreview) {
            document.documentElement.classList.remove("transition-pending");
            if (document.documentElement.classList.contains("study-transition-preview")) {
                fitStudyPreview();
                window.addEventListener("resize", fitStudyPreview);
            }
            return;
        }
        const type = routeTypes.get(pageName(window.location.href));
        if (!type || reducedMotion.matches) {
            document.documentElement.classList.remove("transition-pending");
            return;
        }
        // Home and all top navigation links play the same complete destination opening.
        showOpeningScene(type).catch(() => {
            openingOverlay?.remove();
            openingOverlay = null;
            document.documentElement.classList.remove("transition-pending");
            unlockPage();
        });
    });

    window.addEventListener("pageshow", event => {
        if (!event.persisted) return;
        openingOverlay?.remove();
        openingOverlay = null;
        unlockPage();
        document.documentElement.classList.remove("transition-pending");
        document.querySelectorAll(".campus-transition").forEach(overlay => overlay.remove());
    });
})();
