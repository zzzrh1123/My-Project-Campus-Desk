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

/*
 * Pivot-style animation rig
 * -------------------------
 * Every activity now reuses one side-view figure. The upper/lower
 * arms and thighs/shins are separate fixed-length bones, so elbows
 * and knees bend without stretching the character. Walking, running,
 * cycling and swimming explicitly keep opposite limbs half a cycle
 * apart.
 */
const rigElements = {
    shadow: document.querySelector("#athlete-shadow"),
    torso: document.querySelector("#rig-torso"),
    head: document.querySelector("#rig-head"),
    face: document.querySelector("#rig-face"),
    frontUpperArm: document.querySelector("#rig-front-upper-arm"),
    frontLowerArm: document.querySelector("#rig-front-lower-arm"),
    backUpperArm: document.querySelector("#rig-back-upper-arm"),
    backLowerArm: document.querySelector("#rig-back-lower-arm"),
    frontThigh: document.querySelector("#rig-front-thigh"),
    frontShin: document.querySelector("#rig-front-shin"),
    backThigh: document.querySelector("#rig-back-thigh"),
    backShin: document.querySelector("#rig-back-shin"),
    shoulderJoint: document.querySelector("#rig-shoulder-joint"),
    hipJoint: document.querySelector("#rig-hip-joint"),
    frontElbowJoint: document.querySelector("#rig-front-elbow-joint"),
    backElbowJoint: document.querySelector("#rig-back-elbow-joint"),
    frontKneeJoint: document.querySelector("#rig-front-knee-joint"),
    backKneeJoint: document.querySelector("#rig-back-knee-joint"),
    rope: document.querySelector("#rig-rope"),
    bikeRearWheel: document.querySelector("#bike-rear-wheel"),
    bikeFrontWheel: document.querySelector("#bike-front-wheel"),
    racket: document.querySelector("#rig-racket"),
    paddle: document.querySelector("#rig-paddle"),
    ball: document.querySelector("#rig-ball"),
    barbell: document.querySelector("#rig-barbell"),
    shuttle: document.querySelector("#rig-shuttle"),
    opponentRacket: document.querySelector("#rig-opponent-racket"),
    opponentPaddle: document.querySelector("#rig-opponent-paddle")
};

const opponentFigure = document.querySelector("#pivot-athlete-opponent");
const opponentRigElements = {
    shadow: opponentFigure.querySelector(".athlete-shadow"),
    torso: opponentFigure.querySelector(".rig-torso"),
    head: opponentFigure.querySelector(".rig-head"),
    face: opponentFigure.querySelector(".rig-face"),
    frontUpperArm: opponentFigure.querySelector(".rig-front-upper-arm"),
    frontLowerArm: opponentFigure.querySelector(".rig-front-lower-arm"),
    backUpperArm: opponentFigure.querySelector(".rig-back-upper-arm"),
    backLowerArm: opponentFigure.querySelector(".rig-back-lower-arm"),
    frontThigh: opponentFigure.querySelector(".rig-front-thigh"),
    frontShin: opponentFigure.querySelector(".rig-front-shin"),
    backThigh: opponentFigure.querySelector(".rig-back-thigh"),
    backShin: opponentFigure.querySelector(".rig-back-shin"),
    shoulderJoint: opponentFigure.querySelector(".rig-shoulder-joint"),
    hipJoint: opponentFigure.querySelector(".rig-hip-joint"),
    frontElbowJoint: opponentFigure.querySelector(".rig-front-elbow-joint"),
    backElbowJoint: opponentFigure.querySelector(".rig-back-elbow-joint"),
    frontKneeJoint: opponentFigure.querySelector(".rig-front-knee-joint"),
    backKneeJoint: opponentFigure.querySelector(".rig-back-knee-joint")
};

const rigLengths = {
    torso: 68,
    headOffset: 28,
    upperArm: 42,
    lowerArm: 39,
    thigh: 52,
    shin: 50
};

const reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

let motionFrame = 0;
let motionStartedAt = performance.now();

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
}

function mix(from, to, amount) {
    return from + (to - from) * amount;
}

function smoothStep(value) {
    const amount = clamp(value, 0, 1);
    return amount * amount * (3 - 2 * amount);
}

