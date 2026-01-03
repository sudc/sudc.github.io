/**
 * Sample Itinerary Data
 * Predefined day-wise plans for destinations
 * Can be replaced with AI generation in Phase 2
 */

import { ItineraryDatabase } from '../models/itinerary.model';

export const SAMPLE_ITINERARIES: ItineraryDatabase = {
  goa: {
    '3': {
      destination: 'Goa',
      destinationEmoji: '🏖️',
      days: 3,
      title: '3-Day Goa Beach Escape',
      description: 'Perfect blend of beaches, culture, and nightlife',
      itinerary: [
        {
          day: 1,
          title: 'Arrival & Baga Beach',
          emoji: '🌅',
          description: 'Arrive, check-in, and explore the vibrant Baga Beach',
          places: ['Baga Beach', 'Calangute Beach', 'Beach shacks for dinner'],
          activities: ['Beach walk', 'Water sports', 'Sunset viewing'],
          ctas: [
            {
              type: 'hotel',
              label: 'Hotels near Baga',
              affiliate: 'agoda',
              emoji: '🏨'
            },
            {
              type: 'essential',
              label: 'Beach gear & sunscreen',
              affiliate: 'amazon',
              emoji: '☀️'
            },
            {
              type: 'transport',
              label: 'Bike rentals',
              affiliate: 'abhibus',
              emoji: '🏍️'
            }
          ]
        },
        {
          day: 2,
          title: 'North Goa Adventure',
          emoji: '🗺️',
          description: 'Explore forts, beaches, and water sports',
          places: ['Fort Aguada', 'Anjuna Beach', 'Chapora Fort', 'Markets'],
          activities: ['Fort exploration', 'Water sports', 'Sunset at Chapora'],
          ctas: [
            {
              type: 'activity',
              label: 'Water sports packages',
              affiliate: 'getyourguide',
              emoji: '🏄'
            },
            {
              type: 'food',
              label: 'Best seafood restaurants',
              affiliate: 'makemytrip',
              emoji: '🍽️'
            },
            {
              type: 'transport',
              label: 'Local transport options',
              affiliate: 'abhibus',
              emoji: '🚕'
            }
          ]
        },
        {
          day: 3,
          title: 'South Goa Relaxation',
          emoji: '🌴',
          description: 'Relax at laid-back beaches and plan departure',
          places: ['Palolem Beach', 'Colva Beach', 'Shopping markets', 'Departure prep'],
          activities: ['Beach relaxation', 'Shopping', 'Sunset dinner'],
          ctas: [
            {
              type: 'hotel',
              label: 'Late checkout options',
              affiliate: 'agoda',
              emoji: '🏨'
            },
            {
              type: 'essential',
              label: 'Travel souvenirs & gifts',
              affiliate: 'flipkart',
              emoji: '🎁'
            },
            {
              type: 'transport',
              label: 'Airport transfers',
              affiliate: 'abhibus',
              emoji: '✈️'
            }
          ]
        }
      ],
      bestTime: 'October to March',
      budget: '₹15,000 - ₹25,000 per person'
    },
    '5': {
      destination: 'Goa',
      destinationEmoji: '🏖️',
      days: 5,
      title: '5-Day Goa Complete Experience',
      description: 'Deep dive into beaches, culture, wildlife, and nightlife',
      itinerary: [
        {
          day: 1,
          title: 'Arrival & Baga Beach',
          emoji: '🌅',
          description: 'Arrive and settle in at Baga',
          places: ['Baga Beach', 'Calangute', 'Beach shacks'],
          activities: ['Beach walk', 'Sunset', 'Dinner'],
          ctas: [
            {
              type: 'hotel',
              label: 'Hotels in Baga',
              affiliate: 'agoda',
              emoji: '🏨'
            }
          ]
        },
        {
          day: 2,
          title: 'North Goa Forts',
          emoji: '🏰',
          description: 'Historical forts and scenic viewpoints',
          places: ['Fort Aguada', 'Chapora Fort', 'Anjuna Beach'],
          activities: ['Fort tours', 'Photography', 'Beach time'],
          ctas: [
            {
              type: 'activity',
              label: 'Guided fort tours',
              affiliate: 'getyourguide',
              emoji: '🗺️'
            }
          ]
        },
        {
          day: 3,
          title: 'Spice Plantations & Wildlife',
          emoji: '🌿',
          description: 'Explore inland plantations and nature',
          places: ['Spice plantations', 'Bird sanctuary', 'Backwaters'],
          activities: ['Plantation tour', 'Bird watching', 'Boat ride'],
          ctas: [
            {
              type: 'activity',
              label: 'Plantation tours',
              affiliate: 'getyourguide',
              emoji: '🌾'
            }
          ]
        },
        {
          day: 4,
          title: 'South Goa & Beaches',
          emoji: '🌊',
          description: 'Quieter southern beaches and villages',
          places: ['Palolem', 'Colva', 'Benaulim', 'Local villages'],
          activities: ['Beach relaxation', 'Village exploration', 'Sunset'],
          ctas: [
            {
              type: 'hotel',
              label: 'Beach shacks & stays',
              affiliate: 'agoda',
              emoji: '🏠'
            }
          ]
        },
        {
          day: 5,
          title: 'Shopping & Departure',
          emoji: '🛍️',
          description: 'Last-minute shopping and travel',
          places: ['Markets', 'Boutiques', 'Departure'],
          activities: ['Shopping', 'Souvenirs', 'Travel'],
          ctas: [
            {
              type: 'essential',
              label: 'Travel essentials',
              affiliate: 'amazon',
              emoji: '🧳'
            },
            {
              type: 'transport',
              label: 'Airport transfers',
              affiliate: 'abhibus',
              emoji: '✈️'
            }
          ]
        }
      ],
      bestTime: 'October to March',
      budget: '₹25,000 - ₹40,000 per person'
    }
  },

  delhi: {
    '3': {
      destination: 'Delhi',
      destinationEmoji: '🕌',
      days: 3,
      title: '3-Day Delhi Heritage Tour',
      description: 'Explore Old Delhi, monuments, and culture',
      itinerary: [
        {
          day: 1,
          title: 'Old Delhi Heritage',
          emoji: '🏛️',
          description: 'Visit Red Fort, Jama Masjid, and local markets',
          places: ['Red Fort', 'Jama Masjid', 'Chandni Chowk', 'Street food'],
          activities: ['Walking tour', 'Photography', 'Street food tasting'],
          ctas: [
            {
              type: 'hotel',
              label: 'Hotels in Old Delhi',
              affiliate: 'agoda',
              emoji: '🏨'
            },
            {
              type: 'transport',
              label: 'Auto & metro passes',
              affiliate: 'abhibus',
              emoji: '🚆'
            }
          ]
        },
        {
          day: 2,
          title: 'New Delhi Monuments',
          emoji: '🏗️',
          description: 'India Gate, Rashtrapati Bhawan, museums',
          places: ['India Gate', 'Rashtrapati Bhawan', 'National Museum'],
          activities: ['Monument visits', 'Museum exploration', 'Gardens walk'],
          ctas: [
            {
              type: 'activity',
              label: 'Guided city tours',
              affiliate: 'getyourguide',
              emoji: '🗺️'
            },
            {
              type: 'food',
              label: 'Fine dining restaurants',
              affiliate: 'makemytrip',
              emoji: '🍽️'
            }
          ]
        },
        {
          day: 3,
          title: 'Shopping & Departure',
          emoji: '🛍️',
          description: 'Markets, malls, and final souvenir shopping',
          places: ['Khan Market', 'Connaught Place', 'Sarojini Nagar'],
          activities: ['Shopping', 'Cafe hopping', 'Packing'],
          ctas: [
            {
              type: 'essential',
              label: 'Indian crafts & souvenirs',
              affiliate: 'flipkart',
              emoji: '🎁'
            }
          ]
        }
      ],
      bestTime: 'October to March',
      budget: '₹12,000 - ₹20,000 per person'
    }
  },

  mumbai: {
    '3': {
      destination: 'Mumbai',
      destinationEmoji: '🌃',
      days: 3,
      title: '3-Day Mumbai City Guide',
      description: 'Gateway to India, beaches, and Bollywood',
      itinerary: [
        {
          day: 1,
          title: 'Gateway & Marine Drive',
          emoji: '🌉',
          description: 'Iconic monuments and coastal walks',
          places: ['Gateway of India', 'Marine Drive', 'Colaba Causeway'],
          activities: ['Photography', 'Harbor cruise', 'Shopping'],
          ctas: [
            {
              type: 'hotel',
              label: 'Hotels near Gateway',
              affiliate: 'agoda',
              emoji: '🏨'
            }
          ]
        },
        {
          day: 2,
          title: 'Bollywood & Culture',
          emoji: '🎬',
          description: 'Film industry tours, museums, galleries',
          places: ['Film City tour', 'Mani Bhawan', 'Art galleries'],
          activities: ['Studio visit', 'Museum tour', 'Art exploration'],
          ctas: [
            {
              type: 'activity',
              label: 'Bollywood studio tours',
              affiliate: 'getyourguide',
              emoji: '🎥'
            }
          ]
        },
        {
          day: 3,
          title: 'Beaches & Markets',
          emoji: '🏖️',
          description: 'Chowpatty Beach and street shopping',
          places: ['Chowpatty Beach', 'Bandra promenade', 'Markets'],
          activities: ['Beach time', 'Street food', 'Shopping'],
          ctas: [
            {
              type: 'food',
              label: 'Street food tours',
              affiliate: 'makemytrip',
              emoji: '🍢'
            }
          ]
        }
      ],
      bestTime: 'November to February',
      budget: '₹15,000 - ₹25,000 per person'
    }
  },

  bangalore: {
    '3': {
      destination: 'Bangalore',
      destinationEmoji: '🌳',
      days: 3,
      title: '3-Day Bangalore Tech & Gardens',
      description: 'IT hub, gardens, and coffee culture',
      itinerary: [
        {
          day: 1,
          title: 'Gardens & Parks',
          emoji: '🌺',
          description: 'Lalbagh, Cubbon Park, and botanical gardens',
          places: ['Lalbagh Gardens', 'Cubbon Park', 'Vidhana Soudha'],
          activities: ['Garden walks', 'Photography', 'Picnics'],
          ctas: [
            {
              type: 'hotel',
              label: 'Hotels in MG Road area',
              affiliate: 'agoda',
              emoji: '🏨'
            }
          ]
        },
        {
          day: 2,
          title: 'Tech & Art Scene',
          emoji: '🎨',
          description: 'Tech parks, galleries, and street art',
          places: ['Whitefield IT parks', 'Art galleries', 'Street art zones'],
          activities: ['Tech tours', 'Gallery visits', 'Cafe hopping'],
          ctas: [
            {
              type: 'food',
              label: 'Coffee & cafe tours',
              affiliate: 'makemytrip',
              emoji: '☕'
            }
          ]
        },
        {
          day: 3,
          title: 'Shopping & Night Life',
          emoji: '🌃',
          description: 'Markets, malls, and dining',
          places: ['Commercial Street', 'Brigade Road', 'UB City'],
          activities: ['Shopping', 'Dining', 'Nightlife'],
          ctas: [
            {
              type: 'essential',
              label: 'Tech gadgets & electronics',
              affiliate: 'flipkart',
              emoji: '💻'
            }
          ]
        }
      ],
      bestTime: 'September to May',
      budget: '₹12,000 - ₹22,000 per person'
    }
  },

  jaipur: {
    '3': {
      destination: 'Jaipur',
      destinationEmoji: '🏰',
      days: 3,
      title: '3-Day Jaipur Pink City Tour',
      description: 'Forts, palaces, and Rajasthani culture',
      itinerary: [
        {
          day: 1,
          title: 'City Palace & Hawa Mahal',
          emoji: '🏛️',
          description: 'Iconic pink city landmarks and architecture',
          places: ['City Palace', 'Hawa Mahal', 'Jantar Mantar'],
          activities: ['Palace tours', 'Photography', 'Street exploration'],
          ctas: [
            {
              type: 'hotel',
              label: 'Heritage hotels in Jaipur',
              affiliate: 'agoda',
              emoji: '🏨'
            }
          ]
        },
        {
          day: 2,
          title: 'Amber Fort & Temples',
          emoji: '🏰',
          description: 'Magnificent fort with panoramic views',
          places: ['Amber Fort', 'Sheesh Mahal', 'Temple complexes'],
          activities: ['Fort exploration', 'Elephant rides', 'Sunset views'],
          ctas: [
            {
              type: 'activity',
              label: 'Fort & palace tours',
              affiliate: 'getyourguide',
              emoji: '🗺️'
            }
          ]
        },
        {
          day: 3,
          title: 'Shopping & Crafts',
          emoji: '🛍️',
          description: 'Traditional Rajasthani crafts and shopping',
          places: ['Johari Bazaar', 'Bapu Bazaar', 'Textile markets'],
          activities: ['Shopping', 'Textile workshops', 'Souvenirs'],
          ctas: [
            {
              type: 'essential',
              label: 'Rajasthani textiles & crafts',
              affiliate: 'flipkart',
              emoji: '🧵'
            }
          ]
        }
      ],
      bestTime: 'October to March',
      budget: '₹10,000 - ₹18,000 per person'
    }
  },

  manali: {
    '3': {
      destination: 'Manali',
      destinationEmoji: '🏔️',
      days: 3,
      title: '3-Day Manali Mountain Adventure',
      description: 'Himalayas, trekking, and adventure sports',
      itinerary: [
        {
          day: 1,
          title: 'Arrival & Old Manali',
          emoji: '🌄',
          description: 'Settle in and explore charming old town',
          places: ['Old Manali', 'Manu Temple', 'Tibetan Monastery'],
          activities: ['Walks', 'Cafes', 'Local culture'],
          ctas: [
            {
              type: 'hotel',
              label: 'Mountain resorts & hotels',
              affiliate: 'agoda',
              emoji: '🏨'
            }
          ]
        },
        {
          day: 2,
          title: 'Adventure Activities',
          emoji: '🧗',
          description: 'Paragliding, rock climbing, river activities',
          places: ['Solang Valley', 'Bhrigu Lake', 'Atal Tunnel'],
          activities: ['Paragliding', 'Trekking', 'Rock climbing', 'River sports'],
          ctas: [
            {
              type: 'activity',
              label: 'Adventure activities & tours',
              affiliate: 'getyourguide',
              emoji: '🎿'
            }
          ]
        },
        {
          day: 3,
          title: 'Nature & Relaxation',
          emoji: '🌲',
          description: 'Scenic drives and nature walks',
          places: ['Rotang Pass', 'Vashisht Temples', 'Hot springs'],
          activities: ['Scenic drives', 'Nature walks', 'Relaxation'],
          ctas: [
            {
              type: 'essential',
              label: 'Mountain gear & clothing',
              affiliate: 'amazon',
              emoji: '🎒'
            }
          ]
        }
      ],
      bestTime: 'March to June, September to November',
      budget: '₹14,000 - ₹24,000 per person'
    },
    '5': {
      destination: 'Manali',
      destinationEmoji: '🏔️',
      days: 5,
      title: '5-Day Manali Himalayan Explorer',
      description: 'Deep trekking, remote villages, and mountain culture',
      itinerary: [
        {
          day: 1,
          title: 'Arrival & Acclimatization',
          emoji: '🌄',
          description: 'Settle in and explore surroundings',
          places: ['Old Manali', 'Hadimba Temple', 'Manu Temple'],
          activities: ['Light walks', 'Rest', 'Local exploration'],
          ctas: [
            {
              type: 'hotel',
              label: 'Manali mountain stays',
              affiliate: 'agoda',
              emoji: '🏨'
            }
          ]
        },
        {
          day: 2,
          title: 'High Mountain Trek',
          emoji: '🥾',
          description: 'Trek to alpine meadows and mountain views',
          places: ['Bhrigu Lake', 'High altitude meadows', 'Mountain peaks'],
          activities: ['Trekking', 'Photography', 'Nature watching'],
          ctas: [
            {
              type: 'activity',
              label: 'Guided mountain treks',
              affiliate: 'getyourguide',
              emoji: '🥾'
            }
          ]
        },
        {
          day: 3,
          title: 'Adventure Sports',
          emoji: '🪂',
          description: 'Paragliding and extreme sports',
          places: ['Solang Valley', 'Auli glacier', 'Adventure sites'],
          activities: ['Paragliding', 'Skiing', 'Rock climbing'],
          ctas: [
            {
              type: 'activity',
              label: 'Extreme sports packages',
              affiliate: 'getyourguide',
              emoji: '🪂'
            }
          ]
        },
        {
          day: 4,
          title: 'Villages & Scenic Drives',
          emoji: '🚗',
          description: 'Remote villages and mountain roads',
          places: ['Naggar', 'Kasol', 'Manikaran hot springs'],
          activities: ['Scenic drive', 'Village visits', 'Hot spring baths'],
          ctas: [
            {
              type: 'transport',
              label: 'Car rental & tours',
              affiliate: 'abhibus',
              emoji: '🚗'
            }
          ]
        },
        {
          day: 5,
          title: 'Relaxation & Departure',
          emoji: '🧘',
          description: 'Relax and prepare for departure',
          places: ['Vashisht Hot springs', 'Cafes', 'Shopping'],
          activities: ['Spa', 'Shopping', 'Rest'],
          ctas: [
            {
              type: 'essential',
              label: 'Mountain souvenirs',
              affiliate: 'flipkart',
              emoji: '🎁'
            }
          ]
        }
      ],
      bestTime: 'March to June, September to November',
      budget: '₹20,000 - ₹35,000 per person'
    }
  },

  agra: {
    '2': {
      destination: 'Agra',
      destinationEmoji: '🕌',
      days: 2,
      title: '2-Day Taj Mahal & Agra Fort',
      description: 'Experience the monuments of Mughal architecture',
      itinerary: [
        {
          day: 1,
          title: 'Taj Mahal & Mehtab Bagh',
          emoji: '💎',
          description: 'Visit iconic Taj Mahal and sunset point',
          places: ['Taj Mahal', 'Mehtab Bagh', 'Yamuna River'],
          activities: ['Monument tour', 'Photography', 'Sunset viewing'],
          ctas: [
            {
              type: 'hotel',
              label: 'Hotels near Taj Mahal',
              affiliate: 'agoda',
              emoji: '🏨'
            }
          ]
        },
        {
          day: 2,
          title: 'Agra Fort & Departure',
          emoji: '🏰',
          description: 'Explore red fort and plan departure',
          places: ['Agra Fort', 'Itimad-ud-Daulah', 'Markets'],
          activities: ['Fort tour', 'Shopping', 'Travel'],
          ctas: [
            {
              type: 'transport',
              label: 'Train & bus bookings',
              affiliate: 'abhibus',
              emoji: '🚂'
            }
          ]
        }
      ],
      bestTime: 'October to March',
      budget: '₹8,000 - ₹15,000 per person'
    }
  },

  rishikesh: {
    '3': {
      destination: 'Rishikesh',
      destinationEmoji: '🧘',
      days: 3,
      title: '3-Day Yoga & Spirituality',
      description: 'Yoga capital, temples, and Ganges adventure',
      itinerary: [
        {
          day: 1,
          title: 'Temples & Meditation',
          emoji: '🕉️',
          description: 'Visit ashrams and practice yoga',
          places: ['Neelkanth Mahadev Temple', 'Yoga studios', 'Ghats'],
          activities: ['Yoga', 'Meditation', 'Temple visits'],
          ctas: [
            {
              type: 'hotel',
              label: 'Ashrams & yoga retreat stays',
              affiliate: 'agoda',
              emoji: '🏡'
            }
          ]
        },
        {
          day: 2,
          title: 'Rafting & Adventure',
          emoji: '🏞️',
          description: 'White water rafting on Ganges',
          places: ['Ganges River', 'Rafting spots', 'Nature trails'],
          activities: ['Rafting', 'Trekking', 'Nature walks'],
          ctas: [
            {
              type: 'activity',
              label: 'Rafting & adventure sports',
              affiliate: 'getyourguide',
              emoji: '🚣'
            }
          ]
        },
        {
          day: 3,
          title: 'Relaxation & Departure',
          emoji: '🌅',
          description: 'Sunrise session and travel',
          places: ['Ganges banks', 'Cafes', 'Ashrams'],
          activities: ['Yoga', 'Breakfast', 'Travel'],
          ctas: [
            {
              type: 'food',
              label: 'Healthy cafes & vegetarian food',
              affiliate: 'makemytrip',
              emoji: '🥗'
            }
          ]
        }
      ],
      bestTime: 'October to March',
      budget: '₹8,000 - ₹15,000 per person'
    }
  },

  udaipur: {
    '3': {
      destination: 'Udaipur',
      destinationEmoji: '🏛️',
      days: 3,
      title: '3-Day Udaipur Palace Tour',
      description: 'Palaces, lakes, and romantic Rajasthan',
      itinerary: [
        {
          day: 1,
          title: 'City Palace & Lake Pichola',
          emoji: '🏰',
          description: 'Magnificent palace and sunset cruise',
          places: ['City Palace', 'Lake Pichola', 'Jagdish Temple'],
          activities: ['Palace tour', 'Lake cruise', 'Sunset'],
          ctas: [
            {
              type: 'hotel',
              label: 'Lakeside palaces & hotels',
              affiliate: 'agoda',
              emoji: '🏨'
            }
          ]
        },
        {
          day: 2,
          title: 'Havelis & Markets',
          emoji: '🏠',
          description: 'Historic havelis and shopping',
          places: ['Bagore Ki Haveli', 'Nath Dwara Temple', 'Markets'],
          activities: ['Haveli tours', 'Shopping', 'Folk performances'],
          ctas: [
            {
              type: 'essential',
              label: 'Rajasthani crafts & textiles',
              affiliate: 'flipkart',
              emoji: '🧵'
            }
          ]
        },
        {
          day: 3,
          title: 'Nature & Departure',
          emoji: '🌿',
          description: 'Monsoon Palace and travel',
          places: ['Monsoon Palace', 'Saheliyon Ki Bari', 'Departure'],
          activities: ['Palace views', 'Garden walk', 'Shopping'],
          ctas: [
            {
              type: 'transport',
              label: 'Bus & train bookings',
              affiliate: 'abhibus',
              emoji: '🚌'
            }
          ]
        }
      ],
      bestTime: 'September to May',
      budget: '₹12,000 - ₹22,000 per person'
    }
  },

  kochi: {
    '3': {
      destination: 'Kochi',
      destinationEmoji: '🌊',
      days: 3,
      title: '3-Day Kochi Backwater Escape',
      description: 'Backwaters, beaches, and Kerala spice',
      itinerary: [
        {
          day: 1,
          title: 'Chinese Nets & Fort Kochi',
          emoji: '🎣',
          description: 'Historic port and fishing nets',
          places: ['Chinese Fishing Nets', 'Fort Kochi', 'Dutch Palace'],
          activities: ['Fishing net tours', 'Walking', 'Photography'],
          ctas: [
            {
              type: 'hotel',
              label: 'Heritage hotels in Kochi',
              affiliate: 'agoda',
              emoji: '🏨'
            }
          ]
        },
        {
          day: 2,
          title: 'Backwater Cruise',
          emoji: '🚤',
          description: 'Houseboat cruise through backwaters',
          places: ['Backwaters', 'Palm trees', 'Villages'],
          activities: ['Houseboat cruise', 'Swimming', 'Fishing'],
          ctas: [
            {
              type: 'activity',
              label: 'Houseboat & backwater tours',
              affiliate: 'getyourguide',
              emoji: '⛵'
            }
          ]
        },
        {
          day: 3,
          title: 'Beaches & Spice Markets',
          emoji: '🌴',
          description: 'Beaches and spice shopping',
          places: ['Cherai Beach', 'Spice markets', 'Shopping'],
          activities: ['Beach time', 'Spice shopping', 'Cooking classes'],
          ctas: [
            {
              type: 'essential',
              label: 'Spices & Kerala products',
              affiliate: 'amazon',
              emoji: '🌶️'
            }
          ]
        }
      ],
      bestTime: 'July to October',
      budget: '₹14,000 - ₹24,000 per person'
    }
  },

  jodhpur: {
    '2': {
      destination: 'Jodhpur',
      destinationEmoji: '💙',
      days: 2,
      title: '2-Day Blue City Adventure',
      description: 'Historic blue city, forts, and desert',
      itinerary: [
        {
          day: 1,
          title: 'Mehrangarh Fort',
          emoji: '🏰',
          description: 'Massive hilltop fort with views',
          places: ['Mehrangarh Fort', 'Blue City', 'Clock Tower'],
          activities: ['Fort tour', 'City walks', 'Photography'],
          ctas: [
            {
              type: 'hotel',
              label: 'Fort view hotels',
              affiliate: 'agoda',
              emoji: '🏨'
            }
          ]
        },
        {
          day: 2,
          title: 'Umaid Bhawan Palace & Departure',
          emoji: '👑',
          description: 'Palace tour and travel',
          places: ['Umaid Bhawan Palace', 'Mandore Gardens'],
          activities: ['Palace tour', 'Camel rides', 'Shopping'],
          ctas: [
            {
              type: 'transport',
              label: 'Flight & bus bookings',
              affiliate: 'abhibus',
              emoji: '✈️'
            }
          ]
        }
      ],
      bestTime: 'October to March',
      budget: '₹10,000 - ₹18,000 per person'
    }
  },

  varanasi: {
    '3': {
      destination: 'Varanasi',
      destinationEmoji: '🕉️',
      days: 3,
      title: '3-Day Spiritual Varanasi',
      description: 'Holiest city, Ganges rituals, and culture',
      itinerary: [
        {
          day: 1,
          title: 'Ganges & Temples',
          emoji: '⛩️',
          description: 'Sunrise boat ride and temple visits',
          places: ['Ganges ghats', 'Kashi Vishwanath Temple', 'Temples'],
          activities: ['Boat ride', 'Yoga', 'Temple tours'],
          ctas: [
            {
              type: 'hotel',
              label: 'Ghat-view hotels',
              affiliate: 'agoda',
              emoji: '🏨'
            }
          ]
        },
        {
          day: 2,
          title: 'Spiritual Immersion',
          emoji: '🙏',
          description: 'Rituals, meditation, ceremonies',
          places: ['Rituals at ghats', 'Meditation centers', 'Silk markets'],
          activities: ['Rituals', 'Meditation', 'Shopping'],
          ctas: [
            {
              type: 'activity',
              label: 'Spiritual tours & yoga',
              affiliate: 'getyourguide',
              emoji: '🧘'
            }
          ]
        },
        {
          day: 3,
          title: 'Silk & Departure',
          emoji: '🧵',
          description: 'Shopping and travel',
          places: ['Silk weavers', 'Markets', 'Departure'],
          activities: ['Silk shopping', 'Cafes', 'Travel'],
          ctas: [
            {
              type: 'essential',
              label: 'Silk & textiles',
              affiliate: 'flipkart',
              emoji: '🎀'
            }
          ]
        }
      ],
      bestTime: 'October to March',
      budget: '₹10,000 - ₹18,000 per person'
    }
  },

  mysore: {
    '2': {
      destination: 'Mysore',
      destinationEmoji: '👑',
      days: 2,
      title: '2-Day Palace & Gardens',
      description: 'Royal palace, gardens, and culture',
      itinerary: [
        {
          day: 1,
          title: 'Mysore Palace',
          emoji: '🏛️',
          description: 'Magnificent royal palace',
          places: ['Mysore Palace', 'Brindavan Gardens', 'St. Philomena Church'],
          activities: ['Palace tour', 'Garden walks', 'Photography'],
          ctas: [
            {
              type: 'hotel',
              label: 'Palace area hotels',
              affiliate: 'agoda',
              emoji: '🏨'
            }
          ]
        },
        {
          day: 2,
          title: 'Chamundi Hills & Markets',
          emoji: '⛩️',
          description: 'Temple views and shopping',
          places: ['Chamundi Temple', 'Markets', 'Shopping'],
          activities: ['Temple visit', 'Shopping', 'Local food'],
          ctas: [
            {
              type: 'essential',
              label: 'Silk & sandalwood',
              affiliate: 'amazon',
              emoji: '🎀'
            }
          ]
        }
      ],
      bestTime: 'September to May',
      budget: '₹8,000 - ₹15,000 per person'
    }
  },

  pushkar: {
    '2': {
      destination: 'Pushkar',
      destinationEmoji: '🎪',
      days: 2,
      title: '2-Day Camel Fair & Temples',
      description: 'Famous camel fair and sacred lake',
      itinerary: [
        {
          day: 1,
          title: 'Camel Fair',
          emoji: '🐫',
          description: 'Livestock market and camel rides',
          places: ['Camel fair ground', 'Camel races', 'Shopping'],
          activities: ['Camel rides', 'Shopping', 'Photography'],
          ctas: [
            {
              type: 'hotel',
              label: 'Fair area camps & hotels',
              affiliate: 'agoda',
              emoji: '⛺'
            }
          ]
        },
        {
          day: 2,
          title: 'Sacred Lake & Temples',
          emoji: '🕉️',
          description: 'Temple visits and departure',
          places: ['Pushkar Lake', 'Temples', 'Markets'],
          activities: ['Temple visits', 'Sacred dips', 'Shopping'],
          ctas: [
            {
              type: 'transport',
              label: 'Bus bookings',
              affiliate: 'abhibus',
              emoji: '🚌'
            }
          ]
        }
      ],
      bestTime: 'October to November',
      budget: '₹10,000 - ₹18,000 per person'
    }
  },

  shimla: {
    '3': {
      destination: 'Shimla',
      destinationEmoji: '❄️',
      days: 3,
      title: '3-Day Shimla Hill Station',
      description: 'Mountains, markets, and adventure',
      itinerary: [
        {
          day: 1,
          title: 'Arrival & Mall Road',
          emoji: '🛍️',
          description: 'Settle in and explore main bazaar',
          places: ['Mall Road', 'Ridge', 'Christ Church'],
          activities: ['Shopping', 'Walking', 'Photography'],
          ctas: [
            {
              type: 'hotel',
              label: 'Hill station hotels',
              affiliate: 'agoda',
              emoji: '🏨'
            }
          ]
        },
        {
          day: 2,
          title: 'Scenic Walks & Views',
          emoji: '🥾',
          description: 'Nature walks and mountain views',
          places: ['Jakhoo Temple', 'Summer Hill', 'Wildflower Hall'],
          activities: ['Hiking', 'Photography', 'Nature walks'],
          ctas: [
            {
              type: 'activity',
              label: 'Trekking & hiking tours',
              affiliate: 'getyourguide',
              emoji: '🥾'
            }
          ]
        },
        {
          day: 3,
          title: 'Adventure & Departure',
          emoji: '🎿',
          description: 'Activities and travel',
          places: ['Adventure sites', 'Toy train', 'Shopping'],
          activities: ['Toy train ride', 'Shopping', 'Travel'],
          ctas: [
            {
              type: 'essential',
              label: 'Woolens & mountain gear',
              affiliate: 'amazon',
              emoji: '🧥'
            }
          ]
        }
      ],
      bestTime: 'March to June, September to November',
      budget: '₹12,000 - ₹22,000 per person'
    }
  },

  darjeeling: {
    '3': {
      destination: 'Darjeeling',
      destinationEmoji: '🍵',
      days: 3,
      title: '3-Day Darjeeling Tea Country',
      description: 'Tea plantations, mountain views, Himalayas',
      itinerary: [
        {
          day: 1,
          title: 'Sunrise & Tiger Hill',
          emoji: '🌅',
          description: 'Sunrise view and Kanchenjunga',
          places: ['Tiger Hill', 'Batasia Loop', 'Tea gardens'],
          activities: ['Sunrise viewing', 'Photography', 'Nature walks'],
          ctas: [
            {
              type: 'hotel',
              label: 'Tea estate hotels',
              affiliate: 'agoda',
              emoji: '🏨'
            }
          ]
        },
        {
          day: 2,
          title: 'Tea Plantations & Toys',
          emoji: '🚂',
          description: 'Tea factory tours and toy train ride',
          places: ['Tea estates', 'Toy train', 'Ropeway'],
          activities: ['Tea tasting', 'Toy train', 'Ropeway ride'],
          ctas: [
            {
              type: 'activity',
              label: 'Tea & mountain tours',
              affiliate: 'getyourguide',
              emoji: '🍵'
            }
          ]
        },
        {
          day: 3,
          title: 'Markets & Departure',
          emoji: '🎒',
          description: 'Shopping and travel',
          places: ['Markets', 'Tenzing Hillary Sherpa Park'],
          activities: ['Shopping', 'Museum', 'Travel'],
          ctas: [
            {
              type: 'essential',
              label: 'Tea & woolen products',
              affiliate: 'amazon',
              emoji: '🧶'
            }
          ]
        }
      ],
      bestTime: 'March to June, September to November',
      budget: '₹12,000 - ₹22,000 per person'
    }
  },

  guwahati: {
    '2': {
      destination: 'Guwahati',
      destinationEmoji: '🕉️',
      days: 2,
      title: '2-Day Assam Gateway',
      description: 'Temples, river, and Brahmaputra',
      itinerary: [
        {
          day: 1,
          title: 'Kamakhya Temple & Brahmaputra',
          emoji: '⛩️',
          description: 'Sacred temple and river views',
          places: ['Kamakhya Temple', 'Brahmaputra River', 'Umananda Temple'],
          activities: ['Temple tour', 'River cruise', 'Photography'],
          ctas: [
            {
              type: 'hotel',
              label: 'Riverside hotels',
              affiliate: 'agoda',
              emoji: '🏨'
            }
          ]
        },
        {
          day: 2,
          title: 'Wildlife & Departure',
          emoji: '🦁',
          description: 'Wildlife sanctuary and travel',
          places: ['Wildlife tours', 'Markets', 'Departure'],
          activities: ['Wildlife watching', 'Shopping', 'Travel'],
          ctas: [
            {
              type: 'activity',
              label: 'Wildlife tours',
              affiliate: 'getyourguide',
              emoji: '🦣'
            }
          ]
        }
      ],
      bestTime: 'October to March',
      budget: '₹8,000 - ₹15,000 per person'
    }
  },

  leh: {
    '4': {
      destination: 'Leh',
      destinationEmoji: '🏔️',
      days: 4,
      title: '4-Day Leh Ladakh Explorer',
      description: 'High altitude monasteries and moonscape',
      itinerary: [
        {
          day: 1,
          title: 'Arrival & Acclimatization',
          emoji: '✈️',
          description: 'Settle in at high altitude',
          places: ['Leh town', 'Shanti Stupa', 'Markets'],
          activities: ['Rest', 'Light walks', 'Exploration'],
          ctas: [
            {
              type: 'hotel',
              label: 'Leh guesthouses',
              affiliate: 'agoda',
              emoji: '🏨'
            }
          ]
        },
        {
          day: 2,
          title: 'Monasteries',
          emoji: '⛩️',
          description: 'Hemis and Thiksey monasteries',
          places: ['Hemis Monastery', 'Thiksey Monastery', 'Indus Valley'],
          activities: ['Monastery tours', 'Photography', 'Cultural visits'],
          ctas: [
            {
              type: 'activity',
              label: 'Monastery & culture tours',
              affiliate: 'getyourguide',
              emoji: '🏛️'
            }
          ]
        },
        {
          day: 3,
          title: 'High Altitude Passes',
          emoji: '🗻',
          description: 'Drives to high passes',
          places: ['Khardung La', 'Pangong Lake', 'Nubra Valley'],
          activities: ['Scenic drives', 'Photography', 'Nature'],
          ctas: [
            {
              type: 'transport',
              label: 'Adventure vehicle rentals',
              affiliate: 'abhibus',
              emoji: '🚗'
            }
          ]
        },
        {
          day: 4,
          title: 'Markets & Departure',
          emoji: '🎒',
          description: 'Shopping and travel',
          places: ['Local markets', 'Bazaar', 'Departure'],
          activities: ['Shopping', 'Souvenirs', 'Travel'],
          ctas: [
            {
              type: 'essential',
              label: 'Mountain gear & souvenirs',
              affiliate: 'amazon',
              emoji: '🧥'
            }
          ]
        }
      ],
      bestTime: 'May to September',
      budget: '₹18,000 - ₹30,000 per person'
    }
  }
};

