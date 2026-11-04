const svgNamespace = "http://www.w3.org/2000/svg";
const dynamicStudentLayer = document.querySelector("#dynamic-students-v2");
const walkerTemplate = document.querySelector("#student-template");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const visitorRoutes = [
    {
        path: "M172 725 C276 650 440 590 566 567 C632 550 674 516 704 482",
        color: "#8a625d",
        duration: 13
    },
    {
        path: "M249 456 C354 496 470 548 566 567 C632 550 674 516 704 482",
        color: "#4f7185",
        duration: 11
    },
    {
        path: "M1149 478 C1050 510 858 533 704 482",
        color: "#687d59",
        duration: 12
    },
    {
        path: "M707 423 C707 446 706 466 704 482 C778 537 886 613 1012 679",
        color: "#87694f",
        duration: 13
    },
    {
        path: "M704 482 C790 540 886 614 1012 679",
        color: "#705f82",
        duration: 12
    },
    {
        path: "M1265 683 C1248 607 1200 527 1149 478",
        color: "#52747a",
        duration: 10
    },
    {
        path: "M431 586 C363 556 304 508 249 456",
        color: "#a06d63",
        duration: 10
    },
    {
        path: "M172 725 C284 650 440 590 566 567 C674 548 830 541 1012 679",
        color: "#567a68",
        duration: 15
    }
];

const activeVisitors = [];
const maximumVisitors = 8;
const visitorLifetime = 180000;
let nextRoute = 0;

function removeVisitor(visitor) {
    if (!visitor?.isConnected) {
        return;
    }

    visitor.classList.add("is-leaving");

    window.setTimeout(() => {
        visitor.remove();
        const index = activeVisitors.indexOf(visitor);
        if (index >= 0) {
            activeVisitors.splice(index, 1);
        }
    }, 950);
}

function addCampusVisitor() {
    if (
        !dynamicStudentLayer ||
        !walkerTemplate ||
        reducedMotion.matches ||
        document.hidden
    ) {
        return;
    }

    if (activeVisitors.length >= maximumVisitors) {
        removeVisitor(activeVisitors[0]);
    }

    const route = visitorRoutes[nextRoute % visitorRoutes.length];
    const visitor = walkerTemplate.cloneNode(true);
    const motion = document.createElementNS(svgNamespace, "animateMotion");

    visitor.classList.remove(
        "walker-one",
        "walker-two",
        "walker-three",
        "walker-four"
    );
    visitor.classList.add("campus-walker--visitor");
    visitor.removeAttribute("transform");
    visitor.setAttribute("aria-hidden", "true");
    visitor.style.stroke = route.color;

    motion.setAttribute("path", route.path);
    motion.setAttribute("dur", `${route.duration}s`);
    motion.setAttribute("begin", "indefinite");
    motion.setAttribute("fill", "freeze");
    motion.setAttribute("calcMode", "spline");
    motion.setAttribute("keyTimes", "0;1");
    motion.setAttribute("keySplines", ".25 .1 .2 1");

    visitor.prepend(motion);
    dynamicStudentLayer.append(visitor);
    activeVisitors.push(visitor);
    nextRoute += 1;

    window.requestAnimationFrame(() => {
        visitor.classList.add("is-visible");
        motion.beginElement();
    });

    window.setTimeout(() => {
        if (visitor.isConnected) {
            visitor.classList.add("is-settled");
        }
    }, route.duration * 1000 + 150);

    window.setTimeout(() => removeVisitor(visitor), visitorLifetime);
}

if (dynamicStudentLayer && walkerTemplate && !reducedMotion.matches) {
    window.setInterval(addCampusVisitor, 30000);
}
