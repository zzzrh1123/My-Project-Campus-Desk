(() => {
    "use strict";
    const hero = document.querySelector(".home-hero");
    const layer = document.querySelector(".campus-life-layer");
    const hint = document.querySelector(".campus-life-hint");
    if (!hero || !layer) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = matchMedia("(max-width: 760px)");
    const intervals = [5000, 10000, 20000, 10000, 5000];
    const colors = ["#fff5e4", "#c6e7d8", "#f0c2a7", "#cadcf0", "#e9d48e", "#dbcae9"];
    const greetings = ["Hi there! 👋", "How are you today?", "How’s the weather?", "Having a good day?", "Nice to see you!", "Take a little break ☀", "You’ve got this!", "Ready for a fresh start?"];
    const students = new Set();
    const random = (min, max) => min + Math.random() * (max - min);
    let world, nextId = 0, frame = 0, lastFrame = 0, spawnTimer = 0, sequence = 0;
    let running = false, spawnDue = 0, remaining = intervals[0], active = null, greetingTimer = 0;

    const bubble = document.createElement("div");
    bubble.className = "campus-life-greeting";
    bubble.id = "campus-student-greeting";
    bubble.setAttribute("role", "status");
    bubble.setAttribute("aria-live", "polite");
    layer.append(bubble);

    const figure = `<svg viewBox="0 0 80 140" aria-hidden="true" focusable="false">
        <ellipse class="walker-shadow" cx="40" cy="136" rx="16" ry="3"></ellipse>
        <g class="walker-body">
            <circle class="walker-head" cx="40" cy="15" r="8.5"></circle>
            <path class="walker-limb walker-torso" d="M40 25V72"></path>
            <path class="walker-limb walker-arm--left" d="M40 35L31 47L26 60"></path>
            <path class="walker-limb walker-arm--right" d="M40 35L49 47L54 60"></path>
            <path class="walker-limb walker-leg--left" d="M40 72L31 103L25 134"></path>
            <path class="walker-limb walker-leg--right" d="M40 72L49 103L55 134"></path>
            <g class="walker-wave">
                <path class="walker-limb" d="M40 35L55 25"></path>
                <g class="walker-wave-hand"><path class="walker-limb" d="M55 25L59 8M59 8L56 4M59 8L63 4"></path></g>
            </g>
        </g>
    </svg>`;

    const intersects = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    const boxAt = (point, student) => ({ left: point.x - student.width / 2, right: point.x + student.width / 2, top: point.y - student.height, bottom: point.y });
    const clear = (point, student, outside = false) => {
        const box = boxAt(point, student);
        if (!outside && (box.left < 8 || box.right > world.width - 8 || box.top < 8 || box.bottom > world.height - 8)) return false;
        return !world.obstacles.some(obstacle => intersects(box, obstacle));
    };
    const apart = (point, student) => ![...students].some(other => other !== student && !other.exiting
        && Math.hypot(point.x - other.x, (point.y - other.y) * .85) < (student.width + other.width) / 2 + 10);
    const segmentClear = (from, to, student, avoidPeople = false, outside = false) => {
        const steps = Math.max(1, Math.ceil(Math.hypot(to.x - from.x, to.y - from.y) / 12));
        for (let i = 1; i <= steps; i++) {
            const point = { x: from.x + (to.x - from.x) * i / steps, y: from.y + (to.y - from.y) * i / steps };
            if (!clear(point, student, outside) || (avoidPeople && !apart(point, student))) return false;
        }
        return true;
    };

    const makeGrid = student => {
        const step = mobile.matches ? 20 : 36;
        const cols = Math.max(1, Math.floor((world.width - student.width - 16) / step) + 1);
        const rows = Math.max(1, Math.floor((world.height - student.height - 16) / step) + 1);
        const points = Array.from({ length: cols * rows }, (_, index) => {
            const point = { x: 8 + student.width / 2 + index % cols * step, y: 8 + student.height + Math.floor(index / cols) * step, index };
            return clear(point, student) ? point : null;
        });
        return { cols, points, free: points.filter(Boolean) };
    };

    const refresh = () => {
        const bounds = hero.getBoundingClientRect();
        const padding = mobile.matches ? 8 : 16;
        world = {
            width: bounds.width, height: bounds.height,
            obstacles: [...hero.querySelectorAll(".home-brand, .contact-link, .hero-copy, .portal-card, .campus-life-hint, .hero-caption, .hero-scroll")]
                .map(element => ({ rect: element.getBoundingClientRect(), copy: element.matches(".hero-copy") }))
                .filter(({ rect }) => rect.width && rect.height)
                .map(({ rect, copy }) => ({
                    // Reserve the whole title corner, including the narrow gap to the left edge.
                    left: copy ? 0 : rect.left - bounds.left - padding,
                    right: rect.right - bounds.left + padding,
                    top: copy ? 0 : rect.top - bounds.top - padding,
                    bottom: rect.bottom - bounds.top + padding
                }))
        };
        students.forEach(student => {
            student.grid = makeGrid(student);
            student.route = [];
            student.entering = student.exiting = false;
            if (!clear(student, student)) {
                const point = student.grid.free.filter(point => apart(point, student)).sort((a, b) => Math.hypot(a.x - student.x, a.y - student.y) - Math.hypot(b.x - student.x, b.y - student.y))[0];
                if (point) Object.assign(student, { x: point.x, y: point.y });
            }
            paint(student);
        });
        if (active) placeBubble(active);
    };

    // Eight-direction routing, then line-of-sight smoothing: no fixed horizontal lanes.
    const findPath = (student, goal) => {
        const grid = student.grid;
        const start = grid.free.slice().sort((a, b) => Math.hypot(a.x - student.x, a.y - student.y) - Math.hypot(b.x - student.x, b.y - student.y)).find(point => segmentClear(student, point, student));
        if (!start) return null;
        const open = [start.index], cameFrom = new Map(), cost = new Map([[start.index, 0]]), visited = new Set();
        while (open.length) {
            open.sort((a, b) => (cost.get(a) + Math.hypot(grid.points[a].x - goal.x, grid.points[a].y - goal.y)) - (cost.get(b) + Math.hypot(grid.points[b].x - goal.x, grid.points[b].y - goal.y)));
            const index = open.shift();
            if (index === goal.index) {
                const path = [goal];
                let cursor = index;
                while (cameFrom.has(cursor)) { cursor = cameFrom.get(cursor); path.unshift(grid.points[cursor]); }
                const smooth = [{ x: student.x, y: student.y }];
                for (let i = 0; i < path.length;) {
                    let next = path.length - 1;
                    while (next > i && !segmentClear(smooth.at(-1), path[next], student, true)) next--;
                    smooth.push(path[next]);
                    i = next + 1;
                }
                return smooth;
            }
            visited.add(index);
            const col = index % grid.cols;
            for (const dy of [-1, 0, 1]) for (const dx of [-1, 0, 1]) {
                if ((!dx && !dy) || col + dx < 0 || col + dx >= grid.cols) continue;
                const next = index + dy * grid.cols + dx;
                const point = grid.points[next];
                if (!point || visited.has(next) || !apart(point, student) || !segmentClear(grid.points[index], point, student)) continue;
                const score = cost.get(index) + Math.hypot(point.x - grid.points[index].x, point.y - grid.points[index].y);
                if (score < (cost.get(next) ?? Infinity)) {
                    cost.set(next, score); cameFrom.set(next, index);
                    if (!open.includes(next)) open.push(next);
                }
            }
        }
        return null;
    };

    const bendPath = (path, student) => {
        const result = [];
        for (let i = 1; i < path.length; i++) {
            const from = path[i - 1], to = path[i];
            const distance = Math.hypot(to.x - from.x, to.y - from.y);
            const bend = random(-1, 1) * Math.min(42, distance * .2);
            const control = { x: (from.x + to.x) / 2 - (to.y - from.y) / (distance || 1) * bend, y: (from.y + to.y) / 2 + (to.x - from.x) / (distance || 1) * bend };
            const curve = Array.from({ length: 16 }, (_, j) => {
                const t = (j + 1) / 16;
                return { x: (1 - t) ** 2 * from.x + 2 * (1 - t) * t * control.x + t ** 2 * to.x, y: (1 - t) ** 2 * from.y + 2 * (1 - t) * t * control.y + t ** 2 * to.y };
            });
            result.push(...(curve.every(point => clear(point, student) && apart(point, student)) ? curve : [to]));
        }
        return result;
    };

    const plan = student => {
        const candidates = student.grid.free.filter(point => {
            const distance = Math.hypot(point.x - student.x, point.y - student.y);
            return distance > 55 && distance < (mobile.matches ? 230 : 500) && apart(point, student);
        });
        for (let attempt = 0; attempt < 6 && candidates.length; attempt++) {
            const goal = candidates[Math.floor(Math.random() * candidates.length)];
            const path = findPath(student, goal);
            if (path) { student.route = bendPath(path, student); return; }
        }
        student.restUntil = performance.now() + 700;
    };

    const paint = student => {
        student.element.style.transform = `translate3d(${(student.x - student.width / 2).toFixed(2)}px, ${(student.y - student.height).toFixed(2)}px, 0)`;
    };
    const remove = student => {
        if (active === student) hideGreeting();
        students.delete(student);
        student.element.remove();
    };
    const retire = student => {
        student.retiring = true;
        const edgePoints = student.grid.free.filter(point => point.x < 75 || point.x > world.width - 75 || point.y > world.height - 45)
            .sort((a, b) => Math.hypot(a.x - student.x, a.y - student.y) - Math.hypot(b.x - student.x, b.y - student.y));
        for (const goal of edgePoints.slice(0, 12)) {
            const exit = [{ x: -student.width, y: goal.y }, { x: world.width + student.width, y: goal.y }, { x: goal.x, y: world.height + student.height }]
                .sort((a, b) => Math.hypot(a.x - goal.x, a.y - goal.y) - Math.hypot(b.x - goal.x, b.y - goal.y))
                .find(point => segmentClear(goal, point, student, false, true));
            if (!exit) continue;
            const path = findPath(student, goal);
            if (path) { student.route = bendPath(path, student); student.exitTarget = exit; return; }
        }
        student.element.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500 }).finished.then(() => remove(student));
    };

    const placeBubble = student => {
        const width = bubble.offsetWidth, height = bubble.offsetHeight;
        const above = student.y - student.height - height - 10;
        const candidates = [
            { x: student.x - width / 2, y: above },
            { x: student.x + student.width / 2 + 10, y: student.y - student.height },
            { x: student.x - student.width / 2 - width - 10, y: student.y - student.height },
            { x: student.x - width / 2, y: student.y + 10 }
        ];
        const valid = point => point.x >= 8 && point.y >= 8 && point.x + width <= world.width - 8 && point.y + height <= world.height - 8
            && !world.obstacles.some(rect => intersects({ left: point.x, right: point.x + width, top: point.y, bottom: point.y + height }, rect));
        let position = candidates.find(valid);
        if (!position) {
            const safe = [];
            for (let y = 12; y < world.height - height - 8; y += 22) for (let x = 12; x < world.width - width - 8; x += 22) {
                if (valid({ x, y })) safe.push({ x, y });
            }
            position = safe.sort((a, b) => Math.hypot(a.x + width / 2 - student.x, a.y + height / 2 - student.y) - Math.hypot(b.x + width / 2 - student.x, b.y + height / 2 - student.y))[0];
        }
        bubble.style.visibility = position ? "visible" : "hidden";
        if (position) bubble.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
    };
    const hideGreeting = () => {
        clearTimeout(greetingTimer);
        active?.element.classList.remove("is-greeting");
        active?.element.removeAttribute("aria-describedby");
        if (active) active.pinnedUntil = 0;
        active = null;
        bubble.classList.remove("is-visible");
    };
    const greet = (student, pinned = false) => {
        if (active !== student) hideGreeting();
        active = student;
        clearTimeout(greetingTimer);
        let message;
        do { message = greetings[Math.floor(Math.random() * greetings.length)]; } while (message === student.lastMessage);
        student.lastMessage = message;
        student.pinnedUntil = pinned ? performance.now() + 3800 : 0;
        student.element.classList.remove("is-walking");
        student.element.classList.add("is-greeting");
        student.element.setAttribute("aria-describedby", bubble.id);
        bubble.textContent = message;
        bubble.classList.add("is-visible");
        placeBubble(student);
        if (pinned) greetingTimer = setTimeout(() => { if (!student.hovered && !student.focused) hideGreeting(); }, 3900);
    };
    const release = student => {
        if (active === student && !student.hovered && !student.focused && performance.now() >= student.pinnedUntil) hideGreeting();
    };

    const create = (initial = false, index = 0) => {
        let student = { id: nextId++, route: [], x: 0, y: 0, restUntil: 0, blockedAt: 0, pinnedUntil: 0 };
        let height = initial ? (mobile.matches ? [34, 46, 38][index] : [52, 87, 65][index]) : random(mobile.matches ? 32 : 38, mobile.matches ? 60 : 100);
        let point;
        for (let attempt = 0; attempt < 4 && !point; attempt++) {
            student.height = height;
            student.width = height * 4 / 7;
            student.grid = makeGrid(student);
            let points = student.grid.free.filter(candidate => apart(candidate, student));
            if (initial && mobile.matches) {
                const visibleBottom = Math.min(world.height, innerHeight - hero.getBoundingClientRect().top) - 12;
                const visible = points.filter(candidate => candidate.y < visibleBottom);
                if (visible.length) points = visible;
            }
            if (!initial) {
                const edges = points.filter(candidate => candidate.x < 70 || candidate.x > world.width - 70 || candidate.y > world.height - 45);
                if (edges.length) points = edges;
            }
            point = points[Math.floor(Math.random() * points.length)];
            height *= .82;
        }
        if (!point) return false;
        student.x = point.x; student.y = point.y;
        const element = document.createElement("button");
        element.type = "button";
        element.className = "campus-life-person";
        element.setAttribute("aria-label", "Say hello to a campus student");
        element.style.width = `${student.width}px`;
        element.style.height = `${student.height}px`;
        element.style.setProperty("--walker-color", colors[Math.floor(Math.random() * colors.length)]);
        student.speed = student.height * random(.65, .88);
        element.style.setProperty("--stride-duration", `${(student.height * .72 / student.speed).toFixed(2)}s`);
        element.innerHTML = figure;
        student.element = element;
        element.addEventListener("pointerenter", event => { if (event.pointerType !== "touch") { student.hovered = true; greet(student); } });
        element.addEventListener("pointerleave", () => { student.hovered = false; release(student); });
        element.addEventListener("focus", () => { student.focused = element.matches(":focus-visible"); if (student.focused) greet(student); });
        element.addEventListener("blur", () => { student.focused = false; release(student); });
        element.addEventListener("click", () => greet(student, true));
        element.addEventListener("keydown", event => { if (event.key === "Escape") { hideGreeting(); element.blur(); } });
        if (!initial && !reduced.matches) {
            const entry = [
                { x: -student.width, y: point.y }, { x: world.width + student.width, y: point.y }, { x: point.x, y: world.height + student.height }
            ].sort((a, b) => Math.hypot(a.x - point.x, a.y - point.y) - Math.hypot(b.x - point.x, b.y - point.y))
                .find(candidate => segmentClear(candidate, point, student, false, true));
            if (entry) { student.x = entry.x; student.y = entry.y; student.entering = true; student.route = [{ x: point.x, y: point.y }]; }
        }
        students.add(student);
        layer.append(element);
        paint(student);
        return true;
    };

    const tick = now => {
        const delta = Math.min((now - (lastFrame || now)) / 1000, .05);
        lastFrame = now;
        students.forEach(student => {
            const paused = student.hovered || student.focused || student.pinnedUntil > now || now < student.restUntil;
            student.element.classList.toggle("is-walking", !paused && student.route.length > 0);
            if (paused) return;
            if (!student.route.length) {
                if (student.exiting) { remove(student); return; }
                if (student.retiring) {
                    student.exiting = true;
                    student.route = [student.exitTarget || { x: -student.width, y: student.y }];
                } else { student.entering = false; plan(student); }
            }
            let distance = student.speed * delta;
            while (distance > 0 && student.route.length) {
                const target = student.route[0], dx = target.x - student.x, dy = target.y - student.y;
                const length = Math.hypot(dx, dy);
                const fraction = length > 0 ? Math.min(1, distance / length) : 1;
                const next = { x: student.x + dx * fraction, y: student.y + dy * fraction };
                if (!clear(next, student, student.entering || student.exiting) || !apart(next, student)) {
                    if (!student.blockedAt) student.blockedAt = now;
                    if (now - student.blockedAt > 650) { student.route = []; student.restUntil = now + random(150, 450); student.blockedAt = 0; }
                    student.element.classList.remove("is-walking");
                    break;
                }
                student.blockedAt = 0;
                student.x = next.x; student.y = next.y;
                distance -= length;
                if (fraction === 1) student.route.shift();
                if (Math.abs(dx) > .1) student.element.style.setProperty("--walker-facing", dx < 0 ? "-1" : "1");
            }
            paint(student);
        });
        if (running && !reduced.matches) frame = requestAnimationFrame(tick);
    };

    const scheduleSpawn = delay => {
        clearTimeout(spawnTimer);
        spawnDue = performance.now() + delay;
        spawnTimer = setTimeout(() => {
            if (!running || document.hidden || reduced.matches) return;
            const limit = mobile.matches ? 6 : 10;
            const available = [...students].filter(student => !student.retiring && student !== active).sort((a, b) => a.id - b.id);
            if (students.size >= limit && available[0]) retire(available[0]);
            if (students.size < limit) create();
            sequence = (sequence + 1) % intervals.length;
            remaining = intervals[sequence];
            scheduleSpawn(remaining);
        }, delay);
    };
    const pause = () => {
        running = false;
        remaining = Math.max(0, spawnDue - performance.now());
        cancelAnimationFrame(frame);
        clearTimeout(spawnTimer);
        clearTimeout(resizeTimer);
        layer.classList.add("is-suspended");
        hideGreeting();
    };
    const resume = () => {
        if (document.hidden || running || reduced.matches) return;
        running = true; lastFrame = 0;
        layer.classList.remove("is-suspended");
        frame = requestAnimationFrame(tick);
        scheduleSpawn(remaining || intervals[sequence]);
    };

    refresh();
    for (let i = 0; i < 3; i++) create(true, i);
    resume();
    hint?.addEventListener("click", () => {
        const bounds = hero.getBoundingClientRect();
        const visible = [...students].filter(student => student.y + bounds.top > 20 && student.y + bounds.top < innerHeight - 10 && !student.entering);
        const student = visible[Math.floor(Math.random() * visible.length)] || [...students][0];
        if (student) { greet(student, true); student.element.focus({ preventScroll: true }); }
    });
    let resizeTimer;
    window.addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(refresh, 180); });
    hero.addEventListener("animationend", event => { if (event.animationName === "content-arrive") refresh(); });
    document.addEventListener("visibilitychange", () => document.hidden ? pause() : resume());
    reduced.addEventListener("change", () => reduced.matches ? pause() : resume());
    window.addEventListener("pagehide", pause);
    window.addEventListener("pageshow", event => { if (event.persisted) { refresh(); resume(); } });
})();
