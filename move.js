/*
 * Campus Desk — Active Breaks
 * The recommender uses:
 * 1. Hard filters for time, venue and equipment access.
 * 2. Weighted preference scoring for goal, intensity, experience and social style.
 * This is a student project, not a medical or fitness assessment.
 */

const sports = [
    {
        id: "walking",
        name: "Walking",
        category: "Cardio",
        goals: ["fitness", "endurance", "relaxation", "social"],
        venues: ["indoor", "outdoor"],
        intensities: ["light", "moderate"],
        intensityLabel: "Light to moderate",
        people: ["solo", "partner", "group"],
        equipmentLevel: "none",
        equipmentLabel: "No equipment",
        minimumMinutes: 10,
        recommendedMinutes: 15,
        difficulty: "beginner",
        motion: "walking",
        prop: "none",
        description: "A comfortable walk is a simple way to leave your screen, reset your posture and clear your mind.",
        steps: [
            "Stand tall and relax your shoulders.",
            "Walk at a comfortable, purposeful pace.",
            "Slow down gently before returning to your desk."
        ]
    },
    {
        id: "running",
        name: "Running",
        category: "Cardio",
        goals: ["fitness", "endurance"],
        venues: ["indoor", "outdoor"],
        intensities: ["moderate", "vigorous"],
        intensityLabel: "Moderate to vigorous",
        people: ["solo", "partner", "group"],
        equipmentLevel: "none",
        equipmentLabel: "Running shoes",
        minimumMinutes: 15,
        recommendedMinutes: 25,
        difficulty: "intermediate",
        motion: "running",
        prop: "none",
        description: "A short run or walk-run interval can build cardiovascular fitness. Beginners can alternate easy jogging with walking.",
        steps: [
            "Begin with a few minutes of brisk walking.",
            "Jog at a pace that feels controlled.",
            "Walk slowly to cool down."
        ]
    },
    {
        id: "yoga",
        name: "Yoga",
        category: "Mind and body",
        goals: ["relaxation", "flexibility", "fitness"],
        venues: ["indoor", "outdoor"],
        intensities: ["light", "moderate"],
        intensityLabel: "Light to moderate",
        people: ["solo", "group"],
        equipmentLevel: "none",
        equipmentLabel: "No equipment (mat optional)",
        minimumMinutes: 10,
        recommendedMinutes: 20,
        difficulty: "beginner",
        motion: "yoga",
        prop: "yoga-mat",
        description: "A gentle yoga break combines controlled movement, balance and breathing. Choose simple poses that feel comfortable.",
        steps: [
            "Find a clear, stable space.",
            "Move slowly through comfortable stretches.",
            "Breathe steadily and avoid forcing a position."
        ]
    },
    {
        id: "bodyweight",
        name: "Bodyweight Training",
        category: "Strength",
        goals: ["fitness", "strength"],
        venues: ["indoor", "outdoor"],
        intensities: ["moderate", "vigorous"],
        intensityLabel: "Moderate to vigorous",
        people: ["solo", "partner", "group"],
        equipmentLevel: "none",
        equipmentLabel: "No equipment",
        minimumMinutes: 15,
        recommendedMinutes: 20,
        difficulty: "beginner",
        motion: "bodyweight",
        prop: "none",
        description: "Simple bodyweight movements can train several muscle groups without gym equipment. Adjust the movement to your current ability.",
        steps: [
            "Warm up with easy joint movements.",
            "Try controlled squats, wall push-ups or standing exercises.",
            "Rest between sets and keep every movement controlled."
        ]
    },
    {
        id: "jump-rope",
        name: "Jump Rope",
        category: "Cardio",
        goals: ["fitness", "endurance"],
        venues: ["indoor", "outdoor"],
        intensities: ["moderate", "vigorous"],
        intensityLabel: "Moderate to vigorous",
        people: ["solo", "partner"],
        equipmentLevel: "basic",
        equipmentLabel: "Jump rope",
        minimumMinutes: 10,
        recommendedMinutes: 15,
        difficulty: "intermediate",
        motion: "jump-rope",
        prop: "rope",
        description: "Short skipping intervals create an energetic cardiovascular break. Use a clear space and begin with small, controlled jumps.",
        steps: [
            "Check that the floor and surrounding area are clear.",
            "Start with short intervals and small jumps.",
            "Pause to rest whenever you need to."
        ]
    },
    {
        id: "cycling",
        name: "Cycling",
        category: "Cardio",
        goals: ["fitness", "endurance", "social"],
        venues: ["indoor", "outdoor"],
        intensities: ["light", "moderate", "vigorous"],
        intensityLabel: "Variable: light to vigorous",
        people: ["solo", "partner", "group"],
        equipmentLevel: "facility",
        equipmentLabel: "Bicycle or stationary bike",
        minimumMinutes: 20,
        recommendedMinutes: 30,
        difficulty: "beginner",
        motion: "cycling",
        prop: "bike",
        description: "Cycling can be adapted to different paces and can take place outdoors or on a stationary bike.",
        steps: [
            "Check the bicycle and wear a suitable helmet outdoors.",
            "Begin at an easy pace on a safe route or stationary bike.",
            "Increase effort only if it feels comfortable."
        ]
    },
    {
        id: "badminton",
        name: "Badminton",
        category: "Racket sport",
        goals: ["fitness", "endurance", "social"],
        venues: ["indoor"],
        intensities: ["moderate", "vigorous"],
        intensityLabel: "Moderate to vigorous",
        people: ["partner", "group"],
        equipmentLevel: "facility",
        equipmentLabel: "Racket, shuttlecock and court",
        minimumMinutes: 20,
        recommendedMinutes: 30,
        difficulty: "intermediate",
        motion: "badminton",
        prop: "badminton",
        description: "A friendly badminton session combines coordination and movement. Beginners can start with gentle rallies.",
        steps: [
            "Warm up your shoulders, wrists and legs.",
            "Start with short, controlled rallies.",
            "Move around the court at a comfortable pace."
        ]
    },
    {
        id: "table-tennis",
        name: "Table Tennis",
        category: "Racket sport",
        goals: ["fitness", "social"],
        venues: ["indoor"],
        intensities: ["light", "moderate"],
        intensityLabel: "Light to moderate",
        people: ["partner", "group"],
        equipmentLevel: "facility",
        equipmentLabel: "Paddles, ball and table",
        minimumMinutes: 15,
        recommendedMinutes: 25,
        difficulty: "beginner",
        motion: "table-tennis",
        prop: "table-tennis",
        description: "Table tennis is a compact activity for practising coordination and enjoying a short social break.",
        steps: [
            "Relax your shoulders and hold the paddle comfortably.",
            "Begin with steady, gentle returns.",
            "Increase the pace only when both players are ready."
        ]
    },
    {
        id: "basketball",
        name: "Basketball",
        category: "Team sport",
        goals: ["fitness", "endurance", "social"],
        venues: ["indoor", "outdoor"],
        intensities: ["moderate", "vigorous"],
        intensityLabel: "Moderate to vigorous",
        people: ["solo", "partner", "group"],
        equipmentLevel: "facility",
        equipmentLabel: "Basketball and court",
        minimumMinutes: 20,
        recommendedMinutes: 30,
        difficulty: "intermediate",
        motion: "basketball",
        prop: "basketball",
        description: "You do not need a full match to enjoy basketball: shooting and controlled dribbling are useful ways to move.",
        steps: [
            "Warm up your wrists, shoulders and legs.",
            "Practise slow dribbling or close-range shots.",
            "Take breaks and keep the pace comfortable."
        ]
    },
    {
        id: "football",
        name: "Football",
        category: "Team sport",
        goals: ["fitness", "endurance", "social"],
        venues: ["outdoor"],
        intensities: ["moderate", "vigorous"],
        intensityLabel: "Moderate to vigorous",
        people: ["partner", "group"],
        equipmentLevel: "facility",
        equipmentLabel: "Football and playing space",
        minimumMinutes: 20,
        recommendedMinutes: 30,
        difficulty: "intermediate",
        motion: "football",
        prop: "football",
        description: "A short football break can focus on gentle dribbling and passing instead of a full competitive match.",
        steps: [
            "Warm up your ankles, knees and hips.",
            "Practise close control at a slow pace.",
            "Try short passes with a partner."
        ]
    },
    {
        id: "volleyball",
        name: "Volleyball",
        category: "Team sport",
        goals: ["fitness", "social"],
        venues: ["indoor", "outdoor"],
        intensities: ["moderate", "vigorous"],
        intensityLabel: "Moderate to vigorous",
        people: ["partner", "group"],
        equipmentLevel: "facility",
        equipmentLabel: "Volleyball, net and court",
        minimumMinutes: 20,
        recommendedMinutes: 30,
        difficulty: "intermediate",
        motion: "volleyball",
        prop: "volleyball",
        description: "Passing and setting with a partner can make volleyball accessible even without organising a full game.",
        steps: [
            "Warm up your shoulders, wrists and fingers.",
            "Practise gentle forearm passes.",
            "Add simple sets when you feel ready."
        ]
    },
    {
        id: "swimming",
        name: "Swimming",
        category: "Water activity",
        goals: ["fitness", "endurance", "relaxation"],
        venues: ["indoor", "outdoor"],
        intensities: ["light", "moderate", "vigorous"],
        intensityLabel: "Variable: light to vigorous",
        people: ["solo", "partner"],
        equipmentLevel: "facility",
        equipmentLabel: "Swimming pool and swimwear",
        minimumMinutes: 20,
        recommendedMinutes: 30,
        difficulty: "intermediate",
        motion: "swimming",
        prop: "swim",
        description: "Swimming offers a whole-body activity. Only swim where lifeguards or appropriate supervision are available, and only if you can swim safely.",
        steps: [
            "Use a supervised pool and follow its safety rules.",
            "Start gently and choose a distance that suits your ability.",
            "Rest when needed and leave the water if you feel unwell."
        ]
    },
    {
        id: "strength",
        name: "Strength Training",
        category: "Strength",
        goals: ["fitness", "strength"],
        venues: ["indoor"],
        intensities: ["moderate", "vigorous"],
        intensityLabel: "Moderate to vigorous",
        people: ["solo", "partner"],
        equipmentLevel: "facility",
        equipmentLabel: "Suitable weights or gym equipment",
        minimumMinutes: 20,
        recommendedMinutes: 30,
        difficulty: "intermediate",
        motion: "strength",
        prop: "dumbbell",
        description: "A short strength session can use light, manageable resistance and controlled technique.",
        steps: [
            "Warm up before using weights.",
            "Choose a manageable resistance and learn the movement first.",
            "Stop if your technique becomes uncomfortable or uncontrolled."
        ]
    }
];

