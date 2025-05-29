document.addEventListener('DOMContentLoaded', function () {
    let allProducts = [];

    // Fetch product data from JSON file
    fetch('./js/products.json')
        .then(response => response.json())
        .then(products => {
            allProducts = products;
            renderProducts(allProducts);
            setupFilters();
        
        })
        .catch(error => console.error('Error:', error));

    // Setup filters (checkboxes and price range)
    function setupFilters() {
        const priceRange = document.getElementById('priceRange');
        const minPrice = document.getElementById('minPrice');
        const checkboxes = document.querySelectorAll('.checkbox-group input');

        priceRange.addEventListener('input', function () {
            minPrice.textContent = `$${this.value}`;
            filterProducts();
        });

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', filterProducts);
        });
    }

    // Render products function
    function renderProducts(productsToRender) {
        const productsGrid = document.getElementById('productsGrid');
        productsGrid.innerHTML = '';

        productsToRender.forEach(product => {
            const productCard = createProductCard(product);
            productsGrid.appendChild(productCard);
        });
    }

    // Create product card function
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                <button class="quick-view">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    <span class="current-price">$${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    ${generateRatingStars(product.rating)}
                    <span class="review-count">(${product.reviews})</span>
                </div>
                <button class="add-to-cart">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
        `;

        card.querySelector('.add-to-cart').addEventListener('click', () => addToCart(product));
        card.querySelector('.quick-view').addEventListener('click', () => showQuickView(product));

        return card;
    }

    // Generate stars
    function generateRatingStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star star"></i>';
            } else if (i - rating < 1) {
                stars += '<i class="fas fa-star-half-alt star"></i>';
            } else {
                stars += '<i class="far fa-star star"></i>';
            }
        }
        return stars;
    }

    // Filter products
    function filterProducts() {
        const selectedPrice = parseInt(document.getElementById('priceRange').value);
        const selectedTypes = Array.from(document.querySelectorAll('.checkbox-group input:checked'))
            .map(checkbox => checkbox.value.toLowerCase());

        const filtered = allProducts.filter(product => {
            const priceMatch = product.price >= selectedPrice;
            const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(product.category.toLowerCase().replace(' ', '-'));
            return priceMatch && typeMatch;
        });

        renderProducts(filtered);
    }

    function addToCart(product) {
        console.log(`Added ${product.title} to cart`);
        const cartCount = document.querySelector('.cart-count');
        cartCount.textContent = parseInt(cartCount.textContent) + 1;
    }

    function showQuickView(product) {
        console.log(`Quick view for ${product.title}`);
    }
});
