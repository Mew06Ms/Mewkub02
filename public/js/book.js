// Select the modal
var modal = document.getElementById('bookModal');

// Select the close button
var closeBtn = document.getElementsByClassName('close-btn')[0];

// Function to open the modal with book details
function openModal(book) {
  document.getElementById('modal-book-image').src = book.image;
  document.getElementById('modal-book-title').innerText = book.title;
  document.getElementById('modal-book-author').innerText = book.author;
  document.getElementById('modal-book-description').innerText = book.description;
  document.getElementById('modal-book-price').innerText = `฿${book.price}`;

  // Add click event for the "Add to Cart" button inside the modal
  var addToCartButton = document.querySelector('.add-to-cart-modal-btn');
  addToCartButton.onclick = function () {
    addToCart(book);
  };

  modal.style.display = 'flex';
}

// Close the modal when the close button is clicked
closeBtn.onclick = function() {
  modal.style.display = 'none';
}

// Close the modal when clicking outside the modal content
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

// Attach event listeners to book items
var bookItems = document.querySelectorAll('.book-item a');

bookItems.forEach(item => {
  item.addEventListener('click', function(e) {
    e.preventDefault();

    // Get book details from the clicked item
    var book = {
      image: item.querySelector('img').src,
      title: item.querySelector('h3').innerText,
      author: "Author Name", // Replace with real author data if available
      description: "This is a description of the book.",
      price: item.querySelector('p').innerText.replace('฿', '')
    };

    openModal(book);
  });
});

// Function to add a book to the cart
function addToCart(book) {
  // Example of adding the book to a cart (can be local storage or backend)
  // This is a placeholder function. You can replace this with actual cart logic.
  console.log("Book added to cart: ", book);

  // Display SweetAlert2 success message
  Swal.fire({
    icon: 'success',
    title: 'Added to Cart!',
    text: `"${book.title}" has been added to your cart.`,
    showConfirmButton: false,
    timer: 1500
  });
}
