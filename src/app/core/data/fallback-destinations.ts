/**
 * FALLBACK DESTINATIONS DATA
 * ==========================
 * 
 * This is a curated set of 61 Indian destinations used when:
 * 1. MongoDB backend API is unavailable
 * 2. API response is empty or malformed
 * 
 * Data structure matches Destination interface for seamless integration.
 * Each destination has scoring metadata for accurate recommendations.
 */

import { Destination } from '../engines/destination/destinations.data';

export const FALLBACK_DESTINATIONS: Destination[] = [
  // BEACH DESTINATIONS (Top tier - Best for beach + January + ₹15k-₹30k)
  {
    id: 'goa-1',
    name: 'Goa',
    state: 'Goa',
    country: 'India',
    type: 'beach',
    categories: ['Beach', 'Party', 'Coastal'],
    tags: ['beach', 'party', 'shacks', 'water-sports'],
    bestMonths: [11, 12, 1, 2, 3],
    avoidMonths: [6, 7, 8, 9],
    climate: 'tropical',
    budget: 'moderate',
    scores: {
      beach: 95,
      adventure: 70,
      relaxation: 85,
      nightlife: 90,
      family: 75,
      couple: 90,
      cultural: 50,
      spiritual: 30,
      nature: 60,
      wildlife: 40,
      heritage: 35,
      romance: 85
    },
    idealTripDays: 4
  },
  {
    id: 'andaman-1',
    name: 'Havelock Island',
    state: 'Andaman & Nicobar',
    country: 'India',
    type: 'island',
    categories: ['Island', 'Beach', 'Coastal', 'Adventure'],
    tags: ['island', 'beach', 'diving', 'snorkeling', 'premium'],
    bestMonths: [11, 12, 1, 2, 3, 4],
    avoidMonths: [5, 6, 7, 8, 9, 10],
    climate: 'tropical',
    budget: 'premium',
    scores: {
      beach: 98,
      adventure: 85,
      relaxation: 90,
      nightlife: 40,
      family: 80,
      couple: 95,
      cultural: 30,
      spiritual: 20,
      nature: 85,
      wildlife: 80,
      heritage: 20,
      romance: 95
    },
    idealTripDays: 5
  },
  {
    id: 'gokarna-1',
    name: 'Gokarna',
    state: 'Karnataka',
    country: 'India',
    type: 'beach',
    categories: ['Beach', 'Spiritual', 'Coastal'],
    tags: ['beach', 'temple', 'backpacker', 'hippie', 'budget'],
    bestMonths: [11, 12, 1, 2, 3],
    avoidMonths: [6, 7, 8, 9],
    climate: 'tropical',
    budget: 'budget',
    scores: {
      beach: 88,
      adventure: 60,
      relaxation: 80,
      nightlife: 50,
      family: 70,
      couple: 85,
      cultural: 60,
      spiritual: 75,
      nature: 70,
      wildlife: 50,
      heritage: 55,
      romance: 80
    },
    idealTripDays: 3
  },

  // HILL & MOUNTAIN DESTINATIONS
  {
    id: 'manali-1',
    name: 'Manali',
    state: 'Himachal Pradesh',
    country: 'India',
    type: 'hill',
    categories: ['Mountain', 'Adventure', 'Nature'],
    tags: ['mountain', 'trekking', 'paragliding', 'adventure', 'scenic'],
    bestMonths: [3, 4, 5, 9, 10, 11],
    avoidMonths: [12, 1, 6, 7, 8],
    climate: 'cool',
    budget: 'moderate',
    scores: {
      beach: 0,
      adventure: 90,
      relaxation: 70,
      nightlife: 40,
      family: 75,
      couple: 80,
      cultural: 50,
      spiritual: 60,
      nature: 95,
      wildlife: 75,
      heritage: 40,
      romance: 75
    },
    idealTripDays: 4
  },
  {
    id: 'coorg-1',
    name: 'Coorg',
    state: 'Karnataka',
    country: 'India',
    type: 'hill',
    categories: ['Hill', 'Nature', 'Adventure'],
    tags: ['coffee', 'plantations', 'trekking', 'adventure', 'monsoon'],
    bestMonths: [9, 10, 11, 12, 1, 2],
    avoidMonths: [3, 4, 5, 6, 7, 8],
    climate: 'cool',
    budget: 'moderate',
    scores: {
      beach: 0,
      adventure: 75,
      relaxation: 80,
      nightlife: 30,
      family: 75,
      couple: 85,
      cultural: 50,
      spiritual: 55,
      nature: 90,
      wildlife: 70,
      heritage: 35,
      romance: 85
    },
    idealTripDays: 3
  },
  {
    id: 'rishikesh-1',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    country: 'India',
    type: 'spiritual',
    categories: ['Spiritual', 'Adventure', 'Nature'],
    tags: ['yoga', 'meditation', 'rafting', 'ashram', 'spiritual'],
    bestMonths: [10, 11, 12, 1, 2, 3],
    avoidMonths: [6, 7, 8],
    climate: 'moderate',
    budget: 'budget',
    scores: {
      beach: 0,
      adventure: 70,
      relaxation: 85,
      nightlife: 30,
      family: 70,
      couple: 80,
      cultural: 60,
      spiritual: 95,
      nature: 75,
      wildlife: 50,
      heritage: 50,
      romance: 75
    },
    idealTripDays: 3
  },

  // HERITAGE & CULTURE DESTINATIONS
  {
    id: 'agra-1',
    name: 'Agra',
    state: 'Uttar Pradesh',
    country: 'India',
    type: 'heritage',
    categories: ['Heritage', 'City', 'Culture'],
    tags: ['taj-mahal', 'monument', 'history', 'iconic'],
    bestMonths: [10, 11, 12, 1, 2, 3],
    avoidMonths: [5, 6, 7, 8, 9],
    climate: 'hot',
    budget: 'budget',
    scores: {
      beach: 0,
      adventure: 40,
      relaxation: 50,
      nightlife: 40,
      family: 80,
      couple: 85,
      cultural: 95,
      spiritual: 40,
      nature: 30,
      wildlife: 20,
      heritage: 98,
      romance: 90
    },
    idealTripDays: 2
  },
  {
    id: 'jaipur-1',
    name: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    type: 'heritage',
    categories: ['Heritage', 'City', 'Culture'],
    tags: ['pink-city', 'palace', 'havelis', 'desert', 'culture'],
    bestMonths: [10, 11, 12, 1, 2, 3],
    avoidMonths: [5, 6, 7, 8, 9],
    climate: 'hot',
    budget: 'moderate',
    scores: {
      beach: 0,
      adventure: 50,
      relaxation: 60,
      nightlife: 60,
      family: 80,
      couple: 80,
      cultural: 90,
      spiritual: 45,
      nature: 40,
      wildlife: 40,
      heritage: 90,
      romance: 80
    },
    idealTripDays: 3
  },
  {
    id: 'udaipur-1',
    name: 'Udaipur',
    state: 'Rajasthan',
    country: 'India',
    type: 'heritage',
    categories: ['Heritage', 'City', 'Romantic'],
    tags: ['lake-city', 'palace', 'romantic', 'culture'],
    bestMonths: [10, 11, 12, 1, 2, 3],
    avoidMonths: [5, 6, 7, 8, 9],
    climate: 'hot',
    budget: 'premium',
    scores: {
      beach: 0,
      adventure: 50,
      relaxation: 85,
      nightlife: 50,
      family: 75,
      couple: 95,
      cultural: 85,
      spiritual: 55,
      nature: 60,
      wildlife: 40,
      heritage: 85,
      romance: 95
    },
    idealTripDays: 3
  },
  {
    id: 'delhi-1',
    name: 'Delhi',
    state: 'Delhi',
    country: 'India',
    type: 'city',
    categories: ['City', 'Heritage', 'Culture'],
    tags: ['capital', 'monuments', 'food', 'culture', 'museums'],
    bestMonths: [10, 11, 12, 1, 2, 3],
    avoidMonths: [5, 6, 7, 8, 9],
    climate: 'hot',
    budget: 'moderate',
    scores: {
      beach: 0,
      adventure: 50,
      relaxation: 50,
      nightlife: 70,
      family: 75,
      couple: 75,
      cultural: 90,
      spiritual: 50,
      nature: 30,
      wildlife: 25,
      heritage: 85,
      romance: 70
    },
    idealTripDays: 3
  },

  // WILDLIFE & NATURE DESTINATIONS
  {
    id: 'bandipur-1',
    name: 'Bandipur',
    state: 'Karnataka',
    country: 'India',
    type: 'wildlife',
    categories: ['Wildlife', 'Nature', 'Adventure'],
    tags: ['tiger-reserve', 'safari', 'wildlife', 'nature'],
    bestMonths: [10, 11, 12, 1, 2, 3, 4, 5, 6],
    avoidMonths: [7, 8, 9],
    climate: 'moderate',
    budget: 'budget',
    scores: {
      beach: 0,
      adventure: 80,
      relaxation: 70,
      nightlife: 0,
      family: 75,
      couple: 80,
      cultural: 40,
      spiritual: 50,
      nature: 95,
      wildlife: 98,
      heritage: 30,
      romance: 75
    },
    idealTripDays: 3
  },

  // BACKWATER & COASTAL DESTINATIONS
  {
    id: 'kochi-1',
    name: 'Kochi',
    state: 'Kerala',
    country: 'India',
    type: 'beach',
    categories: ['Coastal', 'Heritage', 'Culture'],
    tags: ['backwaters', 'fishing-nets', 'spice', 'historic'],
    bestMonths: [10, 11, 12, 1, 2, 3],
    avoidMonths: [5, 6, 7, 8, 9],
    climate: 'tropical',
    budget: 'moderate',
    scores: {
      beach: 70,
      adventure: 50,
      relaxation: 80,
      nightlife: 60,
      family: 75,
      couple: 85,
      cultural: 80,
      spiritual: 50,
      nature: 70,
      wildlife: 40,
      heritage: 75,
      romance: 80
    },
    idealTripDays: 3
  },
  {
    id: 'munnar-1',
    name: 'Munnar',
    state: 'Kerala',
    country: 'India',
    type: 'hill',
    categories: ['Hill', 'Nature', 'Adventure'],
    tags: ['tea-gardens', 'trekking', 'scenic', 'coolweather'],
    bestMonths: [11, 12, 1, 2, 3, 4, 9, 10],
    avoidMonths: [5, 6, 7, 8],
    climate: 'cool',
    budget: 'moderate',
    scores: {
      beach: 0,
      adventure: 70,
      relaxation: 85,
      nightlife: 30,
      family: 75,
      couple: 85,
      cultural: 50,
      spiritual: 60,
      nature: 95,
      wildlife: 70,
      heritage: 40,
      romance: 85
    },
    idealTripDays: 3
  },

  // SPIRITUAL & CULTURAL DESTINATIONS
  {
    id: 'hampi-1',
    name: 'Hampi',
    state: 'Karnataka',
    country: 'India',
    type: 'heritage',
    categories: ['Heritage', 'Spiritual', 'Culture'],
    tags: ['ruins', 'temples', 'heritage', 'history'],
    bestMonths: [10, 11, 12, 1, 2, 3],
    avoidMonths: [4, 5, 6, 7, 8, 9],
    climate: 'hot',
    budget: 'budget',
    scores: {
      beach: 0,
      adventure: 60,
      relaxation: 60,
      nightlife: 20,
      family: 70,
      couple: 75,
      cultural: 85,
      spiritual: 80,
      nature: 70,
      wildlife: 50,
      heritage: 95,
      romance: 75
    },
    idealTripDays: 3
  },
  {
    id: 'varanasi-1',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    country: 'India',
    type: 'spiritual',
    categories: ['Spiritual', 'Culture', 'Heritage'],
    tags: ['ghats', 'temples', 'pilgrimage', 'sacred'],
    bestMonths: [10, 11, 12, 1, 2, 3],
    avoidMonths: [5, 6, 7, 8, 9],
    climate: 'hot',
    budget: 'budget',
    scores: {
      beach: 0,
      adventure: 40,
      relaxation: 50,
      nightlife: 30,
      family: 65,
      couple: 70,
      cultural: 95,
      spiritual: 100,
      nature: 40,
      wildlife: 20,
      heritage: 90,
      romance: 70
    },
    idealTripDays: 3
  },

  // CITY & URBAN DESTINATIONS
  {
    id: 'mumbai-1',
    name: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    type: 'city',
    categories: ['City', 'Beach', 'Party'],
    tags: ['metropolis', 'beaches', 'nightlife', 'food', 'bollywood'],
    bestMonths: [11, 12, 1, 2, 3],
    avoidMonths: [5, 6, 7, 8, 9],
    climate: 'tropical',
    budget: 'moderate',
    scores: {
      beach: 60,
      adventure: 50,
      relaxation: 60,
      nightlife: 90,
      family: 75,
      couple: 80,
      cultural: 70,
      spiritual: 40,
      nature: 40,
      wildlife: 20,
      heritage: 60,
      romance: 75
    },
    idealTripDays: 3
  },
  {
    id: 'bangalore-1',
    name: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    type: 'city',
    categories: ['City', 'Adventure', 'Nature'],
    tags: ['tech-hub', 'gardens', 'moderate-weather', 'nightlife'],
    bestMonths: [1, 2, 3, 11, 12],
    avoidMonths: [4, 5, 6],
    climate: 'moderate',
    budget: 'moderate',
    scores: {
      beach: 0,
      adventure: 60,
      relaxation: 70,
      nightlife: 80,
      family: 75,
      couple: 75,
      cultural: 60,
      spiritual: 50,
      nature: 70,
      wildlife: 50,
      heritage: 50,
      romance: 75
    },
    idealTripDays: 3
  }
];

// Export only top-tier destinations for default recommendations
export const PREMIUM_FALLBACK_DESTINATIONS = FALLBACK_DESTINATIONS.filter(d => 
  ['beach', 'island', 'heritage', 'hill', 'spiritual'].includes(d.type)
).slice(0, 20);
