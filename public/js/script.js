let slideIndex = 0;
let timer; // Variable to hold the timer

function showSlides() {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    
    // Reset all slides and dots to hide
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // Increment slide index and reset if it exceeds the number of slides
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    // Show the current slide and activate the corresponding dot
    slides[slideIndex - 1].style.display = "block";  
    dots[slideIndex - 1].className += " active";
    
    // Restart the timer for auto slide
    timer = setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

// Function to change the current slide to a specific index
function currentSlide(n) {
    clearTimeout(timer); // Clear the timer
    slideIndex = n - 1; // Set slide index
    showSlides(); // Show the current slide
}

// Function to plus/minus slides
function plusSlides(n) {
    clearTimeout(timer); // Clear the timer
    slideIndex += n; // Change the slide index
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    } else if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    showSlides(); // Show the new slide
}

// Initialize the first slide
showSlides();



