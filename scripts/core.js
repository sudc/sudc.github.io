// ===== SMOOTH SCROLLING =====
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Add smooth scroll to all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '') {
      e.preventDefault();
      const targetId = href.substring(1);
      scrollToSection(targetId);
    }
  });
});

// ===== ANALYTICS & TRACKING =====
function trackEvent(eventName, eventParams) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, eventParams);
    console.log('📊 GA Event:', eventName, eventParams);
  }
}

// ===== EXPORT FOR GLOBAL USE =====
window.scrollToSection = scrollToSection;
window.trackEvent = trackEvent;