/**
 * Smart mapping of destination types and states to cities with itinerary data
 * Uses MongoDB destination data to intelligently map any destination to an available itinerary
 */
const CITY_ITINERARY_KEYS = ['goa', 'delhi', 'mumbai', 'bangalore', 'jaipur', 'manali', 'agra', 'rishikesh', 'udaipur', 'kochi', 'jodhpur', 'varanasi', 'mysore', 'pushkar', 'shimla', 'darjeeling', 'guwahati', 'leh'];

const TYPE_TO_CITY_MAP: Record<string, string> = {
  'beach': 'goa',           // Beach destinations → Goa (most popular beach)
  'island': 'kochi',        // Island destinations → Kochi (coastal city)
  'hill': 'manali',         // Hill destinations → Manali (popular hill station)
  'heritage': 'jaipur',     // Heritage destinations → Jaipur (heritage hub)
  'city': 'delhi',          // City destinations → Delhi (major city)
  'spiritual': 'varanasi',  // Spiritual destinations → Varanasi (spiritual hub)
  'adventure': 'leh',       // Adventure destinations → Leh (adventure hub)
  'wildlife': 'kochi'       // Wildlife destinations → Kochi (coastal wildlife)
};

const STATE_TO_CITY_MAP: Record<string, string> = {
  'karnataka': 'bangalore',
  'goa': 'goa',
  'delhi': 'delhi',
  'maharashtra': 'mumbai',
  'rajasthan': 'jaipur',
  'himachal pradesh': 'manali',
  'uttar pradesh': 'agra',
  'uttarakhand': 'rishikesh',
  'kerala': 'kochi',
  'andaman & nicobar': 'kochi',
  'puducherry': 'kochi',
  'tamil nadu': 'bangalore',
  'west bengal': 'darjeeling',
  'sikkim': 'darjeeling',
  'meghalaya': 'darjeeling',
  'ladakh': 'leh',
  'jammu & kashmir': 'leh',
  'punjab': 'delhi',
  'assam': 'darjeeling',
  'madhya pradesh': 'jaipur',
  'telangana': 'bangalore'
};

