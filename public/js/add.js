// Select all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const title = e.target.dataset.title;
        const price = parseFloat(e.target.dataset.price);
        const image = e.target.getAttribute('data-image'); // Get the image source
        
        const bookElement = e.target.closest('.book-item');
        const countElement = bookElement.querySelector('.available-count span'); // Get the count element
        let availableCount = parseInt(countElement.textContent); // Current available count

        // Check if there are books available
        if (availableCount > 0) {
            // Add the book to the cart
            const cartItem = { title, price, image };
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));

            // Decrease the available count
            availableCount -= 1;
            countElement.textContent = availableCount;

            // Show success notification using SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Added to Cart!',
                text: `${title} has been added to your cart.`,
                confirmButtonText: 'Okay'
            });

        } else {
            // If out of stock, show an error alert
            Swal.fire({
                icon: 'error',
                title: 'Out of Stock',
                text: `${title} is out of stock.`,
                confirmButtonText: 'Okay'
            });
        }
    });
});
