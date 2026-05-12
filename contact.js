document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
});

document.getElementById('submit-link').addEventListener('click', function (event) {
    event.preventDefault(); // Optioneel: Voorkomt standaardgedrag
    // Voeg aangepaste functionaliteit toe
    console.log('Link met type submit geklikt');
});