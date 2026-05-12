document.addEventListener('DOMContentLoaded', () => {

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

    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');
    const changeBtn = document.getElementById('change-cookies');

    function loadExternalScripts() {
        try {
            if (!document.getElementById('google-fonts')) {
                const link = document.createElement('link');
                link.href = 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap';
                link.rel = 'stylesheet';
                link.id = 'google-fonts';
                document.head.appendChild(link);
            }

            if (!document.getElementById('google-maps')) {
                const script = document.createElement('script');
                script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAy7cFa8ZD0LV_83tuQ_BE8py5dX29wPpU&callback=initMap';
                script.async = true;
                script.id = 'google-maps';
                document.body.appendChild(script);
            }
        } catch (error) {
            console.error("Er ging iets mis met het laden van externe scripts:", error);
        }
    }

    function showCookieBannerIfNoConsent() {
        const consent = localStorage.getItem('cookiesConsent');

        if (consent === 'accepted' || consent === 'declined') {
            banner.classList.remove('show');
            if (consent === 'accepted') {
                loadExternalScripts();
            }
        } else {
            banner.classList.add('show');
        }
    }

    acceptBtn?.addEventListener('click', () => {
        localStorage.setItem('cookiesConsent', 'accepted');
        banner.classList.remove('show');
        loadExternalScripts();
    });

    declineBtn?.addEventListener('click', () => {
        localStorage.setItem('cookiesConsent', 'declined');
        banner.classList.remove('show');
    });

    changeBtn?.addEventListener('click', () => {
        localStorage.removeItem('cookiesConsent');
        banner.classList.add('show');
    });

    // Initial check
    showCookieBannerIfNoConsent();

    // Cache/page show fix for Safari etc.
    window.addEventListener('pageshow', () => {
        if (!localStorage.getItem('cookiesConsent')) {
            banner.classList.add('show');
        }
    });

});
