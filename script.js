/* =========================================================
   TLJ PHOTOGRAPHY
   PREMIUM WEBSITE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       TLJ CONTACT DETAILS
       ===================================================== */

    const TLJ = {
        email: "Tj1952870@gmail.com",

        whatsapp: [
            "917517377601",
            "918668636361"
        ],

        instagram: [
            "TLJ_Photography_7",
            "TLJ_7_"
        ],

        address:
            "Kalinka Mata Mandir Javal, Nashirabad Road, Tulsai Nagar, Sai Baba Mandir Side, Jalgaon"
    };


    /* =====================================================
       PAGE LOADER
       ===================================================== */

    const loader = document.querySelector(".page-loader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (loader) {
                loader.classList.add("loaded");
            }
        }, 800);
    });


    /* =====================================================
       MOBILE / FULLSCREEN MENU
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const fullscreenMenu = document.querySelector(".fullscreen-menu");
    const menuLinks = document.querySelectorAll(".menu-link");

    function openMenu() {

        if (!menuToggle || !fullscreenMenu) return;

        menuToggle.classList.add("active");
        fullscreenMenu.classList.add("open");
        document.body.classList.add("menu-open");
    }

    function closeMenu() {

        if (!menuToggle || !fullscreenMenu) return;

        menuToggle.classList.remove("active");
        fullscreenMenu.classList.remove("open");
        document.body.classList.remove("menu-open");
    }

    if (menuToggle) {

        menuToggle.addEventListener("click", () => {

            if (fullscreenMenu.classList.contains("open")) {
                closeMenu();
            } else {
                openMenu();
            }

        });

    }

    menuLinks.forEach(link => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });


    /* =====================================================
       ESC KEY CLOSE MENU
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetID = this.getAttribute("href");

            if (!targetID || targetID === "#") return;

            const target = document.querySelector(targetID);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       CUSTOM CURSOR
       ===================================================== */

    const cursor = document.querySelector(".cursor");
    const cursorFollower = document.querySelector(".cursor-follower");

    if (
        cursor &&
        cursorFollower &&
        window.matchMedia("(hover: hover)").matches
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let followerX = 0;
        let followerY = 0;

        document.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;

        });

        function animateCursor() {

            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;

            cursorFollower.style.left = `${followerX}px`;
            cursorFollower.style.top = `${followerY}px`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();


        const interactiveElements =
            document.querySelectorAll(
                "a, button, input, textarea, select, .library-item, .hero-photo"
            );

        interactiveElements.forEach(element => {

            element.addEventListener("mouseenter", () => {
                document.body.classList.add("cursor-active");
            });

            element.addEventListener("mouseleave", () => {
                document.body.classList.remove("cursor-active");
            });

        });

    }


    /* =====================================================
       HERO PARALLAX
       ===================================================== */

    const heroPhotos =
        document.querySelectorAll(".hero-photo");

    if (
        heroPhotos.length &&
        window.matchMedia("(hover: hover)").matches
    ) {

        document.addEventListener("mousemove", (event) => {

            const x =
                (event.clientX / window.innerWidth - 0.5);

            const y =
                (event.clientY / window.innerHeight - 0.5);

            heroPhotos.forEach((photo, index) => {

                const speed =
                    (index + 1) * 5;

                const rotate =
                    (index % 2 === 0 ? 1 : -1) * 1.5;

                photo.style.transform =
                    `translate3d(
                        ${x * speed}px,
                        ${y * speed}px,
                        0
                    )
                    rotate(${rotate}deg)`;

            });

        });

    }


    /* =====================================================
       SCROLL IMAGE MOVEMENT
       ===================================================== */

    const movingImages =
        document.querySelectorAll(
            ".wedding-photo, .unseen-photo"
        );

    if (movingImages.length) {

        window.addEventListener(
            "scroll",
            () => {

                const scrollY = window.scrollY;

                movingImages.forEach((image, index) => {

                    const speed =
                        ((index % 2 === 0) ? 0.025 : -0.018);

                    const movement =
                        scrollY * speed;

                    image.style.setProperty(
                        "--scroll-y",
                        `${movement}px`
                    );

                    image.style.translate =
                        `0 ${movement}px`;

                });

            },
            { passive: true }
        );

    }


    /* =====================================================
       REVEAL ANIMATION
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".story-card, .experience-card, .package-card, .testimonial-card"
        );

    if (revealElements.length) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.style.opacity = "1";
                            entry.target.style.transform =
                                "translateY(0)";

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(50px)";

            element.style.transition =
                "opacity 1s cubic-bezier(.16,1,.3,1), " +
                "transform 1s cubic-bezier(.16,1,.3,1)";

            revealObserver.observe(element);

        });

    }


    /* =====================================================
       FAQ ACCORDION
       ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");

        if (!question || !answer) return;

        question.addEventListener("click", () => {

            const isActive =
                item.classList.contains("active");


            /* Close all */

            faqItems.forEach(otherItem => {

                otherItem.classList.remove("active");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }

            });


            /* Open selected */

            if (!isActive) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";
            }

        });

    });


    /* =====================================================
       STORY VIDEOS
       ===================================================== */

    const storyVideos =
        document.querySelectorAll(
            ".story-media video"
        );

    if (storyVideos.length) {

        const videoObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        const video =
                            entry.target;

                        if (entry.isIntersecting) {

                            video.play()
                                .catch(() => {});

                        } else {

                            video.pause();

                        }

                    });

                },
                {
                    threshold: 0.3
                }
            );

        storyVideos.forEach(video => {

            video.muted = true;
            video.playsInline = true;

            videoObserver.observe(video);

        });

    }


    /* =====================================================
       CONTACT FORM
       ===================================================== */

    const contactForm =
        document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const formData =
                    new FormData(contactForm);


                const name =
                    getFormValue(
                        formData,
                        ["name", "full-name", "fullname"]
                    );

                const email =
                    getFormValue(
                        formData,
                        ["email", "mail"]
                    );

                const phone =
                    getFormValue(
                        formData,
                        ["phone", "number", "mobile"]
                    );

                const eventType =
                    getFormValue(
                        formData,
                        ["event", "event-type", "service"]
                    );

                const date =
                    getFormValue(
                        formData,
                        ["date", "event-date"]
                    );

                const message =
                    getFormValue(
                        formData,
                        ["message", "details", "requirement"]
                    );


                /* =========================================
                   WHATSAPP MESSAGE
                   ========================================= */

                const whatsappMessage =

