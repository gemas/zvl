document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM volledig geladen');

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











