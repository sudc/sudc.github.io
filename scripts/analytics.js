// ===== SCROLL DEPTH TRACKING =====

let scrollDepths = [25, 50, 75, 100];
let scrollTracked = [];

window.addEventListener('scroll', function() {
  const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
  
  scrollDepths.forEach(depth => {
    if (scrollPercent >= depth && !scrollTracked.includes(depth)) {
      scrollTracked.push(depth);
      trackEvent('scroll_depth', {
        'event_category': 'Engagement',
        'event_label': `${depth}% Scrolled`,
        'value': depth
      });
      console.log(`📜 Scroll Depth: ${depth}%`);
    }
  });
});

// ===== TIME ON PAGE TRACKING =====

let timeOnPage = 0;
let timeIntervals = [30, 60, 120, 300]; // seconds
let timeTracked = [];

setInterval(() => {
  timeOnPage += 10;
  
  timeIntervals.forEach(interval => {
    if (timeOnPage >= interval && !timeTracked.includes(interval)) {
      timeTracked.push(interval);
      trackEvent('time_on_page', {
        'event_category': 'Engagement',
        'event_label': `${interval}s on page`,
        'value': interval
      });
      console.log(`⏱️ Time on page: ${interval}s`);
    }
  });
}, 10000); // Check every 10 seconds

// ===== PAGE VISIBILITY TRACKING =====

document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    trackEvent('page_hidden', {
      'event_category': 'Engagement',
      'event_label': 'User left page',
      'value': timeOnPage
    });
  } else {
    trackEvent('page_visible', {
      'event_category': 'Engagement',
      'event_label': 'User returned to page',
      'value': timeOnPage
    });
  }
});

// ===== INITIALIZATION LOG =====

console.log('✅ TripSaver loaded successfully!');
console.log('📊 Analytics tracking enabled (Google Analytics)');
console.log('📝 Remember to replace all REPLACE_WITH_AFFILIATE_ID with your actual affiliate IDs');
console.log('🔑 Replace G-XXXXXXXXXX with your Google Analytics 4 Measurement ID');
