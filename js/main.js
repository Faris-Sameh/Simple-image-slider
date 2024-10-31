const slides = document.querySelectorAll(".slides img");
const dots = document.querySelectorAll(".dot");
let slideIndex = 0;
let intervalId = null;
let startX = 0;
let endX = 0
document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
    if (slides.length > 0) {
        slides[slideIndex].classList.add("displaySlide");
        updateDots();
        intervalId = setInterval(nextSlide, 3000);

        const slider = document.querySelector('.slider');
        slider.addEventListener('mouseenter', stopSlider);
        slider.addEventListener('mouseleave', startSlider);

        slider.addEventListener('touchstart', handleTouchStart, false);
        slider.addEventListener('touchmove', handleTouchMove, false);
    }
}

function showSlide(index) {
    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });
    slides[slideIndex].classList.add("displaySlide");
    
    updateDots();
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function currentSlide(index) {
    slideIndex = index;
    showSlide(slideIndex);
}

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.remove("active");
        if (index === slideIndex) {
            dot.classList.add("active");
        }
    });
}

function stopSlider() {
    clearInterval(intervalId);
}

function startSlider() {
    intervalId = setInterval(nextSlide, 3000);
}

function handleTouchStart(event) {
    startX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    endX = event.touches[0].clientX;
    if (startX - endX > 50) {
        nextSlide();
    } else if (endX - startX > 50) {
        prevSlide();
    }
}