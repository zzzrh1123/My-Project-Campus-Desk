const contactForm = document.querySelector("#contact-form");

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
