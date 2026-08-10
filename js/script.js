/* =========================================================
   MODERN BUSINESS WEBSITE
   PREMIUM JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. PAGE LOADER
    ===================================================== */

    const loader = document.querySelector(".page-loader");

    window.addEventListener("load", () => {

        setTimeout(() => {
            loader?.classList.add("loaded");
        }, 700);

    });



    /* =====================================================
       02. NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    const handleNavbar = () => {

        if (window.scrollY > 40) {
            navbar?.classList.add("scrolled");
        } else {
            navbar?.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", handleNavbar);

    handleNavbar();



    /* =====================================================
       03. MOBILE MENU
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-menu-inner a");

    const toggleMobileMenu = () => {

        menuToggle?.classList.toggle("active");
        mobileMenu?.classList.toggle("active");
        document.body.classList.toggle("menu-open");

    };


    menuToggle?.addEventListener("click", toggleMobileMenu);


    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            menuToggle?.classList.remove("active");
            mobileMenu?.classList.remove("active");
            document.body.classList.remove("menu-open");

        });

    });



    /* =====================================================
       04. ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const updateActiveNav = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    };


    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();



    /* =====================================================
       05. SMOOTH ANCHOR SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }


            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }


            event.preventDefault();


            const navbarHeight =
                navbar?.offsetHeight || 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });



    /* =====================================================
       06. CUSTOM CURSOR
    ===================================================== */

    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");


    if (
        cursorDot &&
        cursorOutline &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let outlineX = 0;
        let outlineY = 0;


        document.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;

        });


        const animateCursor = () => {

            outlineX += (mouseX - outlineX) * 0.14;
            outlineY += (mouseY - outlineY) * 0.14;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateCursor);

        };


        animateCursor();


        const hoverElements = document.querySelectorAll(
            "a, button, .service-card, .project-card, .hero-card"
        );


        hoverElements.forEach(element => {

            element.addEventListener("mouseenter", () => {
                cursorOutline.classList.add("hover");
            });


            element.addEventListener("mouseleave", () => {
                cursorOutline.classList.remove("hover");
            });

        });

    }



    /* =====================================================
       07. COUNTER ANIMATION
    ===================================================== */

    const counters = document.querySelectorAll("[data-count]");

    let countersStarted = false;


    const animateCounters = () => {

        if (countersStarted) {
            return;
        }


        const statsSection =
            document.querySelector(".stats-grid");


        if (!statsSection) {
            return;
        }


        const sectionTop =
            statsSection.getBoundingClientRect().top;


        const windowHeight =
            window.innerHeight;


        if (sectionTop < windowHeight * 0.85) {

            countersStarted = true;


            counters.forEach(counter => {

                const target =
                    Number(counter.dataset.count);

                const duration = 1600;

                const startTime = performance.now();


                const updateCounter = (currentTime) => {

                    const elapsed =
                        currentTime - startTime;


                    const progress =
                        Math.min(elapsed / duration, 1);


                    const eased =
                        1 - Math.pow(1 - progress, 4);


                    const current =
                        Math.floor(target * eased);


                    counter.textContent = current;


                    if (progress < 1) {

                        requestAnimationFrame(updateCounter);

                    } else {

                        counter.textContent = target;

                    }

                };


                requestAnimationFrame(updateCounter);

            });

        }

    };


    window.addEventListener("scroll", animateCounters);

    animateCounters();



    /* =====================================================
       08. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-label, " +
        ".about-heading, " +
        ".about-content, " +
        ".service-card, " +
        ".project-card, " +
        ".why-item, " +
        ".testimonial-wrapper, " +
        ".cta-content, " +
        ".stat-item"
    );


    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(35px)";

        element.style.transition =
            "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), " +
            "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";

    });


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const element =
                        entry.target;


                    element.style.opacity = "1";

                    element.style.transform =
                        "translateY(0)";


                    observer.unobserve(element);

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });



    /* =====================================================
       09. STAGGER SERVICES
    ===================================================== */

    const serviceCards =
        document.querySelectorAll(".service-card");


    serviceCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 0.08}s`;

    });



    /* =====================================================
       10. STAGGER PROJECTS
    ===================================================== */

    const projectCards =
        document.querySelectorAll(".project-card");


    projectCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 0.12}s`;

    });



    /* =====================================================
       11. HERO PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");


    if (heroVisual) {

        window.addEventListener("mousemove", (event) => {

            if (window.innerWidth < 801) {
                return;
            }


            const x =
                (event.clientX / window.innerWidth - 0.5) * 2;


            const y =
                (event.clientY / window.innerHeight - 0.5) * 2;


            heroVisual.style.transform =
                `translate3d(${x * 8}px, ${y * 8}px, 0)`;

        });

    }



    /* =====================================================
       12. HERO CARD TILT
    ===================================================== */

    const heroCard =
        document.querySelector(".hero-card");


    if (heroCard) {

        heroCard.addEventListener("mousemove", (event) => {

            if (window.innerWidth < 801) {
                return;
            }


            const rect =
                heroCard.getBoundingClientRect();


            const x =
                event.clientX - rect.left;


            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) / centerY) * -3;


            const rotateY =
                ((x - centerX) / centerX) * 3;


            heroCard.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 scale3d(1.01,1.01,1.01)`;

        });


        heroCard.addEventListener("mouseleave", () => {

            heroCard.style.transform =
                "rotate(2deg)";

        });

    }



    /* =====================================================
       13. MAGNETIC BUTTONS
    ===================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".btn, .nav-cta"
        );


    magneticButtons.forEach(button => {

        button.addEventListener("mousemove", (event) => {

            if (window.innerWidth < 801) {
                return;
            }


            const rect =
                button.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left -
                rect.width / 2;


            const y =
                event.clientY -
                rect.top -
                rect.height / 2;


            button.style.transform =
                `translate(${x * 0.12}px, ${y * 0.12}px)`;

        });


        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });



    /* =====================================================
       14. PROJECT IMAGE MOUSE MOVE
    ===================================================== */

    const projectImages =
        document.querySelectorAll(".project-image");


    projectImages.forEach(image => {

        image.addEventListener("mousemove", (event) => {

            if (window.innerWidth < 801) {
                return;
            }


            const rect =
                image.getBoundingClientRect();


            const x =
                ((event.clientX - rect.left) /
                rect.width - 0.5) * 10;


            const y =
                ((event.clientY - rect.top) /
                rect.height - 0.5) * 10;


            const placeholder =
                image.querySelector(
                    ".image-placeholder"
                );


            if (placeholder) {

                placeholder.style.transform =
                    `scale(1.04)
                     translate(${x}px, ${y}px)`;

            }

        });


        image.addEventListener("mouseleave", () => {

            const placeholder =
                image.querySelector(
                    ".image-placeholder"
                );


            if (placeholder) {

                placeholder.style.transform =
                    "";

            }

        });

    });



    /* =====================================================
       15. BACK TO TOP
    ===================================================== */

    const backToTop =
        document.querySelector(".back-to-top");


    const handleBackToTop = () => {

        if (window.scrollY > 600) {

            backToTop?.classList.add("visible");

        } else {

            backToTop?.classList.remove("visible");

        }

    };


    window.addEventListener(
        "scroll",
        handleBackToTop
    );


    handleBackToTop();


    backToTop?.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });



    /* =====================================================
       16. IMAGE PLACEHOLDER HOVER
    ===================================================== */

    document
        .querySelectorAll(".image-placeholder")
        .forEach(placeholder => {

            placeholder.addEventListener(
                "mouseenter",
                () => {

                    placeholder.style.color =
                        "#888";

                }
            );


            placeholder.addEventListener(
                "mouseleave",
                () => {

                    placeholder.style.color =
                        "";

                }
            );

        });



    /* =====================================================
       17. SERVICE CARD GLOW
    ===================================================== */

    document
        .querySelectorAll(".service-card")
        .forEach(card => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    if (window.innerWidth < 801) {
                        return;
                    }


                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    card.style.setProperty(
                        "--mouse-x",
                        `${x}px`
                    );


                    card.style.setProperty(
                        "--mouse-y",
                        `${y}px`
                    );

                }
            );

        });



    /* =====================================================
       18. KEYBOARD ACCESSIBILITY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            menuToggle?.classList.remove("active");

            mobileMenu?.classList.remove("active");

            document.body.classList.remove(
                "menu-open"
            );

        }

    });



    /* =====================================================
       19. RESIZE HANDLER
    ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 800) {

            menuToggle?.classList.remove("active");

            mobileMenu?.classList.remove("active");

            document.body.classList.remove(
                "menu-open"
            );

        }

    });



    /* =====================================================
       20. CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%c MODERN BUSINESS ",
        "background:#fff;color:#000;padding:6px 10px;font-weight:bold;"
    );

    console.log(
        "%c Developed by Anas Murtaza ",
        "color:#aaa;font-size:12px;"
    );

});
