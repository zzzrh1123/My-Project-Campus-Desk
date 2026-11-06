const loadoutForm = document.querySelector("#loadout-form");
const loadoutPreview = document.querySelector("#loadout-preview");
const buildButton = document.querySelector("#build-loadout");
const planSummary = document.querySelector("#plan-summary");
const loadoutMessage = document.querySelector("#loadout-message");
const packingList = document.querySelector("#packing-list");
const progressFill = document.querySelector("#packing-progress-fill");
const backpack = document.querySelector("#campus-backpack");
const bagOpening = document.querySelector("#bag-opening");
const stagedItems = [...document.querySelectorAll(".staged-item[data-item]")];

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const weatherItems = {
    rainy: {
        type: "umbrella",
        label: "Umbrella",
        summary: "Rain adds an umbrella"
    },
    hot: {
        type: "water",
        label: "Mineral water",
        summary: "Hot weather adds mineral water"
    },
    cold: {
        type: "overshirt",
        label: "Blue denim overshirt",
        summary: "Cold weather adds a denim overshirt"
    }
};

let activeRun = 0;
let isPacking = false;

function getNotebookCount(classCount) {
    if (classCount <= 2) {
        return 1;
    }

    if (classCount <= 4) {
        return 2;
    }

    return 3;
}

function getCurrentPlan() {
    const classChoice = loadoutForm.querySelector("input[name='class-count']:checked");
    const weatherConditions = [...loadoutForm.querySelectorAll("input[name='weather']:checked")]
        .map((input) => input.value);
    const exerciseChoice = loadoutForm.querySelector("input[name='outdoor-exercise']:checked");
    const classCount = Number(classChoice?.value || 1);
    const outdoorExercise = exerciseChoice?.value === "yes";
    const notebookCount = getNotebookCount(classCount);
    const items = [];

    for (let index = 1; index <= notebookCount; index += 1) {
        items.push({
            type: `notebook-${index}`,
            group: "notebook",
            label: notebookCount === 1 ? "Paper notebook" : `Paper notebook ${index}`
        });
    }

    weatherConditions.forEach((condition) => {
        if (weatherItems[condition]) {
            items.push(weatherItems[condition]);
        }
    });

    if (outdoorExercise) {
        items.push({
            type: "sports-drink",
            label: "Sports drink"
        });
    }

    if (loadoutForm.elements["needs-tablet"].checked) {
        items.push({ type: "tablet", label: "Tablet" });
    }

    if (loadoutForm.elements["needs-laptop"].checked) {
        items.push({ type: "laptop", label: "Laptop" });
    }

    return {
        classCount,
        weatherConditions,
        outdoorExercise,
        notebookCount,
        items
    };
}

function getDeviceSummary() {
    const needsTablet = loadoutForm.elements["needs-tablet"].checked;
    const needsLaptop = loadoutForm.elements["needs-laptop"].checked;

    if (needsTablet && needsLaptop) {
        return "Your tablet and laptop are both selected";
    }

    if (needsTablet) {
        return "Your tablet is selected";
    }

    if (needsLaptop) {
        return "Your laptop is selected";
    }

    return "No device is selected";
}

function updateSelectionPreview() {
    const plan = getCurrentPlan();
    const neededTypes = new Set(plan.items.map((item) => item.type));
    const classWord = plan.classCount === 1 ? "class" : "classes";
    const notebookWord = plan.notebookCount === 1 ? "notebook" : "notebooks";
    const weatherExtras = plan.weatherConditions
        .filter((condition) => weatherItems[condition])
        .map((condition) => weatherItems[condition].summary);
    let weatherSummary = "No weather condition is selected";

    if (weatherExtras.length > 0) {
        weatherSummary = weatherExtras.join(". ");
    } else if (plan.weatherConditions.includes("sunny")) {
        weatherSummary = "Sunny weather needs no extra item";
    }
    const exerciseSummary = plan.outdoorExercise
        ? "Outdoor exercise adds a sports drink"
        : "No outdoor exercise means no sports drink";

    planSummary.textContent = `${plan.classCount} ${classWord} means ${plan.notebookCount} ${notebookWord}. ${weatherSummary}. ${exerciseSummary}. ${getDeviceSummary()}.`;

    stagedItems.forEach((stagedItem) => {
        const isNeeded = neededTypes.has(stagedItem.dataset.item);
        stagedItem.classList.toggle("is-needed", isNeeded);
        stagedItem.classList.toggle("is-not-needed", !isNeeded);
        stagedItem.classList.remove("is-packed");
    });
}

