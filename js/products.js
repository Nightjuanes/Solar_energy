document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        {
            id: 1,
            title: 'Premium Solar Panel X1',
            price: 599,
            originalPrice: 799,
            image: 'images/products/panel.jpg',
            rating: 4.5,
            reviews: 126,
            description: '25% Efficiency Rating, 25-Year Warranty'
        },
        // Add more products...
    ];

    // Initialize products
    renderProducts(products);

    // Price range slider
    const priceRange = document.getElementById('priceRange');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');

    priceRange.addEventListener('input', function() {
        minPrice.textContent = `$${this.value}`;
        filterProducts();
    });

    // Product type checkboxes
    const checkboxes = document.querySelectorAll('.checkbox-group input');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

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

        // Add event listeners
        const addToCartBtn = card.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', () => addToCart(product));

        const quickViewBtn = card.querySelector('.quick-view');
        quickViewBtn.addEventListener('click', () => showQuickView(product));

        return card;
    }

    // Generate rating stars
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

    // Filter products function
    function filterProducts() {
        const selectedPrice = parseInt(priceRange.value);
        const selectedTypes = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const filteredProducts = products.filter(product => {
            const priceMatch = product.price >= selectedPrice;
            const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(product.type);
            return priceMatch && typeMatch;
        });

        renderProducts(filteredProducts);
    }

    // Add to cart function
    function addToCart(product) {
        // Implement cart functionality
        console.log(`Added ${product.title} to cart`);
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        cartCount.textContent = parseInt(cartCount.textContent) + 1;
    }

    // Quick view function
    function showQuickView(product) {
        // Implement quick view modal
        console.log(`Quick view for ${product.title}`);
    }
});