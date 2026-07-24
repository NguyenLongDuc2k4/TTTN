/* ==========================================
   MyE Website - Javascript Actions
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Scroll Effect for Header
  const navbar = document.querySelector('.mye-navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Hero Slider Functionality
  const slides = document.querySelectorAll('.hero-slide');
  const thumbs = document.querySelectorAll('.thumb-item');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.add('d-none'));
    thumbs.forEach(thumb => thumb.classList.remove('active'));

    slides[index].classList.remove('d-none');
    thumbs[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function startSlideShow() {
    slideInterval = setInterval(nextSlide, 6000); // Change banner every 6 seconds
  }

  function stopSlideShow() {
    clearInterval(slideInterval);
  }

  // Thumbnails click events
  thumbs.forEach((thumb, idx) => {
    thumb.addEventListener('click', () => {
      stopSlideShow();
      showSlide(idx);
      startSlideShow();
    });
  });

  // Initialize Slider if elements exist
  if (slides.length > 0 && thumbs.length > 0) {
    showSlide(0);
    startSlideShow();
  }

  // 3. News Tab Filtering Simulation
  const tabButtons = document.querySelectorAll('.news-tab-btn');
  const newsItems = document.querySelectorAll('.news-item-col');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active from all tabs
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Add active to clicked tab
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      newsItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.remove('d-none');
        } else {
          item.classList.add('d-none');
        }
      });
    });
  });
});