function pointFrom(origin, length, angle) {
    const radians = toRadians(angle);

    return {
        x: origin.x + Math.sin(radians) * length,
        y: origin.y + Math.cos(radians) * length
    };
}

function setLine(element, start, end) {
    element.setAttribute("x1", start.x.toFixed(2));
    element.setAttribute("y1", start.y.toFixed(2));
    element.setAttribute("x2", end.x.toFixed(2));
    element.setAttribute("y2", end.y.toFixed(2));
}

function setCircle(element, point) {
    element.setAttribute("cx", point.x.toFixed(2));
    element.setAttribute("cy", point.y.toFixed(2));
}

function solveTwoBoneJoint(start, target, firstLength, secondLength, bendDirection = 1) {
    const deltaX = target.x - start.x;
    const deltaY = target.y - start.y;
    const rawDistance = Math.hypot(deltaX, deltaY);
    const distance = clamp(
        rawDistance,
        Math.abs(firstLength - secondLength) + 0.01,
        firstLength + secondLength - 0.01
    );
    const unitX = deltaX / (rawDistance || 1);
    const unitY = deltaY / (rawDistance || 1);
    const along = (
        firstLength * firstLength - secondLength * secondLength + distance * distance
    ) / (2 * distance);
    const height = Math.sqrt(
        Math.max(0, firstLength * firstLength - along * along)
    );

    return {
        x: start.x + unitX * along - unitY * height * bendDirection,
        y: start.y + unitY * along + unitX * height * bendDirection
    };
}

function defaultPose() {
    return {
        hip: { x: 210, y: 166 },
        bodyLean: 0,
        frontUpperArm: 12,
        frontLowerArm: 4,
        backUpperArm: -12,
        backLowerArm: -4,
        frontThigh: 8,
        frontShin: 2,
        backThigh: -8,
        backShin: -2,
        shadowScale: 1
    };
}

function renderSkeleton(pose, elements = rigElements) {
    const hip = pose.hip;
    const shoulder = pointFrom(
        hip,
        rigLengths.torso,
        180 - pose.bodyLean
    );
    const head = pointFrom(
        shoulder,
        rigLengths.headOffset,
        180 - pose.bodyLean
    );

    const frontElbow = pointFrom(
        shoulder,
        rigLengths.upperArm,
        pose.frontUpperArm
    );
    const frontHand = pointFrom(
        frontElbow,
        rigLengths.lowerArm,
        pose.frontLowerArm
    );
    const backElbow = pointFrom(
        shoulder,
        rigLengths.upperArm,
        pose.backUpperArm
    );
    const backHand = pointFrom(
        backElbow,
        rigLengths.lowerArm,
        pose.backLowerArm
    );

    const frontKnee = pointFrom(
        hip,
        rigLengths.thigh,
        pose.frontThigh
    );
    const frontFoot = pointFrom(
        frontKnee,
        rigLengths.shin,
        pose.frontShin
    );
    const backKnee = pointFrom(
        hip,
        rigLengths.thigh,
        pose.backThigh
    );
    const backFoot = pointFrom(
        backKnee,
        rigLengths.shin,
        pose.backShin
    );

    setLine(elements.torso, hip, shoulder);
    setLine(elements.frontUpperArm, shoulder, frontElbow);
    setLine(elements.frontLowerArm, frontElbow, frontHand);
    setLine(elements.backUpperArm, shoulder, backElbow);
    setLine(elements.backLowerArm, backElbow, backHand);
    setLine(elements.frontThigh, hip, frontKnee);
    setLine(elements.frontShin, frontKnee, frontFoot);
    setLine(elements.backThigh, hip, backKnee);
    setLine(elements.backShin, backKnee, backFoot);

    setCircle(elements.head, head);
    setCircle(elements.shoulderJoint, shoulder);
    setCircle(elements.hipJoint, hip);
    setCircle(elements.frontElbowJoint, frontElbow);
    setCircle(elements.backElbowJoint, backElbow);
    setCircle(elements.frontKneeJoint, frontKnee);
    setCircle(elements.backKneeJoint, backKnee);

    elements.face.setAttribute(
        "d",
        `M ${head.x + 10} ${head.y - 3} ` +
        `L ${head.x + 16} ${head.y} ` +
        `L ${head.x + 10} ${head.y + 3}`
    );

    elements.shadow.setAttribute("cx", hip.x.toFixed(2));
    elements.shadow.setAttribute("cy", (pose.shadowY ?? 267).toFixed(2));
    elements.shadow.setAttribute("rx", (68 * pose.shadowScale).toFixed(2));
    elements.shadow.style.opacity = String(
        0.28 + pose.shadowScale * 0.35
    );

    return {
        hip,
        shoulder,
        head,
        frontElbow,
        frontHand,
        backElbow,
        backHand,
        frontKnee,
        frontFoot,
        backKnee,
        backFoot
    };
}