const timeRanges = {
    short: { min: 10, max: 20, label: "10–20 minutes" },
    medium: { min: 20, max: 40, label: "20–40 minutes" },
    long: { min: 40, max: 60, label: "40–60 minutes" },
    extended: { min: 60, max: 120, label: "60+ minutes" }
};

const equipmentAccess = {
    none: 0,
    basic: 1,
    facility: 2
};

const labels = {
    fitness: "General fitness",
    endurance: "Build endurance",
    strength: "Build strength",
    relaxation: "Relax and reset",
    flexibility: "Improve flexibility",
    social: "Meet and move with others",
    any: "No preference",
    indoor: "Indoor",
    outdoor: "Outdoor",
    solo: "On your own",
    partner: "With a partner",
    group: "In a group",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced"
};

const form = document.querySelector("#activity-form");
const resetButton = document.querySelector("#reset-button");
const adjustButton = document.querySelector("#adjust-button");
const replayButton = document.querySelector("#replay-button");
const sportGrid = document.querySelector("#sport-card-grid");
const alternativeList = document.querySelector("#alternative-list");

const movementStage = document.querySelector("#movement-stage");
const recommendationCard = document.querySelector("#recommendation-card");
const alternativesPanel = document.querySelector("#alternatives-panel");
const noResults = document.querySelector("#no-results");
const previewNote = document.querySelector("#preview-note");
const resultStatus = document.querySelector("#result-status");

