// ===== EVENT TRACKING =====

// Track Hero CTA clicks
document.querySelector('.hero-cta')?.addEventListener('click', function() {
  trackEvent('cta_click', {
    'event_category': 'Engagement',
    'event_label': 'Hero Banner - Explore Deals',
    'value': 'hero_section'
  });
});

// Track category card clicks
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
  card.addEventListener('click', function() {
    const category = this.getAttribute('data-category');
    const categoryName = this.querySelector('.category-title')?.textContent;
    
    trackEvent('category_click', {
      'event_category': 'Navigation',
      'event_label': categoryName || category,
      'value': category
    });
    
    console.log('🏷️ Category Card Clicked:', categoryName || category);
  });
});

// Track deal card views and clicks
const dealCards = document.querySelectorAll('.deal-card');
dealCards.forEach(card => {
  card.addEventListener('click', function(e) {
    if (!e.target.closest('.deal-button')) {
      const dealTitle = this.querySelector('.deal-title')?.textContent;
      const dealCategory = this.querySelector('.deal-category')?.textContent;
      
      trackEvent('deal_view', {
        'event_category': 'Engagement',
        'event_label': dealTitle,
        'value': dealCategory
      });
    }
  });
});

// Track quick link clicks
const quickLinks = document.querySelectorAll('.quick-link-card');
quickLinks.forEach(link => {
  link.addEventListener('click', function() {
    const linkName = this.querySelector('.quick-link-name')?.textContent;
    
    trackEvent('quick_link_click', {
      'event_category': 'Navigation',
      'event_label': linkName,
      'value': 'hero_quick_access'
    });
    
    console.log('⚡ Quick Link Clicked:', linkName);
  });
});

// Track social media link clicks
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
  link.addEventListener('click', function() {
    const platform = this.querySelector('i').className.includes('facebook') ? 'Facebook' :
                    this.querySelector('i').className.includes('twitter') ? 'Twitter' :
                    this.querySelector('i').className.includes('instagram') ? 'Instagram' :
                    this.querySelector('i').className.includes('linkedin') ? 'LinkedIn' : 'Unknown';
    
    trackEvent('social_click', {
      'event_category': 'Social',
      'event_label': platform,
      'value': 'footer'
    });
    
    console.log('📱 Social Link Clicked:', platform);
  });
});
