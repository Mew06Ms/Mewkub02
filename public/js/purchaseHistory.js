document.addEventListener("DOMContentLoaded", function () {
    const orderListContainer = document.querySelector(".order-list");

    // Fetch the purchase history from localStorage
    let purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];

    function renderPurchaseHistory() {
        orderListContainer.innerHTML = ""; // Clear existing orders

        if (purchaseHistory.length === 0) {
            const emptyMessage = document.createElement("p");
            emptyMessage.className = "empty-message";
            emptyMessage.textContent = "You have no purchase history.";
            orderListContainer.appendChild(emptyMessage);
            return;
        }

        purchaseHistory.forEach(order => {
            // Create order item container
            const orderItem = document.createElement("div");
            orderItem.className = "order-item";

            // Create order header
            const orderHeader = document.createElement("div");
            orderHeader.className = "order-header";
            orderHeader.innerHTML = `
                <h3>Order ID: ${order.orderId}</h3>
                <p>Order Date: ${order.orderDate}</p>
                <p>Total: ฿${order.total}</p>
            `;
            orderItem.appendChild(orderHeader);

            // Create container for ordered products
            const orderItemsContainer = document.createElement("div");
            orderItemsContainer.className = "order-items";

            // Loop through each item in the order
            order.items.forEach(product => {
                const productElement = document.createElement("div");
                productElement.className = "order-product";
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-details">
                        <h4>${product.title}</h4>
                        <p>${product.author}</p>
                        <p>฿${product.price.toFixed(2)}</p>
                    </div>
                `;
                orderItemsContainer.appendChild(productElement);
            });

            orderItem.appendChild(orderItemsContainer);
            orderListContainer.appendChild(orderItem);
        });
    }

    // Render purchase history when the page loads
    renderPurchaseHistory();
});