const sportName = document.querySelector("#sport-name");
const sportDescription = document.querySelector("#sport-description");
const sportTime = document.querySelector("#sport-time");
const sportIntensity = document.querySelector("#sport-intensity");
const sportVenue = document.querySelector("#sport-venue");
const sportEquipment = document.querySelector("#sport-equipment");
const matchScore = document.querySelector("#match-score");
const resultLabel = document.querySelector("#result-label");
const matchReasonsList = document.querySelector("#match-reasons-list");
const sportSteps = document.querySelector("#sport-steps");
const encouragement = document.querySelector("#encouragement");
const stageCaption = document.querySelector("#stage-caption");

let currentSport = sports.find((sport) => sport.id === "walking");
let currentResults = [];

function getFormValue(name) {
    const selected = form.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : "";
}

function getUserChoices() {
    return {
        goal: getFormValue("goal"),
        time: timeRanges[getFormValue("time")] || timeRanges.short,
        venue: getFormValue("venue"),
        intensity: getFormValue("intensity"),
        equipment: getFormValue("equipment"),
        experience: getFormValue("experience"),
        social: getFormValue("social")
    };
}

/*
 * Hard filters are reserved for practical limits:
 * - enough time for the minimum suggested session;
 * - the activity is available in the chosen setting;
 * - the user has access to the required equipment/facility level.
 *
 * Goal, intensity, experience and social preference affect ranking,
 * not eligibility. This prevents a long list of soft preferences
 * from accidentally producing an empty result.
 */
