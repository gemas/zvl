document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-bar");
    const categoryFilter = document.getElementById("category-filter");
    const productCards = document.querySelectorAll(".product-card");

    function filterProducts() {
        const searchQuery = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        productCards.forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            const category = card.dataset.category;

            const matchesSearch = title.includes(searchQuery);
            const matchesCategory = selectedCategory === "all" || category === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    searchInput.addEventListener("input", filterProducts);
    categoryFilter.addEventListener("change", filterProducts);
});