function setLimbByTarget(side, start, target, firstLength, secondLength, bendDirection) {
    const joint = solveTwoBoneJoint(
        start,
        target,
        firstLength,
        secondLength,
        bendDirection
    );

    if (side === "frontArm") {
        setLine(rigElements.frontUpperArm, start, joint);
        setLine(rigElements.frontLowerArm, joint, target);
        setCircle(rigElements.frontElbowJoint, joint);
    } else if (side === "backArm") {
        setLine(rigElements.backUpperArm, start, joint);
        setLine(rigElements.backLowerArm, joint, target);
        setCircle(rigElements.backElbowJoint, joint);
    } else if (side === "frontLeg") {
        setLine(rigElements.frontThigh, start, joint);
        setLine(rigElements.frontShin, joint, target);
        setCircle(rigElements.frontKneeJoint, joint);
    } else {
        setLine(rigElements.backThigh, start, joint);
        setLine(rigElements.backShin, joint, target);
        setCircle(rigElements.backKneeJoint, joint);
    }

    return joint;
}

function setMirroredTransform(element, x, y, rotation = 0) {
    element.setAttribute(
        "transform",
        `translate(${x.toFixed(2)} ${y.toFixed(2)}) ` +
        `rotate(${rotation.toFixed(2)}) scale(-1 1)`
    );
}

function setTransform(element, x, y, rotation = 0, scale = 1) {
    element.setAttribute(
        "transform",
        `translate(${x.toFixed(2)} ${y.toFixed(2)}) ` +
        `rotate(${rotation.toFixed(2)}) scale(${scale})`
    );
}

function renderWalking(time) {
    const phase = time * Math.PI * 2 / 1.08;
    const stride = Math.sin(phase);
    const oppositeStride = -stride;
    const pose = defaultPose();

    pose.hip.y = 166 - Math.abs(Math.cos(phase)) * 3;
    pose.frontUpperArm = -34 * stride;
    pose.backUpperArm = 34 * stride;
    pose.frontLowerArm = -17 * stride;
    pose.backLowerArm = 17 * stride;
    pose.frontThigh = 29 * stride;
    pose.backThigh = 29 * oppositeStride;
    pose.frontShin = 10 * stride - 18 * Math.max(0, -stride);
    pose.backShin = 10 * oppositeStride - 18 * Math.max(0, -oppositeStride);
    pose.shadowScale = 0.94 + Math.abs(Math.cos(phase)) * 0.06;

    renderSkeleton(pose);
}

function renderRunning(time) {
    const phase = time * Math.PI * 2 / 0.72;
    const stride = Math.sin(phase);
    const oppositeStride = -stride;
    const frontArmSwing = (stride + 1) / 2;
    const backArmSwing = (oppositeStride + 1) / 2;
    const pose = defaultPose();

    pose.bodyLean = 9;
    pose.hip.y = 166 - Math.abs(Math.cos(phase)) * 8;
    pose.frontUpperArm = mix(-55, 18, frontArmSwing);
    pose.frontLowerArm = mix(-55, 90, frontArmSwing);
    pose.backUpperArm = mix(-55, 18, backArmSwing);
    pose.backLowerArm = mix(-55, 90, backArmSwing);
    pose.frontThigh = 44 * stride;
    pose.backThigh = 44 * oppositeStride;
    pose.frontShin = 12 * stride - 45 * Math.max(0, -stride);
    pose.backShin = 12 * oppositeStride - 45 * Math.max(0, -oppositeStride);
    pose.shadowScale = 0.7 + Math.abs(Math.cos(phase)) * 0.18;

    renderSkeleton(pose);
}

