// ===== UI INTERACTIONS =====

// Card hover animations (add active class for mobile)
const cards = document.querySelectorAll('.category-card, .deal-card, .quick-link-card');

cards.forEach(card => {
  card.addEventListener('touchstart', function() {
    this.classList.add('active');
  });
  
  card.addEventListener('touchend', function() {
    setTimeout(() => {
      this.classList.remove('active');
    }, 300);
  });
});

// Lazy load effect for cards (fade in on scroll)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Initially set cards to invisible
cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});
