(() => {
    "use strict";
    if (window.self !== window.top && new URLSearchParams(location.search).has("transition-preview")) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let current = null;

    const dismiss = (restoreFocus = true) => {
        if (!current) return;
        const state = current;
        current = null;
        state.controller.abort();
        state.timers.forEach(clearTimeout);
        cancelAnimationFrame(state.frame);
        state.overlay.remove();
        state.inertElements.forEach(([element, wasInert]) => { element.inert = wasInert; });
        document.body.classList.remove("loadout-celebrating");
        document.body.style.removeProperty("--loadout-celebration-gap");
        if (restoreFocus && state.previousFocus?.isConnected && !state.previousFocus.disabled) {
            state.previousFocus.focus({ preventScroll: true });
        }
    };

    const startConfetti = state => {
        const canvas = state.overlay.querySelector("canvas");
        const context = canvas.getContext("2d");
        if (!context) return;
        let width, height;
        const resize = () => {
            width = innerWidth; height = innerHeight;
            const ratio = Math.min(devicePixelRatio || 1, 2);
            canvas.width = Math.round(width * ratio);
            canvas.height = Math.round(height * ratio);
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
        };
        resize();
        window.addEventListener("resize", resize, { signal: state.controller.signal });
        const colors = ["#e6b965", "#ecce8f", "#a9d5c7", "#729dba", "#de9f88", "#f8f2df"];
        const count = innerWidth <= 760 ? 34 : 62;
        const gravity = height * .82;
        const particles = [-1, 1].flatMap(side => Array.from({ length: count }, (_, index) => {
            // 60° above the horizontal, mirrored at the opposite corner.
            const angle = (60 + (Math.random() - .5) * 18) * Math.PI / 180;
            const speed = Math.min(height * (1.1 + Math.random() * .35), width * 2.15);
            return {
                side, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
                delay: index / count * .2, width: 4 + Math.random() * 5,
                length: 9 + Math.random() * 17, ribbon: index % 4 === 0,
                rotation: Math.random() * Math.PI, spin: (Math.random() - .5) * 13,
                color: colors[index % colors.length], flutter: Math.random() * Math.PI * 2
            };
        }));
        const startedAt = performance.now();
        const paint = now => {
            if (current !== state) return;
            const elapsed = (now - startedAt) / 1000;
            context.clearRect(0, 0, width, height);
            for (const particle of particles) {
                const age = elapsed - particle.delay;
                if (age < 0) continue;
                const travel = (1 - Math.exp(-.26 * age)) / .26;
                const x = (particle.side < 0 ? -6 : width + 6) - particle.side * particle.vx * travel;
                const y = height - particle.vy * age + .5 * gravity * age * age;
                if (y > height + 50 || x < -50 || x > width + 50) continue;
                context.save();
                context.globalAlpha = Math.min(1, Math.max(0, (3.15 - age) / .65));
                context.translate(x + Math.sin(age * 6 + particle.flutter) * 9, y);
                context.rotate(particle.rotation + age * particle.spin);
                context.scale(.4 + .6 * Math.abs(Math.cos(age * 5 + particle.flutter)), 1);
                if (particle.ribbon) {
                    context.strokeStyle = particle.color;
                    context.lineWidth = 3;
                    context.lineCap = "round";
                    context.beginPath();
                    context.moveTo(0, -particle.length);
                    context.quadraticCurveTo(11 * Math.sin(age * 5), 0, 0, particle.length);
                    context.stroke();
                } else {
                    context.fillStyle = particle.color;
                    context.fillRect(-particle.width / 2, -particle.length / 2, particle.width, particle.length);
                }
                context.restore();
            }
            if (elapsed < 3.3) state.frame = requestAnimationFrame(paint);
            else { context.clearRect(0, 0, width, height); state.frame = 0; }
        };
        state.frame = requestAnimationFrame(paint);
    };

    const celebrate = () => {
        dismiss(false);
        const previousFocus = document.activeElement;
        const gap = innerWidth - document.documentElement.clientWidth;
        const overlay = document.createElement("div");
        overlay.className = "loadout-finish";
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.setAttribute("aria-labelledby", "loadout-finish-title");
        overlay.innerHTML = `
            <div class="loadout-finish__doors" aria-hidden="true">
                <div class="loadout-finish__frame"></div>
                <div class="loadout-finish__pane loadout-finish__pane--fixed-left"></div>
                <div class="loadout-finish__pane loadout-finish__pane--fixed-right"></div>
                <div class="loadout-finish__pane loadout-finish__pane--left"></div>
                <div class="loadout-finish__pane loadout-finish__pane--right"></div>
                <div class="loadout-finish__rail"><span></span></div>
                <div class="loadout-finish__light"></div>
            </div>
            <canvas class="loadout-finish__confetti" aria-hidden="true"></canvas>
            <div class="loadout-finish__message" role="status" hidden>
                <svg class="loadout-finish__check" viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="32" cy="32" r="28"/><path d="m19 32 9 9 18-19"/></svg>
                <h2 id="loadout-finish-title">You’re ready for class.</h2>
                <button class="loadout-finish__back" type="button">Back to backpack <span aria-hidden="true">↗</span></button>
            </div>
            <button class="loadout-finish__close" type="button" aria-label="Close celebration and return to your backpack">×</button>`;
        const inertElements = [...document.body.children]
            .filter(element => !["SCRIPT", "STYLE", "LINK"].includes(element.tagName))
            .map(element => [element, element.inert]);
        inertElements.forEach(([element]) => { element.inert = true; });
        document.body.style.setProperty("--loadout-celebration-gap", `${gap}px`);
        document.body.classList.add("loadout-celebrating");
        document.body.append(overlay);
        const state = { overlay, previousFocus, inertElements, controller: new AbortController(), timers: [], frame: 0 };
        current = state;
        const signal = state.controller.signal;
        const close = overlay.querySelector(".loadout-finish__close");
        const back = overlay.querySelector(".loadout-finish__back");
        close.addEventListener("click", () => dismiss(), { signal });
        back.addEventListener("click", () => dismiss(), { signal });
        overlay.addEventListener("keydown", event => {
            if (event.key === "Escape") { event.preventDefault(); dismiss(); }
            if (event.key === "Tab") {
                const buttons = [...overlay.querySelectorAll("button")].filter(button => button.getClientRects().length);
                const first = buttons[0], last = buttons.at(-1);
                if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
                else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
            }
        }, { signal });
        close.focus({ preventScroll: true });
        let complete = false;
        const showMessage = () => {
            if (current !== state || complete) return;
            complete = true;
            overlay.querySelector(".loadout-finish__message").hidden = false;
            requestAnimationFrame(() => { if (current === state) overlay.classList.add("is-complete"); });
        };
        if (reduced.matches) {
            overlay.classList.add("is-closing", "is-reduced");
            showMessage();
            return;
        }
        startConfetti(state);
        state.timers.push(setTimeout(() => overlay.classList.add("is-closing"), 1050));
        overlay.querySelector(".loadout-finish__pane--right").addEventListener("transitionend", event => {
            if (event.propertyName === "transform") showMessage();
        }, { signal });
        state.timers.push(setTimeout(showMessage, 2200));
    };

    document.addEventListener("campus:bag-packed", celebrate);
    document.addEventListener("campus:packing-reset", () => dismiss(false));
    window.addEventListener("pagehide", () => dismiss(false));
})();