function renderYoga(time) {
    const breath = (Math.sin(time * Math.PI * 2 / 4.2) + 1) / 2;
    const pose = defaultPose();

    pose.hip = { x: 210, y: 184 - breath * 3 };
    pose.shadowY = 224;
    pose.bodyLean = 2;
    pose.frontUpperArm = mix(78, 150, breath);
    pose.frontLowerArm = mix(105, 165, breath);
    pose.backUpperArm = mix(-78, -150, breath);
    pose.backLowerArm = mix(-105, -165, breath);
    pose.frontThigh = 65;
    pose.frontShin = 88;
    pose.backThigh = -65;
    pose.backShin = -88;
    pose.shadowScale = 0.92;

    renderSkeleton(pose);
}

function renderBodyweight(time) {
    const lower = (1 - Math.cos(time * Math.PI * 2 / 1.8)) / 2;
    const pose = defaultPose();

    pose.hip = { x: 166, y: 153 + lower * 18 };
    pose.bodyLean = 88;
    pose.shadowScale = 1.08;

    const points = renderSkeleton(pose);
    const frontHand = { x: 274, y: 238 };
    const backHand = { x: 270, y: 238 };
    const frontFoot = { x: 72, y: 238 };
    const backFoot = { x: 91, y: 238 };

    setLimbByTarget(
        "frontArm",
        points.shoulder,
        frontHand,
        rigLengths.upperArm,
        rigLengths.lowerArm,
        lower
    );
    setLimbByTarget(
        "backArm",
        points.shoulder,
        backHand,
        rigLengths.upperArm,
        rigLengths.lowerArm,
        lower
    );
    setLimbByTarget(
        "frontLeg",
        points.hip,
        frontFoot,
        rigLengths.thigh,
        rigLengths.shin,
        0
    );
    setLimbByTarget(
        "backLeg",
        points.hip,
        backFoot,
        rigLengths.thigh,
        rigLengths.shin,
        0
    );
}

function renderJumpRope(time) {
    const phase = time * Math.PI * 2 / 0.76;
    const jump = Math.max(0, Math.sin(phase));
    const landing = Math.max(0, -Math.sin(phase));
    const pose = defaultPose();

    pose.hip.y = 168 - jump * 22 + landing * 4;
    pose.frontUpperArm = 45;
    pose.frontLowerArm = 62;
    pose.backUpperArm = -45;
    pose.backLowerArm = -62;
    pose.frontThigh = 4 + landing * 7;
    pose.backThigh = -4 - landing * 7;
    pose.frontShin = -2 + landing * 10;
    pose.backShin = 2 - landing * 10;
    pose.shadowScale = 1 - jump * 0.3;

    const points = renderSkeleton(pose);
    const ropePhase = Math.sin(phase);
    const arcHeight = ropePhase >= 0
        ? ropePhase * 142
        : ropePhase * 120;
    const controlOffset = arcHeight * 4 / 3;

    rigElements.rope.setAttribute(
        "d",
        `M ${points.backHand.x} ${points.backHand.y} ` +
        `C ${points.backHand.x} ${points.backHand.y + controlOffset} ` +
        `${points.frontHand.x} ${points.frontHand.y + controlOffset} ` +
        `${points.frontHand.x} ${points.frontHand.y}`
    );
}

function renderCycling(time) {
    const phase = time * Math.PI * 2 / 1.12;
    const pose = defaultPose();

    pose.hip = { x: 213, y: 151 };
    pose.bodyLean = 34;
    pose.shadowScale = 1.08;

    const points = renderSkeleton(pose);
    const crank = { x: 220, y: 226 };
    const frontPedal = {
        x: crank.x + Math.cos(phase) * 27,
        y: crank.y + Math.sin(phase) * 27
    };
    const backPedal = {
        x: crank.x - Math.cos(phase) * 27,
        y: crank.y - Math.sin(phase) * 27
    };
    const frontHandle = { x: 282, y: 145 };
    const backHandle = { x: 273, y: 151 };
    const wheelAngle = (time * 360 / 0.56).toFixed(2);

    rigElements.bikeRearWheel.setAttribute(
        "transform", `rotate(${wheelAngle} 112 226)`
    );
    rigElements.bikeFrontWheel.setAttribute(
        "transform", `rotate(${wheelAngle} 306 226)`
    );

    setLimbByTarget(
        "frontLeg",
        points.hip,
        frontPedal,
        rigLengths.thigh,
        rigLengths.shin,
        -1
    );
    setLimbByTarget(
        "backLeg",
        points.hip,
        backPedal,
        rigLengths.thigh,
        rigLengths.shin,
        -1
    );
    setLimbByTarget(
        "frontArm",
        points.shoulder,
        frontHandle,
        rigLengths.upperArm,
        rigLengths.lowerArm,
        1
    );
    setLimbByTarget(
        "backArm",
        points.shoulder,
        backHandle,
        rigLengths.upperArm,
        rigLengths.lowerArm,
        1
    );
}