function setPlannerDisabled(disabled) {
    loadoutForm.querySelectorAll("fieldset input").forEach((input) => {
        input.disabled = disabled;
    });

    buildButton.disabled = disabled;
}

function setProgress(value) {
    const safeValue = Math.max(0, Math.min(1, value));
    progressFill.style.transform = `scaleX(${safeValue})`;
}

function clearFlyingItems() {
    document.querySelectorAll(".flying-pack-object").forEach((item) => item.remove());
}

function restorePackButton() {
    buildButton.innerHTML = "<span aria-hidden='true'>↘</span> Pack my bag";
}

function resetPackingScene() {
    document.dispatchEvent(new Event("campus:packing-reset"));
    activeRun += 1;
    isPacking = false;
    clearFlyingItems();
    setPlannerDisabled(false);
    backpack.classList.remove("is-open", "is-ready");
    loadoutPreview.classList.remove("is-complete");
    loadoutPreview.setAttribute("aria-busy", "false");
    loadoutMessage.textContent = "Make your choices, then pack your bag.";
    packingList.innerHTML = "<li class='empty-packing-list'>Your packing list will appear here.</li>";
    setProgress(0);
    restorePackButton();
    updateSelectionPreview();
}

function wait(milliseconds, runId) {
    if (milliseconds === 0) {
        return Promise.resolve(runId === activeRun);
    }

    return new Promise((resolve) => {
        window.setTimeout(() => resolve(runId === activeRun), milliseconds);
    });
}

function scrollPreviewIntoView(runId) {
    const compactScreen = window.matchMedia("(max-width: 620px)").matches;
    (compactScreen ? backpack : loadoutPreview).scrollIntoView({
        behavior: reducedMotionQuery.matches ? "auto" : "smooth",
        block: compactScreen ? "center" : "start"
    });

    return new Promise((resolve) => {
        let lastScrollY = window.scrollY;
        let stillFrames = 0;
        let frames = 0;

        const checkScroll = () => {
            if (runId !== activeRun) {
                resolve(false);
                return;
            }

            const currentScrollY = window.scrollY;
            stillFrames = Math.abs(currentScrollY - lastScrollY) < 1 ? stillFrames + 1 : 0;
            lastScrollY = currentScrollY;
            frames += 1;

            if (stillFrames >= 3 || frames >= 90) {
                resolve(true);
                return;
            }

            window.requestAnimationFrame(checkScroll);
        };

        window.requestAnimationFrame(checkScroll);
    });
}

function getStagedItem(type) {
    return stagedItems.find((item) => item.dataset.item === type);
}

async function flyItemIntoBag(item, runId, itemIndex) {
    const source = getStagedItem(item.type);
    const sourceObject = source?.querySelector(".pack-object");

    if (!source || !sourceObject || runId !== activeRun) {
        return false;
    }

    if (reducedMotionQuery.matches || typeof sourceObject.animate !== "function") {
        source.classList.add("is-packed");
        return wait(reducedMotionQuery.matches ? 20 : 180, runId);
    }

    const sourceRect = sourceObject.getBoundingClientRect();
    const targetRect = bagOpening.getBoundingClientRect();
    const flyingItem = sourceObject.cloneNode(true);
    source.classList.add("is-packed");
    const targetX = targetRect.left + (targetRect.width / 2) - (sourceRect.left + (sourceRect.width / 2));
    const targetY = targetRect.top + (targetRect.height / 2) - (sourceRect.top + (sourceRect.height / 2));
    const entryDepth = Math.min(24, Math.max(14, targetRect.height * 0.9));
    const curveX = targetX * 0.48;
    const curveY = Math.min(-88, targetY * 0.22 - 46);
    const rotation = itemIndex % 2 === 0 ? 6 : -5;

    flyingItem.removeAttribute("id");
    flyingItem.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
    flyingItem.classList.add("flying-pack-object");
    flyingItem.style.left = `${sourceRect.left}px`;
    flyingItem.style.top = `${sourceRect.top}px`;
    flyingItem.style.width = `${sourceRect.width}px`;
    flyingItem.style.height = `${sourceRect.height}px`;
    document.body.append(flyingItem);

    const animation = flyingItem.animate([
        {
            opacity: 1,
            transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)",
            offset: 0
        },
        {
            opacity: 1,
            transform: `translate3d(${curveX}px, ${curveY}px, 0) rotate(${rotation}deg) scale(1.08)`,
            offset: 0.34
        },
        {
            opacity: 0.88,
            transform: `translate3d(${targetX * 0.88}px, ${targetY * 0.82}px, 0) rotate(${-rotation * 0.45}deg) scale(0.55)`,
            offset: 0.74
        },
        {
            opacity: 0,
            transform: `translate3d(${targetX}px, ${targetY + entryDepth}px, 0) rotate(0deg) scale(0.12)`,
            offset: 1
        }
    ], {
        duration: 1400,
        easing: "cubic-bezier(0.16, 0.72, 0.22, 1)",
        fill: "forwards"
    });

    try {
        await animation.finished;
    } catch (error) {
        // Cancelling a reset animation is expected and needs no visible error.
    }

    flyingItem.remove();
    return runId === activeRun;
}

