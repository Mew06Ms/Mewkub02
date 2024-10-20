document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.querySelector(".checkout-items");
    const subtotalElement = document.querySelector(".subtotal");
    const shippingElement = document.querySelector(".shipping");
    const totalElement = document.querySelector(".total");
    const placeOrderButton = document.querySelector(".place-order-btn");

    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCheckout() {
        cartItemsContainer.innerHTML = ""; // Clear existing items
        let subtotal = 0;

        cartItems.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.className = "checkout-item";
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="item-image">
                <div class="item-details">
                    <h3 class="item-title">${item.title}</h3>
                    <p class="item-author">${item.author}</p>
                    <p class="item-price">฿${item.price.toFixed(2)}</p>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            subtotal += item.price;

            // Add remove item functionality
            itemElement.querySelector(".remove-item").addEventListener("click", function () {
                removeItem(index);
            });
        });

        subtotalElement.innerText = `Subtotal: ฿${subtotal.toFixed(2)}`;
        shippingElement.innerText = `Shipping: ฿50.00`;
        totalElement.innerText = `Total: ฿${(subtotal + 50).toFixed(2)}`;
    }

    function removeItem(index) {
        cartItems.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        updateCheckout();
    }

    placeOrderButton.addEventListener("click", function () {
        if (cartItems.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Your cart is empty!',
                text: 'Please add items to your cart before checking out.',
            });
            return;
        }

        const orderDate = new Date().toLocaleDateString();
        const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const purchase = {
            items: cartItems,
            orderId: orderId,
            orderDate: orderDate,
            total: (cartItems.reduce((sum, item) => sum + item.price, 0) + 50).toFixed(2)
        };

        let purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
        purchaseHistory.push(purchase);
        localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));

        Swal.fire({
            icon: 'success',
            title: 'Order placed successfully!',
            text: `Order ID: ${orderId}`,
            confirmButtonText: 'OK'
        }).then(() => {
            localStorage.removeItem("cart"); // Clear the cart
            window.location.href = "/purchaseHistory"; // Redirect to purchase history page
        });
    });

    updateCheckout();
});