function rallyHit(phase, hitPoint) {
    const distance = Math.abs(phase - hitPoint);
    return 1 - smoothStep(clamp(distance / 0.13, 0, 1));
}

function makeRallyPose(reach, badminton = false) {
    const pose = defaultPose();
    pose.hip = { x: 50, y: 168 + (1 - reach) * 2 };
    pose.bodyLean = badminton ? 5 : 18;
    pose.frontUpperArm = badminton
        ? mix(52, 76, reach)
        : mix(26, 54, reach);
    pose.frontLowerArm = badminton
        ? mix(60, 76, reach)
        : mix(34, 54, reach);
    pose.backUpperArm = badminton ? -38 : -34;
    pose.backLowerArm = badminton ? -25 : -22;
    pose.frontThigh = 30;
    pose.frontShin = 8;
    pose.backThigh = -28;
    pose.backShin = -5;
    pose.shadowScale = 0.9;
    return pose;
}

function renderBadminton(time) {
    const phase = time % 2.4 / 2.4;
    const travel = (1 - Math.cos(phase * Math.PI * 2)) / 2;
    const arc = 4 * travel * (1 - travel);
    const leftHit = Math.max(rallyHit(phase, 0), rallyHit(phase, 1));
    const rightHit = rallyHit(phase, 0.5);
    const pose = makeRallyPose(leftHit, true);
    const opponentPose = makeRallyPose(rightHit, true);
    const points = renderSkeleton(pose);
    const opponentPoints = renderSkeleton(opponentPose, opponentRigElements);
    const racketAngle = mix(0, 34, leftHit);
    const opponentRacketAngle = -mix(0, 34, rightHit);
    const shuttleX = mix(184, 236, travel);
    const shuttleY = 132 - arc * 50;

    setTransform(rigElements.racket, points.frontHand.x, points.frontHand.y, racketAngle);
    setMirroredTransform(
        rigElements.opponentRacket,
        420 - opponentPoints.frontHand.x,
        opponentPoints.frontHand.y,
        opponentRacketAngle
    );
    setTransform(rigElements.shuttle, shuttleX, shuttleY, phase * 720);
}

function renderTableTennis(time) {
    const phase = time % 2 / 2;
    const travel = (1 - Math.cos(phase * Math.PI * 2)) / 2;
    const arc = 4 * travel * (1 - travel);
    const leftHit = Math.max(rallyHit(phase, 0), rallyHit(phase, 1));
    const rightHit = rallyHit(phase, 0.5);
    const pose = makeRallyPose(leftHit);
    const opponentPose = makeRallyPose(rightHit);
    const points = renderSkeleton(pose);
    const opponentPoints = renderSkeleton(opponentPose, opponentRigElements);
    const paddleAngle = 12 + leftHit * 44;
    const opponentPaddleAngle = -paddleAngle;
    const ballX = mix(154, 266, travel);
    const ballY = 158 - arc * 28;

    setTransform(rigElements.paddle, points.frontHand.x, points.frontHand.y, paddleAngle);
    setMirroredTransform(
        rigElements.opponentPaddle,
        420 - opponentPoints.frontHand.x,
        opponentPoints.frontHand.y,
        opponentPaddleAngle
    );
    setTransform(rigElements.ball, ballX, ballY, phase * 720, 0.36);
}

