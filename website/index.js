document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM volledig geladen');

    // Hamburgermenu-functionaliteit
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            document.body.style.overflow = isExpanded ? '' : 'hidden'; // Scrollen in/uit
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                document.body.style.overflow = ''; // Scrollen herstellen
            });
        });
    }

    // Carousel-functionaliteit
    const carousel = document.querySelector('.community-carousel');
    if (carousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.classList.add('active');
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.classList.remove('active');
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.classList.remove('active');
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-snelheid
            carousel.scrollLeft = scrollLeft - walk;
        });
    }

    // Modal-functionaliteit
    const modal = document.getElementById("loginModal");
    const loginButton = document.querySelector(".login-button");
    const closeButton = document.querySelector(".close");
    const registerLink = document.getElementById("registerLink");
    const loginLink = document.getElementById("loginLink");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (modal) {
        loginButton?.addEventListener("click", () => {
            modal.style.display = "flex";
        });

        closeButton?.addEventListener("click", () => {
            modal.style.display = "none";
        });

        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });

        registerLink?.addEventListener("click", (e) => {
            e.preventDefault();
            loginForm.style.display = "none";
            registerForm.style.display = "block";
        });

        loginLink?.addEventListener("click", (e) => {
            e.preventDefault();
            registerForm.style.display = "none";
            loginForm.style.display = "block";
        });
    }

    // Cookie-banner functionaliteit
    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");
    const declineBtn = document.getElementById("decline-cookies");
    const changeCookiesBtn = document.getElementById("change-cookies");

    const loadExternalScripts = () => {
        if (!document.getElementById("google-fonts")) {
            const link = document.createElement("link");
            link.href = "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap";
            link.rel = "stylesheet";
            link.id = "google-fonts";
            document.head.appendChild(link);
        }
    };

    const showCookieBannerIfNoConsent = () => {
        const consent = localStorage.getItem("cookiesConsent");
        if (consent === "accepted" || consent === "declined") {
            banner.style.display = "none";
            if (consent === "accepted") loadExternalScripts();
        } else {
            banner.style.display = "flex";
        }
    };

    acceptBtn?.addEventListener("click", () => {
        localStorage.setItem("cookiesConsent", "accepted");
        banner.style.display = "none";
        loadExternalScripts();
    });

    declineBtn?.addEventListener("click", () => {
        localStorage.setItem("cookiesConsent", "declined");
        banner.style.display = "none";
    });

    changeCookiesBtn?.addEventListener("click", () => {
        localStorage.removeItem("cookiesConsent");
        banner.style.display = "flex";
    });

    // Init op DOM ready
    showCookieBannerIfNoConsent();

    // Extra: check ook op pageshow event (bij terug navigeren uit cache)
    window.addEventListener("pageshow", () => {
        showCookieBannerIfNoConsent();
    });
});











