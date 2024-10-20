// Get the modal element and close button
const loginModal = document.getElementById('loginModal');
const closeModal = document.querySelector('.close-modal');

// Show the modal when the user icon is clicked
document.querySelector('.fas.fa-user').addEventListener('click', function (e) {
  e.preventDefault();
  loginModal.classList.add('show');

  // Allowing a small timeout for the modal content to fade in smoothly
  setTimeout(() => {
    const modalContent = loginModal.querySelector('.modal-content');
    modalContent.style.opacity = '1'; // Fade in the modal content
  }, 50);
});

// Close the modal when the 'X' is clicked
closeModal.addEventListener('click', function () {
  closeModalModal();
});

// Close the modal if the user clicks outside the modal content
window.addEventListener('click', function (event) {
  if (event.target == loginModal) {
    closeModalModal();
  }
});

// Function to close modal with fade-out effect
function closeModalModal() {
  const modalContent = loginModal.querySelector('.modal-content');
  modalContent.style.opacity = '0'; // Fade out the modal content
  loginModal.classList.remove('show'); // Remove show class to trigger CSS
}

// Handle form submission with SweetAlert2
document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const rememberMe = document.getElementById('rememberMe').checked;

  // Simple check for demo purpose
  if (username === 'user' && password === 'password123') {
    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: rememberMe ? 'Welcome back! You will be remembered.' : 'Welcome back!',
      showConfirmButton: false,
      timer: 3000
    });
    closeModalModal(); // Close modal after successful login
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Invalid username or password!',
    });
  }
});
