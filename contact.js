const contactForm = document.querySelector("#contact-form");
const contactLayout = document.querySelector("#contact-layout");
const envelopeToggle = document.querySelector("#envelope-toggle");
const contactFormCard = document.querySelector("#contact-form-card");
const envelopeActionText = document.querySelector(".envelope-action-text");

function setEnvelopeOpen(isOpen) {
    envelopeToggle.setAttribute("aria-expanded", String(isOpen));
    contactLayout.classList.toggle("is-open", isOpen);
    envelopeActionText.textContent = isOpen
        ? "Close the envelope"
        : "Click to open the envelope";

    if (isOpen) {
        contactFormCard.hidden = false;
        requestAnimationFrame(function () {
            contactFormCard.classList.add("is-revealed");
        });
        return;
    }

    contactFormCard.classList.remove("is-revealed");
    contactFormCard.hidden = true;
}

envelopeToggle.addEventListener("click", function () {
    const willOpen = envelopeToggle.getAttribute("aria-expanded") !== "true";
    setEnvelopeOpen(willOpen);
});

if (window.location.hash === "#write") {
    setEnvelopeOpen(true);
}

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#contact-name").value.trim();
    const email = document.querySelector("#contact-email").value.trim();
    const subject = document.querySelector("#contact-subject").value.trim();
    const message = document.querySelector("#contact-message").value.trim();

    const emailSubject = encodeURIComponent(subject);
    const emailBody = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href =
        `mailto:X20250020@stu.hibiuh.edu.cn?subject=${emailSubject}&body=${emailBody}`;
});
