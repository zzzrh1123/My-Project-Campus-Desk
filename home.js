(() => {
    "use strict";
    const hero = document.querySelector(".home-hero");
    const photo = document.querySelector(".hero-image");
    if (!hero || !photo) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 761px)");
    const cards = [...hero.querySelectorAll(".portal-card")];
    const exploreLink = hero.querySelector(".explore-link");
    const storageKey = "campus-desk-photo-intro-v1";

    let introSeen = false;
    try { introSeen = sessionStorage.getItem(storageKey) === "seen"; } catch {}
    if (!introSeen && !reducedMotion.matches) hero.classList.add("is-intro");

    let revealed = false;
    const reveal = () => {
        if (revealed) return;
        revealed = true;
        hero.classList.add("is-ready");
        try { sessionStorage.setItem(storageKey, "seen"); } catch {}
    };
    photo.addEventListener("error", reveal, { once: true });
    if (photo.complete) reveal();
    else if (photo.decode) photo.decode().then(reveal, reveal);
    else photo.addEventListener("load", reveal, { once: true });
    // Keep links usable even if an image request stalls.
    window.setTimeout(reveal, 2500);

    exploreLink?.addEventListener("click", event => {
        event.preventDefault();
        const firstCard = cards[0];
        if (!firstCard) return;
        if (matchMedia("(max-width: 760px)").matches) {
            firstCard.scrollIntoView({ behavior: reducedMotion.matches ? "instant" : "smooth", block: "center" });
        }
        firstCard.focus({ preventScroll: true });
    });

    let frame = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let activeCard = null;
    let tiltX = 0;
    let tiltY = 0;
    const enabled = () => finePointer.matches && !reducedMotion.matches;
    const clamp = value => Math.max(-1, Math.min(1, value));

    const paint = () => {
        frame = 0;
        currentX += (targetX - currentX) * .12;
        currentY += (targetY - currentY) * .12;
        hero.style.setProperty("--scene-x", `${(-currentX * 5).toFixed(2)}px`);
        hero.style.setProperty("--scene-y", `${(-currentY * 4).toFixed(2)}px`);
        hero.style.setProperty("--foreground-x", `${(currentX * 8).toFixed(2)}px`);
        hero.style.setProperty("--foreground-y", `${(currentY * 6).toFixed(2)}px`);
        cards.forEach(card => {
            card.style.setProperty("--tilt-x", card === activeCard ? `${tiltX.toFixed(2)}deg` : "0deg");
            card.style.setProperty("--tilt-y", card === activeCard ? `${tiltY.toFixed(2)}deg` : "0deg");
        });
        if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > .002) {
            frame = requestAnimationFrame(paint);
        }
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const reset = () => {
        targetX = targetY = 0;
        activeCard = null;
        tiltX = tiltY = 0;
        if (!enabled()) {
            currentX = currentY = 0;
            if (frame) cancelAnimationFrame(frame);
            frame = 0;
            paint();
        } else queue();
    };

    hero.addEventListener("pointermove", event => {
        if (!enabled() || event.pointerType === "touch") return;
        const bounds = hero.getBoundingClientRect();
        targetX = clamp((event.clientX - bounds.left) / bounds.width * 2 - 1);
        targetY = clamp((event.clientY - bounds.top) / bounds.height * 2 - 1);
        activeCard = event.target.closest(".portal-card");
        if (activeCard) {
            const cardBounds = activeCard.getBoundingClientRect();
            tiltX = -clamp((event.clientY - cardBounds.top) / cardBounds.height * 2 - 1) * 2.4;
            tiltY = clamp((event.clientX - cardBounds.left) / cardBounds.width * 2 - 1) * 2.4;
        }
        queue();
    }, { passive: true });
    hero.addEventListener("pointerleave", reset);
    finePointer.addEventListener("change", reset);
    reducedMotion.addEventListener("change", reset);
    window.addEventListener("blur", reset);
    window.addEventListener("pagehide", () => { if (frame) cancelAnimationFrame(frame); });
})();
