document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const searchIcon = document.getElementById("searchIcon");
  const searchContainer = document.getElementById("searchContainer");
  const closeSearch = document.getElementById("closeSearch");

  // Toggle mobile menu
  hamburger.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent event from bubbling up
    navLinks.classList.toggle("mobile-visible");
    hamburger.classList.toggle("active");
    // Close search if open
    searchContainer.classList.remove("active");
  });

  // Search functionality
  searchIcon.addEventListener("click", function (e) {
    e.stopPropagation();
    searchContainer.classList.toggle("active");
    // Close mobile menu if open
    navLinks.classList.remove("mobile-visible");
    hamburger.classList.remove("active");
    // Focus on search input when opened
    if (searchContainer.classList.contains("active")) {
      document.getElementById("searchInput").focus();
    }
  });

  closeSearch.addEventListener("click", function () {
    searchContainer.classList.remove("active");
  });

  // Close menus when clicking outside
  document.addEventListener("click", function (e) {
    // Close search if clicked outside
    if (!searchContainer.contains(e.target) && !searchIcon.contains(e.target)) {
      searchContainer.classList.remove("active");
    }

    // Close mobile menu if clicked outside
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove("mobile-visible");
      hamburger.classList.remove("active");
    }
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("mobile-visible");
      hamburger.classList.remove("active");
    });
  });
});

// Image Carousel
// let currentSlide = 0;
// const slides = document.querySelectorAll(".main-carousel img");
// const totalSlides = slides.length;

// function showSlide(index) {
//   slides.forEach((slide, i) => {
//     slide.style.transform = `translateX(${100 * (i - index)}%)`;
//   });
// }

// // Touch Handling
// let touchStartX = 0;
// const carousel = document.querySelector(".main-carousel");

// carousel.addEventListener("touchstart", (e) => {
//   touchStartX = e.touches[0].clientX;
// });

// carousel.addEventListener("touchend", (e) => {
//   const touchEndX = e.changedTouches[0].clientX;
//   const diff = touchStartX - touchEndX;

//   if (Math.abs(diff) > 50) {
//     currentSlide =
//       diff > 0
//         ? Math.min(currentSlide + 1, totalSlides - 1)
//         : Math.max(currentSlide - 1, 0);
//     showSlide(currentSlide);
//   }
// });



// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".main-carousel img");
const dots = document.querySelectorAll(".dot");
const thumbnails = document.querySelectorAll(".thumbnail-row img");
const totalSlides = slides.length;
const swipeLeft = document.querySelector(".swipe-left");
const swipeRight = document.querySelector(".swipe-right");
const carousel = document.querySelector(".main-carousel");

// Initialize carousel
function initCarousel() {
  slides.forEach((slide, i) => {
    slide.style.display = i === 0 ? "block" : "none";
  });
  updateIndicators();
}

// Show specific slide
function showSlide(index) {
  // Validate index
  currentSlide = (index + totalSlides) % totalSlides;
  
  // Update slides
  slides.forEach((slide, i) => {
    slide.style.display = i === currentSlide ? "block" : "none";
    slide.classList.toggle("active", i === currentSlide);
  });
  
  updateIndicators();
}

// Update navigation indicators
function updateIndicators() {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
  
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === currentSlide);
  });
}

// Navigation handlers
function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

// Event Listeners
swipeLeft.addEventListener("click", prevSlide);
swipeRight.addEventListener("click", nextSlide);

// Thumbnail navigation
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => showSlide(index));
});

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => showSlide(index));
});

// Touch Handling
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

carousel.addEventListener("touchmove", (e) => {
  touchEndX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", () => {
  const threshold = 50; // Minimum swipe distance
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
  }
});

// Auto-rotate (optional)
let autoRotateInterval;
function startAutoRotate(interval = 5000) {
  autoRotateInterval = setInterval(nextSlide, interval);
}

function stopAutoRotate() {
  clearInterval(autoRotateInterval);
}

// Pause on hover
carousel.addEventListener("mouseenter", stopAutoRotate);
carousel.addEventListener("mouseleave", () => startAutoRotate());

// Initialize
initCarousel();
startAutoRotate();

// Subscription Options Toggle
document.querySelectorAll('.radio-container input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', function() {
    // Hide all included sections first
    document.querySelectorAll('.included-section').forEach(section => {
      section.style.display = 'none';
    });
    
    // Show the selected one
    if (this.checked) {
      const targetId = this.id === 'sub1' ? 'single-kit-details' : 
                      this.id === 'sub2' ? 'double-kit-details' : 
                      'try-once-details';
      document.getElementById(targetId).style.display = 'block';
    }
  });
});

// Initialize first subscription option as open
document.getElementById('single-kit-details').style.display = 'block';



// Percentage Counters
const counters = document.querySelectorAll(".percentage");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = +entry.target.dataset.target;
        animateCounter(entry.target, target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => observer.observe(counter));

function animateCounter(element, target) {
  let current = 0;
  const duration = 2000;
  const increment = target / (duration / 10);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      clearInterval(timer);
      current = target;
    }
    element.textContent = Math.ceil(current) + "%";
  }, 10);
}

// Testimonial Carousel
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".testimonial-carousel");
  const cards = document.querySelectorAll(".testimonial-card");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth + 30; // width + gap
  const totalCards = cards.length;

  // Scroll to specific card
  function scrollToCard(index) {
    currentIndex = Math.max(0, Math.min(index, totalCards - 1));
    carousel.scrollTo({
      left: currentIndex * cardWidth,
      behavior: "smooth",
    });
    updateArrows();
  }

  // Update arrow visibility
  function updateArrows() {
    leftArrow.style.display = currentIndex === 0 ? "none" : "flex";
    rightArrow.style.display = currentIndex >= totalCards - 1 ? "none" : "flex";
  }

  // Arrow click handlers
  leftArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    scrollToCard(currentIndex - 1);
  });

  rightArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    scrollToCard(currentIndex + 1);
  });

  // Touch events for mobile
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  carousel.addEventListener("touchstart", function (e) {
    isDragging = true;
    startPos = e.touches[0].clientX;
    carousel.style.transition = "none";
  });

  carousel.addEventListener("touchmove", function (e) {
    if (!isDragging) return;
    const currentPosition = e.touches[0].clientX;
    currentTranslate = prevTranslate + currentPosition - startPos;
  });

  carousel.addEventListener("touchend", function () {
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -50) {
      scrollToCard(currentIndex + 1);
    } else if (movedBy > 50) {
      scrollToCard(currentIndex - 1);
    }

    carousel.style.transition = "transform 0.3s ease-out";
    carousel.style.transform = "translateX(0)";
    prevTranslate = 0;
  });

  // Initialize
  updateArrows();

  // Handle window resize
  window.addEventListener("resize", function () {
    const newCardWidth = cards[0].offsetWidth + 30;
    if (Math.abs(newCardWidth - cardWidth) > 5) {
      // Only update if significant change
      scrollToCard(currentIndex);
    }
  });
});