function renderBasketball(time) {
    const cycle = time % 1.8 / 1.8;
    const jump = Math.sin(cycle * Math.PI);
    const release = smoothStep(clamp((cycle - 0.42) / 0.34, 0, 1));
    const throughHoop = smoothStep(clamp((cycle - 0.74) / 0.1, 0, 1));
    const pose = defaultPose();

    pose.hip = { x: 196, y: 176 - jump * 36 };
    pose.bodyLean = 5;
    pose.frontUpperArm = mix(62, 158, jump);
    pose.frontLowerArm = mix(76, 172, jump);
    pose.backUpperArm = mix(36, 137, jump);
    pose.backLowerArm = mix(52, 154, jump);
    pose.frontThigh = mix(28, 4, jump);
    pose.frontShin = mix(-8, 2, jump);
    pose.backThigh = mix(-28, -4, jump);
    pose.backShin = mix(8, -2, jump);
    pose.shadowScale = 1 - jump * 0.34;

    const points = renderSkeleton(pose);
    const handX = (points.frontHand.x + points.backHand.x) / 2;
    const handY = (points.frontHand.y + points.backHand.y) / 2 - 10;
    const hoop = { x: 359, y: 94 };
    const ballX = mix(handX, hoop.x, release);
    const ballY = mix(handY, hoop.y, release) - Math.sin(release * Math.PI) * 78 + throughHoop * 24;

    setTransform(rigElements.ball, ballX, ballY, release * 360);
}

function renderFootball(time) {
    const cycle = time % 1.65 / 1.65;
    const kickForward = smoothStep(clamp((cycle - 0.1) / 0.24, 0, 1));
    const kickReturn = smoothStep(clamp((cycle - 0.62) / 0.24, 0, 1));
    const kick = kickForward * (1 - kickReturn);
    const release = smoothStep(clamp((cycle - 0.3) / 0.44, 0, 1));
    const pose = defaultPose();

    pose.hip = { x: 184, y: 166 - kick * 4 };
    pose.bodyLean = 5;
    pose.frontUpperArm = -48 + kick * 82;
    pose.frontLowerArm = -26 + kick * 44;
    pose.backUpperArm = 45 - kick * 78;
    pose.backLowerArm = 24 - kick * 42;
    pose.frontThigh = mix(4, 52, kick);
    pose.frontShin = mix(4, 52, kick);
    pose.backThigh = -5;
    pose.backShin = 3;
    pose.shadowScale = 0.96;

    renderSkeleton(pose);

    const ballX = mix(270, 368, release);
    const ballY = 244 - Math.sin(release * Math.PI) * 52 - release * 39;
    setTransform(rigElements.ball, ballX, ballY, release * 320);
}

function renderVolleyball(time) {
    const cycle = time % 1.65 / 1.65;
    const jump = Math.sin(cycle * Math.PI);
    const release = smoothStep(clamp((cycle - 0.38) / 0.38, 0, 1));
    const pose = defaultPose();

    pose.hip = { x: 188, y: 188 - jump * 22 };
    pose.frontUpperArm = mix(72, 164, jump);
    pose.frontLowerArm = mix(88, 174, jump);
    pose.backUpperArm = mix(-58, -153, jump);
    pose.backLowerArm = mix(-76, -166, jump);
    pose.frontThigh = mix(27, 5, jump);
    pose.frontShin = mix(-9, 2, jump);
    pose.backThigh = mix(-27, -5, jump);
    pose.backShin = mix(9, -2, jump);
    pose.shadowScale = 1 - jump * 0.32;

    const points = renderSkeleton(pose);
    let ballX = (points.frontHand.x + points.backHand.x) / 2;
    let ballY = Math.max(24, Math.min(points.frontHand.y, points.backHand.y) - 19);

    if (release > 0) {
        ballX = mix(194, 292, release);
        ballY = mix(38, 94, release) - Math.sin(release * Math.PI) * 18;
    }

    setTransform(rigElements.ball, ballX, ballY, release * 140);
}

