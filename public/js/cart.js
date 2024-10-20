document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const subtotalElement = document.querySelector('.subtotal');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Available book counts (for demonstration, you may want to fetch this from your data source)
    const availableBooks = {
        "Book Title 1": 10, // Example available count for "Book Title 1"
        "Book Title 2": 5,  // Example available count for "Book Title 2"
        "Book Title 3": 20  // Example available count for "Book Title 3"
        // Add other books as needed
    };

    function renderCartItems() {
        cartItemsContainer.innerHTML = ''; // Clear existing items
        let subtotal = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.title}</h3>
                    <p>Price: ฿${item.price.toFixed(2)}</p>
                    <div class="quantity-control">
                        <button class="minus-btn" data-title="${item.title}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="plus-btn" data-title="${item.title}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-title="${item.title}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            subtotal += item.price * item.quantity;
        });

        subtotalElement.textContent = `Subtotal: ฿${subtotal.toFixed(2)}`;

        // Add event listeners to buttons
        addEventListeners();
    }

    function addEventListeners() {
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const title = e.target.dataset.title;
                cart = cart.filter(item => item.title !== title);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCartItems();
            });
        });

        document.querySelectorAll('.plus-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const title = e.target.dataset.title;
                const item = cart.find(item => item.title === title);
                const availableCount = availableBooks[title]; // Get available count

                if (item.quantity < availableCount) { // Only allow increase if stock is available
                    item.quantity += 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCartItems();
                    showToast('Item quantity updated!');
                } else {
                    showToast('No more stock available!', true); // Show error message
                }
            });
        });

        document.querySelectorAll('.minus-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const title = e.target.dataset.title;
                const item = cart.find(item => item.title === title);
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCartItems();
                    showToast('Item quantity updated!');
                }
            });
        });
    }

    function showToast(message, isError = false) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        if (isError) {
            toast.classList.add('error'); // Error styling for failed actions
        }
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 500);
        }, 3000);
    }

    // Initialize quantities to 1 for items added to the cart initially
    cart = cart.map(item => ({ ...item, quantity: item.quantity || 1 }));
    renderCartItems();
});
