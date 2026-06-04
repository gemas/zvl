document.addEventListener("DOMContentLoaded", function() {
    // Load header and initialize hamburger menu
    fetch("header.html")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            const headerPlaceholder = document.getElementById("header-placeholder");
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = data;
                initializeHamburgerMenu();
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation for header:', error);
        });

    // Load footer
    fetch("footer.html")
        .then(response => {
             if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            const footerPlaceholder = document.getElementById("footer-placeholder");
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation for footer:', error);
        });
});

function initializeHamburgerMenu() {
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
}