function renderSwimming(time) {
    const phase = time * Math.PI * 2 / 1.25;
    const stroke = Math.sin(phase);
    const oppositeStroke = -stroke;
    const pose = defaultPose();

    pose.hip = {
        x: 170 + Math.sin(phase * 0.5) * 6,
        y: 166 + Math.sin(phase * 2) * 2
    };
    pose.bodyLean = 88;
    const armRotation = -time * 360 / 1.25;
    pose.frontUpperArm = 90 + armRotation;
    pose.frontLowerArm = 120 + armRotation;
    pose.backUpperArm = 270 + armRotation;
    pose.backLowerArm = 300 + armRotation;
    pose.frontThigh = -90 + stroke * 13;
    pose.frontShin = -90 + stroke * 18;
    pose.backThigh = -90 + oppositeStroke * 13;
    pose.backShin = -90 + oppositeStroke * 18;
    pose.shadowScale = 0.7;

    renderSkeleton(pose);
}

function renderStrength(time) {
    const phase = (1 - Math.cos(time * Math.PI * 2 / 2.0)) / 2;
    const lift = smoothStep(phase);
    const pose = defaultPose();

    pose.hip = { x: 210, y: 171 + (1 - lift) * 7 };
    pose.frontUpperArm = mix(76, 154, lift);
    pose.frontLowerArm = mix(105, 169, lift);
    pose.backUpperArm = mix(-76, -154, lift);
    pose.backLowerArm = mix(-105, -169, lift);
    pose.frontThigh = mix(15, 4, lift);
    pose.frontShin = mix(-4, 2, lift);
    pose.backThigh = mix(-15, -4, lift);
    pose.backShin = mix(4, -2, lift);

    const points = renderSkeleton(pose);
    const barX = (points.frontHand.x + points.backHand.x) / 2;
    const barY = Math.min(points.frontHand.y, points.backHand.y);

    setTransform(rigElements.barbell, barX, barY, 0);
}

function renderMotion(time) {
    switch (movementStage.dataset.motion) {
        case "running":
            renderRunning(time);
            break;
        case "yoga":
            renderYoga(time);
            break;
        case "bodyweight":
            renderBodyweight(time);
            break;
        case "jump-rope":
            renderJumpRope(time);
            break;
        case "cycling":
            renderCycling(time);
            break;
        case "badminton":
            renderBadminton(time);
            break;
        case "table-tennis":
            renderTableTennis(time);
            break;
        case "basketball":
            renderBasketball(time);
            break;
        case "football":
            renderFootball(time);
            break;
        case "volleyball":
            renderVolleyball(time);
            break;
        case "swimming":
            renderSwimming(time);
            break;
        case "strength":
            renderStrength(time);
            break;
        default:
            renderWalking(time);
    }
}

function animationLoop(timestamp) {
    const elapsed = (timestamp - motionStartedAt) / 1000;
    renderMotion(elapsed);

    motionFrame = window.requestAnimationFrame(animationLoop);
}

function restartMotionAnimation() {
    window.cancelAnimationFrame(motionFrame);
    motionStartedAt = performance.now();

    if (reducedMotionQuery.matches) {
        renderMotion(0.24);
        return;
    }

    motionFrame = window.requestAnimationFrame(animationLoop);
}

let currentSport = sports.find((sport) => sport.id === "running");
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

            // Prefer cycling on a tie and keep walking as a fallback.
            if (a.sport.id === "cycling" && b.sport.id !== "cycling") return -1;
            if (b.sport.id === "cycling" && a.sport.id !== "cycling") return 1;
            if (a.sport.id === "walking" && b.sport.id !== "walking") return 1;
            if (b.sport.id === "walking" && a.sport.id !== "walking") return -1;

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
        : sport.motion === "yoga" && selectedVenue === "any"
            ? "indoor"
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

    restartMotionAnimation();
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
    restartMotionAnimation();
}

function scrollToActivityResult() {
    const target = currentResults.length > 0
        ? movementStage
        : noResults;

    window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
            target.scrollIntoView({
                behavior: reducedMotionQuery.matches ? "auto" : "smooth",
                block: "center",
                inline: "nearest"
            });
        });
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderRecommendations();
    scrollToActivityResult();
});

form.addEventListener("reset", () => {
    window.setTimeout(renderRecommendations, 0);
});

replayButton.addEventListener("click", replayAnimation);

reducedMotionQuery.addEventListener("change", restartMotionAnimation);

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
// Start each page load with a clear running preview; personalised matching
// begins when the visitor submits their choices.
renderSport(currentSport, null, "preview");