function passesHardFilters(sport, choices) {
    const enoughTime = sport.minimumMinutes <= choices.time.max;

    const venueAvailable =
        choices.venue === "any" || sport.venues.includes(choices.venue);

    const hasEquipment =
        equipmentAccess[sport.equipmentLevel] <= equipmentAccess[choices.equipment];

    return enoughTime && venueAvailable && hasEquipment;
}

function calculateSportScore(sport, choices) {
    let score = 0;
    let possibleScore = 0;
    const reasons = [];

    // Main goal: 4 points.
    possibleScore += 4;

    if (sport.goals.includes(choices.goal)) {
        score += 4;
        reasons.push(`Matches your goal: ${labels[choices.goal]}.`);
    }

    // Time: 2 points. Minimum time is already checked as a hard filter.
    possibleScore += 2;

    const durationFitsPreferredRange =
        sport.recommendedMinutes >= choices.time.min &&
        sport.recommendedMinutes <= choices.time.max;

    if (durationFitsPreferredRange) {
        score += 2;
        reasons.push(`Its suggested ${sport.recommendedMinutes}-minute session fits your time range.`);
    } else {
        score += 1;
        reasons.push(`A shorter ${sport.recommendedMinutes}-minute session is possible within your available time.`);
    }

    // Intensity: 3 points when the user's preferred intensity is supported.
    if (choices.intensity !== "any") {
        possibleScore += 3;

        if (sport.intensities.includes(choices.intensity)) {
            score += 3;
            reasons.push(`Supports your preferred ${choices.intensity} intensity.`);
        }
    }

    // Experience: 2 points for an exact level, 1 for a nearby level.
    if (choices.experience !== "any") {
        possibleScore += 2;

        const levelRank = {
            beginner: 0,
            intermediate: 1,
            advanced: 2
        };

        const levelGap = Math.abs(
            levelRank[sport.difficulty] - levelRank[choices.experience]
        );

        if (levelGap === 0) {
            score += 2;
            reasons.push(`Its typical learning level matches your ${choices.experience} experience.`);
        } else if (levelGap === 1) {
            score += 1;
            reasons.push("You can adapt this activity to your current experience level.");
        }
    }

    // Social style: 1 point.
    if (choices.social !== "any") {
        possibleScore += 1;

        if (sport.people.includes(choices.social)) {
            score += 1;
            reasons.push(`Fits your preference: ${labels[choices.social].toLowerCase()}.`);
        }
    }

    if (choices.venue !== "any") {
        reasons.push(`Available in an ${choices.venue === "indoor" ? "indoor" : "outdoor"} setting.`);
    }

    if (choices.equipment !== "facility") {
        reasons.push(`Fits your selected equipment access: ${choices.equipment === "none" ? "no equipment" : "basic equipment"}.`);
    }

    const percentage = possibleScore > 0
        ? Math.round((score / possibleScore) * 100)
        : 0;

    return {
        score,
        possibleScore,
        percentage,
        reasons
    };
}