`✨ TLJ PHOTOGRAPHY - NEW ENQUIRY ✨

Hello TLJ Photography,

I would like to enquire about a photography / cinematography service.

━━━━━━━━━━━━━━━━━━

👤 Name:
${name || "Not provided"}

📧 Email:
${email || "Not provided"}

📱 Phone:
${phone || "Not provided"}

📸 Event / Service:
${eventType || "Not provided"}

📅 Event Date:
${date || "Not provided"}

💬 Requirement:
${message || "Not provided"}

━━━━━━━━━━━━━━━━━━

📍 TLJ Photography
Jalgaon, Maharashtra

Thank you.`;



                /*
                   First WhatsApp number
                */

                const whatsappURL =
                    `https://wa.me/${TLJ.whatsapp[0]}?text=` +
                    encodeURIComponent(
                        whatsappMessage
                    );


                /*
                   Open WhatsApp
                */

                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );


                /* =========================================
                   EMAIL BACKUP
                   ========================================= */

                const emailSubject =
                    "New TLJ Photography Enquiry";

                const emailBody =

`Name: ${name || "Not provided"}

Email: ${email || "Not provided"}

Phone: ${phone || "Not provided"}

Event / Service: ${eventType || "Not provided"}

Event Date: ${date || "Not provided"}

Requirement:
${message || "Not provided"}

TLJ Photography
${TLJ.address}`;


                /*
                   Optional email button can use this
                */

                const mailURL =
                    `mailto:${TLJ.email}` +
                    `?subject=${encodeURIComponent(emailSubject)}` +
                    `&body=${encodeURIComponent(emailBody)}`;


                /*
                   Save email URL for later use
                */

                contactForm.dataset.emailUrl =
                    mailURL;


                /* =========================================
                   SUCCESS MESSAGE
                ========================================= */

                showNotification(
                    "Your enquiry is ready. WhatsApp is opening..."
                );

            }
        );

    }


    /* =====================================================
       HELPER - FORM VALUE
       ===================================================== */

    function getFormValue(formData, names) {

        for (const name of names) {

            const value =
                formData.get(name);

            if (
                value !== null &&
                String(value).trim() !== ""
            ) {

                return String(value).trim();

            }

        }

        return "";

    }


    /* =====================================================
       NOTIFICATION
       ===================================================== */

    function showNotification(message) {

        const old =
            document.querySelector(
                ".tlj-notification"
            );

        if (old) old.remove();


        const notification =
            document.createElement("div");

        notification.className =
            "tlj-notification";

        notification.textContent =
            message;


        notification.style.cssText = `
            position: fixed;
            z-index: 99999;
            left: 50%;
            bottom: 25px;
            transform: translateX(-50%);
            background: #eee7da;
            color: #090806;
            padding: 15px 22px;
            border-radius: 100px;
            font-family: Arial, sans-serif;
            font-size: 11px;
            letter-spacing: .04em;
            box-shadow: 0 20px 50px rgba(0,0,0,.25);
            white-space: nowrap;
        `;


        document.body.appendChild(notification);


        setTimeout(() => {

            notification.style.opacity = "0";

            notification.style.transition =
                "opacity .5s ease";

            setTimeout(() => {
                notification.remove();
            }, 500);

        }, 3500);

    }


    /* =====================================================
       WHATSAPP QUICK CONTACT
       ===================================================== */

    const whatsappButtons =
        document.querySelectorAll(
            "[data-whatsapp]"
        );

    whatsappButtons.forEach(button => {

        button.addEventListener("click", () => {

            const number =
                button.dataset.whatsapp ||
                TLJ.whatsapp[0];

            const message =
                "Hello TLJ Photography, I would like to enquire about your photography services.";


            const url =
                `https://wa.me/${number}?text=` +
                encodeURIComponent(message);


            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        });

    });


    /* =====================================================
       INSTAGRAM LINKS
       ===================================================== */

    const instagramLinks =
        document.querySelectorAll(
            "[data-instagram]"
        );

    instagramLinks.forEach((link, index) => {

        const username =
            link.dataset.instagram ||
            TLJ.instagram[index] ||
            TLJ.instagram[0];

        link.href =
            `https://instagram.com/${username}`;

        link.target = "_blank";

        link.rel =
            "noopener noreferrer";

    });


    /* =====================================================
       EMAIL LINKS
       ===================================================== */

    const emailLinks =
        document.querySelectorAll(
            "[data-email]"
        );

    emailLinks.forEach(link => {

        link.href =
            `mailto:${TLJ.email}`;

    });


    /* =====================================================
       PHONE LINKS
       ===================================================== */

    const phoneLinks =
        document.querySelectorAll(
            "[data-phone]"
        );

    phoneLinks.forEach((link, index) => {

        const number =
            TLJ.whatsapp[index] ||
            TLJ.whatsapp[0];

        link.href =
            `tel:+${number}`;

    });


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-year]"
        );

    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       CONSOLE
       ===================================================== */

    console.log(
        "%cTLJ PHOTOGRAPHY",
        "font-size:24px;font-family:serif;"
    );

    console.log(
        "Premium Cinematic Photography Website"
    );

});

const videos = document.querySelectorAll(".story-media video");

const videoObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            const video = entry.target;

            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }

        });

    },
    {
        threshold: 0.35
    }
);

videos.forEach(video => {
    video.muted = true;
    video.playsInline = true;
    videoObserver.observe(video);
});


/* =========================================
   TLJ PACKAGES MODAL
========================================= */

const packagesModal =
    document.getElementById("packagesModal");

const packagesOpen =
    document.getElementById("packagesOpen");

const packagesClose =
    document.getElementById("packagesClose");


/* Open */

if (packagesOpen) {

    packagesOpen.addEventListener("click", () => {

        packagesModal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

}


/* Close */

if (packagesClose) {

    packagesClose.addEventListener("click", () => {

        packagesModal.classList.remove("active");

        document.body.style.overflow = "";

    });

}


/* ESC key */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        packagesModal.classList.remove("active");

        document.body.style.overflow = "";

    }

});

packagesOpen.addEventListener("click", () => {
    packagesModal.classList.add("active");
    document.body.style.overflow = "hidden";
});
