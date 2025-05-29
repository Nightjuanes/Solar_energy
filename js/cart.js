let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
    const cartBtn = document.querySelector(".fa-shopping-cart");
    const cartSidebar = document.getElementById("cartSidebar");
    const closeCart = document.getElementById("closeCart");

    // Mostrar u ocultar carrito lateral
    if (cartBtn && cartSidebar && closeCart) {
        cartBtn.addEventListener("click", () => {
            cartSidebar.classList.toggle("visible");
        });

        closeCart.addEventListener("click", () => {
            cartSidebar.classList.remove("visible");
        });
    }

    // Escucha click para añadir producto
    document.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("add-to-cart")) {
            const productCard = e.target.closest(".product-card");
            const title = productCard.querySelector(".product-title").textContent;
            const price = parseFloat(productCard.querySelector(".product-price").textContent.replace("$", ""));
            const imgSrc = productCard.querySelector("img").src;

            const existing = cart.find(item => item.title === title);
            if (existing) {
                existing.quantity++;
            } else {
                cart.push({ title, price, imgSrc, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartUI();
        }
    });

    // Mostrar contenido si ya hay productos guardados
    updateCartUI();
});

// Mostrar productos del carrito
function updateCartUI() {
    const container = document.getElementById("cartItemsContainer");
    const totalSpan = document.getElementById("cartTotal");

    if (!container || !totalSpan) return;

    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        totalSpan.textContent = "0.00";
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.imgSrc}" alt="${item.title}">
                <div>
                    <p><strong>${item.title}</strong></p>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
                <button onclick="removeItem(${index})" class="remove-btn"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
    });

    totalSpan.textContent = total.toFixed(2);
}

// Eliminar producto
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}
