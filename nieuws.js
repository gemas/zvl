document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        const card = event.target.closest('.news-card');
        const extraContent = card.querySelector('.extra-content');
        card.classList.toggle('expanded');
        const isExpanded = card.classList.contains('expanded');
        extraContent.style.display = isExpanded ? 'block' : 'none';
        button.textContent = isExpanded ? 'Lees minder' : 'Lees meer';
    });
});

function toggleReadMore(button) {
    const fullText = button.previousElementSibling; // De verborgen tekst
    const summary = button.previousElementSibling.previousElementSibling; // De samenvatting

    if (fullText.style.display === "none" || !fullText.classList.contains('visible')) {
        fullText.style.display = "block"; // Maak de volledige tekst zichtbaar
        fullText.classList.add('visible'); // Voeg de 'visible' class toe om de tekst zichtbaar te maken
        button.textContent = "Lees minder";  // Verander de knoptekst naar 'Lees minder'
    } else {
        fullText.style.display = "none"; // Verberg de volledige tekst
        fullText.classList.remove('visible'); // Verwijder de 'visible' class om de tekst te verbergen
        button.textContent = "Lees meer";  // Verander de knoptekst naar 'Lees meer'
    }
}