function findMatchingSports(choices) {
    return sports
        .filter((sport) => passesHardFilters(sport, choices))
        .map((sport) => ({
            sport,
            ...calculateSportScore(sport, choices)
        }))
        .sort((a, b) => {
            if (b.percentage !== a.percentage) {
                return b.percentage - a.percentage;
            }

            if (b.score !== a.score) {
                return b.score - a.score;
            }

            return a.sport.recommendedMinutes - b.sport.recommendedMinutes;
        });
}

function getVenueLabel(sport) {
    if (
        sport.venues.includes("indoor") &&
        sport.venues.includes("outdoor")
    ) {
        return "Indoor or outdoor";
    }

    return sport.venues[0] === "indoor" ? "Indoor" : "Outdoor";
}

function getSuggestedMinutes(sport, choices) {
    return Math.min(
        choices.time.max,
        Math.max(sport.minimumMinutes, sport.recommendedMinutes)
    );
}

function addListItems(container, items) {
    container.replaceChildren();

    items.forEach((text) => {
        const item = document.createElement("li");
        item.textContent = text;
        container.appendChild(item);
    });
}

function setStageMotion(sport) {
    movementStage.dataset.motion = sport.motion;
    movementStage.dataset.prop = sport.prop;
    const selectedVenue = getFormValue("venue");
    movementStage.dataset.scene = sport.motion === "swimming"
        ? "pool"
        : selectedVenue === "indoor" || selectedVenue === "outdoor"
            ? selectedVenue
            : sport.venues.includes("outdoor")
                ? "outdoor"
                : "indoor";

    movementStage.setAttribute(
        "aria-label",
        `Animated illustration of ${sport.name.toLowerCase()}`
    );

    stageCaption.textContent =
        `${sport.name}: a simple movement break for your day.`;
}

function renderSport(sport, result, displayMode = "recommendation") {
    currentSport = sport;

    const choices = getUserChoices();
    const suggestedMinutes = getSuggestedMinutes(sport, choices);

    sportName.textContent = sport.name;
    sportDescription.textContent = sport.description;
    sportTime.textContent = `${suggestedMinutes} minutes`;
    sportIntensity.textContent = sport.intensityLabel;
    sportVenue.textContent = getVenueLabel(sport);
    sportEquipment.textContent = sport.equipmentLabel;

    resultLabel.textContent =
        displayMode === "preview"
            ? "ACTIVITY LIBRARY PREVIEW"
            : displayMode === "alternative"
                ? "ANOTHER GOOD MATCH"
                : "BEST MATCH FOR YOU";

    if (result) {
        matchScore.textContent =
            `${result.percentage}% preference fit`;

        addListItems(
            matchReasonsList,
            result.reasons.slice(0, 4)
        );
    } else {
        matchScore.textContent = "Explore this activity";

        addListItems(matchReasonsList, [
            `Activity category: ${sport.category}.`,
            `Typical setting: ${getVenueLabel(sport)}.`,
            `Equipment: ${sport.equipmentLabel}.`
        ]);
    }

    addListItems(sportSteps, sport.steps);

    encouragement.textContent =
        "Start at a comfortable level, warm up first and stop if you feel pain, dizziness or unusual discomfort.";

    setStageMotion(sport);

    recommendationCard.hidden = false;
    movementStage.hidden = false;
    previewNote.hidden = displayMode !== "preview";
    noResults.hidden = true;

    document.querySelectorAll(".sport-card").forEach((card) => {
        card.classList.toggle(
            "is-selected",
            card.dataset.sportId === sport.id
        );
    });

    resultStatus.textContent =
        displayMode === "preview"
            ? `${sport.name} activity preview loaded.`
            : `${sport.name} selected. ${result ? `${result.percentage} percent preference fit.` : ""}`;
}

