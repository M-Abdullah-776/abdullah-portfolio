document.addEventListener('DOMContentLoaded', () => {

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* ==========================================================================
       1. PRELOADER SIMULATION
       ========================================================================== */
    const preloader = document.getElementById('preloader');
    const progress = document.getElementById('preloader-progress');
    let width = 0;

    if (preloader && progress) {
        document.body.style.overflow = 'hidden';

        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);

                setTimeout(() => {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';

                    document.body.style.overflow = '';

                    triggerEntryAnimations();

                }, 400);

            } else {

                width += Math.floor(Math.random() * 15) + 5;

                if (width > 100) width = 100;

                progress.style.width = width + '%';
            }

        }, 100);
    } else {
        triggerEntryAnimations();
    }

    /* ==========================================================================
       2. ENTRY ANIMATIONS
       ========================================================================== */
    function triggerEntryAnimations() {

        const heroLeft = document.querySelector('.hero-left');
        const heroRight = document.querySelector('.hero-right');

        if (heroLeft) heroLeft.classList.add('reveal');
        if (heroRight) heroRight.classList.add('reveal');
    }

    /* ==========================================================================
       3. CUSTOM LUXURY CURSOR
       ========================================================================== */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice && cursorDot && cursorOutline) {

        document.addEventListener('mousemove', (e) => {

            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;

        });

        const animateOutline = () => {

            const easeFactor = 0.15;

            outlineX += (mouseX - outlineX) * easeFactor;
            outlineY += (mouseY - outlineY) * easeFactor;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateOutline);
        };

        requestAnimationFrame(animateOutline);

        const hoverTargets = document.querySelectorAll(
            'a, button, .btn, .skill-card, .project-card, .cert-card, .about-stat-item, .timeline-content, .social-link-card, .form-input, #menu-toggle'
        );

        hoverTargets.forEach(target => {

            target.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });

            target.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });

        });

    } else {

        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
    }

    /* ==========================================================================
       4. SCROLL STYLING & NAVIGATION HIGHLIGHTS
       ========================================================================== */
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let currentSectionId = '';

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSectionId = section.getAttribute('id');
            }

        });

        navLinks.forEach(link => {

            link.classList.remove('active');

            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }

        });

    });

    /* ==========================================================================
       5. MOBILE NAVIGATION DRAWER TOGGLE
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenuLinks = document.querySelectorAll('.nav-menu a');

    if (menuToggle) {

        menuToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-active');
        });

    }

    navMenuLinks.forEach(link => {

        link.addEventListener('click', () => {
            document.body.classList.remove('nav-active');
        });

    });

    /* ==========================================================================
       6. INTERSECTION OBSERVER FOR SKILLS
       ========================================================================== */
    const skillProgressBars = document.querySelectorAll('.skill-progress');

    const skillsObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.transform = 'scaleX(1)';

                skillsObserver.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.15
    });

    skillProgressBars.forEach(bar => {
        skillsObserver.observe(bar);
    });

    /* ==========================================================================
       7. INTERSECTION OBSERVER FOR SECTIONS (SCROLL REVEAL)
       ========================================================================== */
    const revealElements = document.querySelectorAll(
        '.about-stat-item, .cert-card, .timeline-item, .project-card, .about-image-card'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    /* ==========================================================================
       8. WEB3FORMS CONTACT FORM
       — No SDK needed, no OAuth, messages go straight to your Gmail inbox.
       — Replace YOUR_ACCESS_KEY_HERE with your key from web3forms.com/access
       ========================================================================== */

    const contactForm = document.getElementById("contact-form");
    const feedback = document.getElementById("form-feedback");
    const btnText = document.getElementById("btn-text");

    if (contactForm) {
        let isSubmitting = false;

        contactForm.addEventListener("submit", async function (e) {

            e.preventDefault();

            if (isSubmitting) return;
            isSubmitting = true;

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            btnText.textContent = "Sending...";
            submitBtn.disabled = true;

            const formData = {
                access_key: "26262f26-09db-4ef0-a1a3-d7084aad19a0",
                name: document.getElementById("name").value.trim(),
                email: document.getElementById("email").value.trim(),
                message: document.getElementById("message").value.trim(),
                subject: "New Portfolio Message from " + document.getElementById("name").value.trim(),
            };

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (result.success) {
                    feedback.className = "form-feedback success";
                    feedback.textContent = "Message sent successfully!";
                    btnText.textContent = "Message Sent";
                    contactForm.reset();

                    setTimeout(() => {
                        btnText.textContent = "Send Message";
                        feedback.textContent = "";
                        feedback.className = "form-feedback";
                    }, 4000);

                } else {
                    throw new Error(result.message || "Submission failed");
                }

            } catch (error) {
                feedback.className = "form-feedback error";
                feedback.textContent = "Failed to send. Please email me directly.";
                btnText.textContent = "Send Message";
                console.error("Web3Forms error:", error);
            }

            isSubmitting = false;
            submitBtn.disabled = false;

        });
    }

});