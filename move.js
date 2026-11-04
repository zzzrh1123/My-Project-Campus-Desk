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
    racket: document.querySelector("#rig-racket"),
    paddle: document.querySelector("#rig-paddle"),
    ball: document.querySelector("#rig-ball"),
    barbell: document.querySelector("#rig-barbell"),
    shuttle: document.querySelector("#rig-shuttle")
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

function renderSkeleton(pose) {
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

    setLine(rigElements.torso, hip, shoulder);
    setLine(rigElements.frontUpperArm, shoulder, frontElbow);
    setLine(rigElements.frontLowerArm, frontElbow, frontHand);
    setLine(rigElements.backUpperArm, shoulder, backElbow);
    setLine(rigElements.backLowerArm, backElbow, backHand);
    setLine(rigElements.frontThigh, hip, frontKnee);
    setLine(rigElements.frontShin, frontKnee, frontFoot);
    setLine(rigElements.backThigh, hip, backKnee);
    setLine(rigElements.backShin, backKnee, backFoot);

    setCircle(rigElements.head, head);
    setCircle(rigElements.shoulderJoint, shoulder);
    setCircle(rigElements.hipJoint, hip);
    setCircle(rigElements.frontElbowJoint, frontElbow);
    setCircle(rigElements.backElbowJoint, backElbow);
    setCircle(rigElements.frontKneeJoint, frontKnee);
    setCircle(rigElements.backKneeJoint, backKnee);

    rigElements.face.setAttribute(
        "d",
        `M ${head.x + 10} ${head.y - 3} ` +
        `L ${head.x + 16} ${head.y} ` +
        `L ${head.x + 10} ${head.y + 3}`
    );

    rigElements.shadow.setAttribute("cx", hip.x.toFixed(2));
    rigElements.shadow.setAttribute("rx", (68 * pose.shadowScale).toFixed(2));
    rigElements.shadow.style.opacity = String(
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
    const pose = defaultPose();

    pose.bodyLean = 9;
    pose.hip.y = 166 - Math.abs(Math.cos(phase)) * 8;
    pose.frontUpperArm = -48 * stride;
    pose.backUpperArm = 48 * stride;
    pose.frontLowerArm = -20 * stride;
    pose.backLowerArm = 20 * stride;
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

    pose.hip = { x: 198, y: 184 - breath * 3 };
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
    const frontHand = { x: 304, y: 238 };
    const backHand = { x: 278, y: 238 };
    const frontFoot = { x: 72, y: 238 };
    const backFoot = { x: 91, y: 238 };

    setLimbByTarget(
        "frontArm",
        points.shoulder,
        frontHand,
        rigLengths.upperArm,
        rigLengths.lowerArm,
        1
    );
    setLimbByTarget(
        "backArm",
        points.shoulder,
        backHand,
        rigLengths.upperArm,
        rigLengths.lowerArm,
        -1
    );
    setLimbByTarget(
        "frontLeg",
        points.hip,
        frontFoot,
        rigLengths.thigh,
        rigLengths.shin,
        -1
    );
    setLimbByTarget(
        "backLeg",
        points.hip,
        backFoot,
        rigLengths.thigh,
        rigLengths.shin,
        1
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
    const ropeDepth = Math.cos(phase);
    const ropeBottom = 224 + ropeDepth * 50;

    rigElements.rope.setAttribute(
        "d",
        `M ${points.backHand.x} ${points.backHand.y} ` +
        `Q 210 ${ropeBottom} ${points.frontHand.x} ${points.frontHand.y}`
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
        1
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
        -1
    );
}

function renderBadminton(time) {
    const phase = time % 1.5 / 1.5;
    const swing = Math.sin(phase * Math.PI * 2);
    const strike = smoothStep(clamp((phase - 0.32) / 0.25, 0, 1));
    const pose = defaultPose();

    pose.hip = { x: 188, y: 165 - Math.max(0, swing) * 5 };
    pose.bodyLean = 7;
    pose.frontUpperArm = mix(-72, 98, strike);
    pose.frontLowerArm = mix(-104, 120, strike);
    pose.backUpperArm = mix(48, -32, strike);
    pose.backLowerArm = mix(30, -18, strike);
    pose.frontThigh = 48;
    pose.frontShin = 20;
    pose.backThigh = -39;
    pose.backShin = -15;

    const points = renderSkeleton(pose);
    const racketAngle = mix(-68, 34, strike);
    const shuttleX = phase < 0.55
        ? 315
        : 315 + (phase - 0.55) * 135;
    const shuttleY = phase < 0.55
        ? 77
        : 77 - Math.sin((phase - 0.55) * Math.PI / 0.45) * 42;

    setTransform(
        rigElements.racket,
        points.frontHand.x,
        points.frontHand.y,
        racketAngle
    );
    setTransform(rigElements.shuttle, shuttleX, shuttleY, 25);
}

function renderTableTennis(time) {
    const phase = time * Math.PI * 2 / 1.0;
    const swing = Math.sin(phase);
    const pose = defaultPose();

    pose.hip = { x: 194, y: 174 };
    pose.bodyLean = 18;
    pose.frontUpperArm = 70 + swing * 18;
    pose.frontLowerArm = 82 + swing * 32;
    pose.backUpperArm = -36 - swing * 8;
    pose.backLowerArm = -18 - swing * 8;
    pose.frontThigh = 24;
    pose.frontShin = 5;
    pose.backThigh = -20;
    pose.backShin = -3;

    const points = renderSkeleton(pose);
    const ballX = 315 + Math.cos(phase) * 55;
    const ballY = 135 - Math.abs(Math.sin(phase)) * 18;

    setTransform(
        rigElements.paddle,
        points.frontHand.x,
        points.frontHand.y,
        -20 + swing * 28
    );
    setTransform(rigElements.ball, ballX, ballY, phase * 40, 0.28);
}

function renderBasketball(time) {
    const cycle = time % 1.8 / 1.8;
    const jump = Math.sin(cycle * Math.PI);
    const release = smoothStep(clamp((cycle - 0.42) / 0.34, 0, 1));
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
    let ballX = (points.frontHand.x + points.backHand.x) / 2;
    let ballY = (points.frontHand.y + points.backHand.y) / 2 - 10;

    if (release > 0) {
        ballX += release * 105;
        ballY -= Math.sin(release * Math.PI) * 72 + release * 24;
    }

    setTransform(rigElements.ball, ballX, ballY, release * 180);
}

function renderFootball(time) {
    const cycle = time % 1.65 / 1.65;
    const kick = Math.sin(clamp((cycle - 0.12) / 0.7, 0, 1) * Math.PI);
    const release = smoothStep(clamp((cycle - 0.46) / 0.42, 0, 1));
    const pose = defaultPose();

    pose.hip = { x: 184, y: 166 - kick * 4 };
    pose.bodyLean = 5;
    pose.frontUpperArm = -48 + kick * 82;
    pose.frontLowerArm = -26 + kick * 44;
    pose.backUpperArm = 45 - kick * 78;
    pose.backLowerArm = 24 - kick * 42;
    pose.frontThigh = mix(-34, 75, kick);
    pose.frontShin = mix(-62, 84, kick);
    pose.backThigh = -5;
    pose.backShin = 3;
    pose.shadowScale = 0.96;

    renderSkeleton(pose);

    const ballX = 275 + release * 120;
    const ballY = 244 - Math.sin(release * Math.PI) * 28;
    setTransform(rigElements.ball, ballX, ballY, release * 320);
}

function renderVolleyball(time) {
    const cycle = time % 1.65 / 1.65;
    const jump = Math.sin(cycle * Math.PI);
    const release = smoothStep(clamp((cycle - 0.38) / 0.38, 0, 1));
    const pose = defaultPose();

    pose.hip = { x: 199, y: 177 - jump * 34 };
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
    let ballY = Math.min(points.frontHand.y, points.backHand.y) - 19;

    if (release > 0) {
        ballY -= release * 92;
        ballX += release * 18;
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
    pose.frontUpperArm = 90 + stroke * 82;
    pose.frontLowerArm = 90 + stroke * 62;
    pose.backUpperArm = 90 + oppositeStroke * 82;
    pose.backLowerArm = 90 + oppositeStroke * 62;
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

form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderRecommendations();
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
renderRecommendations();