function renderAlternatives(results) {
    alternativeList.replaceChildren();

    const alternatives = results.slice(1, 3);

    alternativesPanel.hidden = alternatives.length === 0;

    alternatives.forEach((result) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "alternative-card";

        const name = document.createElement("strong");
        name.textContent = result.sport.name;

        const detail = document.createElement("span");
        detail.textContent =
            `${result.sport.recommendedMinutes} min · ${result.percentage}% preference fit`;

        const arrow = document.createElement("span");
        arrow.className = "alternative-arrow";
        arrow.setAttribute("aria-hidden", "true");
        arrow.textContent = "→";

        button.append(name, detail, arrow);

        button.addEventListener("click", () => {
            renderSport(result.sport, result, "alternative");

            if (window.matchMedia("(max-width: 900px)").matches) {
                document.querySelector(".break-result").scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });

        alternativeList.appendChild(button);
    });
}

function renderRecommendations() {
    const choices = getUserChoices();

    currentResults = findMatchingSports(choices);

    previewNote.hidden = true;

    if (currentResults.length === 0) {
        recommendationCard.hidden = true;
        movementStage.hidden = true;
        alternativesPanel.hidden = true;
        noResults.hidden = false;

        resultStatus.textContent =
            "No activities match all of your selected time, venue and equipment requirements.";

        return;
    }

    noResults.hidden = true;
    movementStage.hidden = false;
    recommendationCard.hidden = false;

    const best = currentResults[0];

    renderSport(best.sport, best, "recommendation");
    renderAlternatives(currentResults);

    resultStatus.textContent =
        `${currentResults.length} activities match your practical requirements. Best match: ${best.sport.name}.`;
}

function renderSportLibrary() {
    sportGrid.replaceChildren();

    sports.forEach((sport) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "sport-card";
        button.dataset.sportId = sport.id;
        button.setAttribute("aria-label", `Preview ${sport.name}`);

        const pictogram = document.createElement("span");

        pictogram.className =
            `sport-card__pictogram sport-card__pictogram--${sport.motion}`;

        pictogram.setAttribute("aria-hidden", "true");
        pictogram.textContent = sport.name.slice(0, 1);

        const text = document.createElement("span");
        text.className = "sport-card__text";

        const title = document.createElement("strong");
        title.textContent = sport.name;

        const detail = document.createElement("small");
        detail.textContent =
            `${sport.category} · from ${sport.minimumMinutes} min`;

        text.append(title, detail);
        button.append(pictogram, text);

        button.addEventListener("click", () => {
            renderSport(sport, null, "preview");

            document.querySelector(".break-result").scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? "auto"
                    : "smooth",
                block: "start"
            });
        });

        sportGrid.appendChild(button);
    });
}

function replayAnimation() {
    movementStage.classList.add("animation-paused");

    // Force a style recalculation, then allow the CSS animation to restart.
    void movementStage.offsetWidth;

    window.requestAnimationFrame(() => {
        movementStage.classList.remove("animation-paused");
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderRecommendations();
});

form.addEventListener("reset", () => {
    window.setTimeout(renderRecommendations, 0);
});

replayButton.addEventListener("click", replayAnimation);

form.querySelectorAll('input[name="venue"]').forEach((input) => {
    input.addEventListener("change", () => setStageMotion(currentSport));
});

adjustButton.addEventListener("click", () => {
    form.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        block: "start"
    });
});

renderSportLibrary();
renderRecommendations();