function renderPackingList(plan) {
    const groupedItems = [];
    const notebookLabel = plan.notebookCount === 1
        ? "1 paper notebook"
        : `${plan.notebookCount} paper notebooks`;

    groupedItems.push(notebookLabel);

    plan.items
        .filter((item) => item.group !== "notebook")
        .forEach((item) => groupedItems.push(item.label));

    packingList.replaceChildren(...groupedItems.map((label) => {
        const listItem = document.createElement("li");
        listItem.textContent = label;
        return listItem;
    }));
}

async function packBag(plan) {
    document.dispatchEvent(new Event("campus:packing-reset"));
    const runId = ++activeRun;
    const motionDelay = reducedMotionQuery.matches ? 0 : 1;
    const remainingByType = new Map();

    plan.items.forEach((item) => {
        remainingByType.set(item.type, (remainingByType.get(item.type) || 0) + 1);
    });

    isPacking = true;
    setPlannerDisabled(true);
    loadoutPreview.setAttribute("aria-busy", "true");
    loadoutPreview.classList.remove("is-complete");
    backpack.classList.remove("is-ready");
    packingList.innerHTML = "<li class='empty-packing-list'>Packing in progress…</li>";
    setProgress(0.04);
    buildButton.innerHTML = "<span aria-hidden='true'>•••</span> Packing…";
    loadoutMessage.textContent = "Opening the backpack zipper…";

    if (!await scrollPreviewIntoView(runId)) {
        return;
    }

    void backpack.offsetWidth;
    backpack.classList.add("is-open");

    if (!await wait(760 * motionDelay, runId)) {
        return;
    }

    for (let index = 0; index < plan.items.length; index += 1) {
        const item = plan.items[index];
        loadoutMessage.textContent = `Packing ${item.label.toLowerCase()}…`;

        if (!await flyItemIntoBag(item, runId, index)) {
            return;
        }

        const remaining = (remainingByType.get(item.type) || 1) - 1;
        remainingByType.set(item.type, remaining);

        if (remaining === 0) {
            getStagedItem(item.type)?.classList.add("is-packed");
        }

        setProgress((index + 1) / (plan.items.length + 1));

        if (!await wait(230 * motionDelay, runId)) {
            return;
        }
    }

    loadoutMessage.textContent = "Everything is inside. Closing the zipper…";
    backpack.classList.remove("is-open");
    setProgress(0.94);

    if (!await wait(820 * motionDelay, runId)) {
        return;
    }

    backpack.classList.add("is-ready");
    loadoutPreview.classList.add("is-complete");
    loadoutPreview.setAttribute("aria-busy", "false");
    loadoutMessage.textContent = "Your bag is packed — you are ready to go!";
    setProgress(1);
    renderPackingList(plan);
    setPlannerDisabled(false);
    buildButton.innerHTML = "<span aria-hidden='true'>↻</span> Pack again";
    isPacking = false;
    buildButton.focus({ preventScroll: true });
    document.dispatchEvent(new CustomEvent("campus:bag-packed", { detail: { runId, itemCount: plan.items.length } }));
}

loadoutForm.addEventListener("change", () => {
    if (!isPacking) {
        backpack.classList.remove("is-ready");
        loadoutPreview.classList.remove("is-complete");
        loadoutMessage.textContent = "Choices updated. Pack your bag when you are ready.";
        packingList.innerHTML = "<li class='empty-packing-list'>Your updated list is ready to pack.</li>";
        setProgress(0);
        restorePackButton();
        updateSelectionPreview();
    }
});

loadoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!isPacking) {
        clearFlyingItems();
        stagedItems.forEach((item) => item.classList.remove("is-packed"));
        packBag(getCurrentPlan());
    }
});

loadoutForm.addEventListener("reset", () => {
    window.setTimeout(resetPackingScene, 0);
});

updateSelectionPreview();