/**
 * Get itinerary for a destination and duration
 * Intelligently maps destinations to available city itineraries based on type and state
 */
export function getItinerary(destination: string, days: number, destinationData?: any) {
  const dest = destination.toLowerCase().trim();
  const daysStr = String(days);
  
  console.log(`\n🗺️ [ITINERARY MAPPING] ================================`);
  console.log(`🗺️ [Mapping] Destination: "${destination}" (${dest})`);
  console.log(`🗺️ [Mapping] Days: ${days}`);
  
  if (destinationData) {
    console.log(`🗺️ [Mapping] Destination Data Available:`);
    console.log(`   Name: ${destinationData.name}`);
    console.log(`   Type: ${destinationData.type}`);
    console.log(`   State: ${destinationData.state}`);
  } else {
    console.log(`⚠️ [Mapping] No destination data provided`);
  }
  
  // Try direct match first (for major cities like Goa, Delhi, etc.)
  console.log(`\n  Step 1: Try direct match "${dest}"`);
  if (SAMPLE_ITINERARIES[dest] && SAMPLE_ITINERARIES[dest][daysStr]) {
    console.log(`  ✅ FOUND: Direct match for ${dest}[${daysStr}]`);
    return SAMPLE_ITINERARIES[dest][daysStr];
  } else {
    console.log(`  ❌ Not found: ${dest} has no ${daysStr}-day itinerary`);
  }
  
  // If destination data provided, use it for smart mapping
  if (destinationData) {
    const destType = destinationData.type?.toLowerCase();
    const destState = destinationData.state?.toLowerCase();
    
    // Try type-based mapping first
    console.log(`\n  Step 2: Try TYPE mapping (${destType})`);
    if (destType && TYPE_TO_CITY_MAP[destType]) {
      const mappedCity = TYPE_TO_CITY_MAP[destType];
      console.log(`  🔍 TYPE_TO_CITY_MAP["${destType}"] = "${mappedCity}"`);
      
      if (SAMPLE_ITINERARIES[mappedCity] && SAMPLE_ITINERARIES[mappedCity][daysStr]) {
        console.log(`  ✅ FOUND: Mapped to ${mappedCity}[${daysStr}]`);
        console.log(`✅ [ITINERARY] Loading: ${SAMPLE_ITINERARIES[mappedCity][daysStr].title}`);
        return SAMPLE_ITINERARIES[mappedCity][daysStr];
      } else {
        console.log(`  ❌ Mapped city "${mappedCity}" has no ${daysStr}-day itinerary`);
      }
    } else {
      console.log(`  ❌ Type "${destType}" not in TYPE_TO_CITY_MAP`);
    }
    
    // Try state-based mapping
    console.log(`\n  Step 3: Try STATE mapping (${destState})`);
    if (destState && STATE_TO_CITY_MAP[destState]) {
      const mappedCity = STATE_TO_CITY_MAP[destState];
      console.log(`  🔍 STATE_TO_CITY_MAP["${destState}"] = "${mappedCity}"`);
      
      if (SAMPLE_ITINERARIES[mappedCity] && SAMPLE_ITINERARIES[mappedCity][daysStr]) {
        console.log(`  ✅ FOUND: Mapped to ${mappedCity}[${daysStr}]`);
        console.log(`✅ [ITINERARY] Loading: ${SAMPLE_ITINERARIES[mappedCity][daysStr].title}`);
        return SAMPLE_ITINERARIES[mappedCity][daysStr];
      } else {
        console.log(`  ❌ Mapped city "${mappedCity}" has no ${daysStr}-day itinerary`);
      }
    } else {
      console.log(`  ❌ State "${destState}" not in STATE_TO_CITY_MAP`);
    }
  }
  
  // Fallback: Try state mapping by looking up state from destination name
  console.log(`\n  Step 4: Try STATE lookup by destination name`);
  const mappedCity = STATE_TO_CITY_MAP[dest];
  if (mappedCity) {
    console.log(`  🔍 STATE_TO_CITY_MAP["${dest}"] = "${mappedCity}"`);
    if (SAMPLE_ITINERARIES[mappedCity] && SAMPLE_ITINERARIES[mappedCity][daysStr]) {
      console.log(`  ✅ FOUND: Mapped to ${mappedCity}[${daysStr}]`);
      console.log(`✅ [ITINERARY] Loading: ${SAMPLE_ITINERARIES[mappedCity][daysStr].title}`);
      return SAMPLE_ITINERARIES[mappedCity][daysStr];
    } else {
      console.log(`  ❌ Mapped city "${mappedCity}" has no ${daysStr}-day itinerary`);
    }
  } else {
    console.log(`  ❌ Destination "${dest}" not in STATE_TO_CITY_MAP`);
  }
  
  // If specific days duration not available, try default (3 days)
  console.log(`\n  Step 5: Try to fallback to 3-day itinerary`);
  if (SAMPLE_ITINERARIES[dest] && SAMPLE_ITINERARIES[dest]['3']) {
    console.log(`  ✅ FOUND: ${dest} has 3-day itinerary (fallback from ${daysStr} days)`);
    console.log(`⚠️ [ITINERARY] Loading 3-day instead of ${daysStr}-day: ${SAMPLE_ITINERARIES[dest]['3'].title}`);
    return SAMPLE_ITINERARIES[dest]['3'];
  }
  
  if (mappedCity && SAMPLE_ITINERARIES[mappedCity] && SAMPLE_ITINERARIES[mappedCity]['3']) {
    console.log(`  ✅ FOUND: Mapped city "${mappedCity}" has 3-day itinerary (fallback from ${daysStr} days)`);
    console.log(`⚠️ [ITINERARY] Loading 3-day instead of ${daysStr}-day: ${SAMPLE_ITINERARIES[mappedCity]['3'].title}`);
    return SAMPLE_ITINERARIES[mappedCity]['3'];
  }
  
  // Last resort: return first available destination (should not happen in production)
  console.log(`\n  Step 6: Emergency fallback to first available`);
  const firstKey = Object.keys(SAMPLE_ITINERARIES)[0];
  if (firstKey) {
    const firstDuration = Object.keys(SAMPLE_ITINERARIES[firstKey])[0];
    if (firstDuration) {
      console.error(`❌ [ITINERARY] No itinerary found for "${destination}" with ${days} days. Using emergency fallback: ${SAMPLE_ITINERARIES[firstKey][firstDuration].title}`);
      return SAMPLE_ITINERARIES[firstKey][firstDuration];
    }
  }
  
  console.error(`❌ [ITINERARY] CRITICAL: No itinerary available at all!`);
  return null;
}

/**
 * Get all available destinations
 */
export function getAvailableDestinations() {
  return Object.keys(SAMPLE_ITINERARIES).map(dest => ({
    name: dest.charAt(0).toUpperCase() + dest.slice(1),
    value: dest
  }));
}

/**
 * Get available durations for a destination
 */
export function getAvailableDurations(destination: string): number[] {
  const dest = destination.toLowerCase().trim();
  
  // Try direct match first
  if (SAMPLE_ITINERARIES[dest]) {
    return Object.keys(SAMPLE_ITINERARIES[dest])
      .map(d => parseInt(d, 10))
      .sort((a, b) => a - b);
  }
  
  // Try fallback to state-to-city mapping
  const mappedCity = STATE_TO_CITY_MAP[dest];
  if (mappedCity && SAMPLE_ITINERARIES[mappedCity]) {
    return Object.keys(SAMPLE_ITINERARIES[mappedCity])
      .map(d => parseInt(d, 10))
      .sort((a, b) => a - b);
  }
  
  return [];}