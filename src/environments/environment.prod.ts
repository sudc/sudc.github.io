export const environment = {
  production: true
  // MongoDB disabled - credentials removed for security
  // Set via environment variables: MONGODB_PUBLIC_KEY, MONGODB_PRIVATE_KEY
  /*
  mongodb: {
    // MongoDB Atlas Connection String - SET VIA ENV ONLY
    connectionString: 'YOUR_CONNECTION_STRING_FROM_ENV',
    
    // MongoDB Data API Configuration - SET VIA ENV ONLY
    dataApiUrl: 'YOUR_DATA_API_URL_FROM_ENV',
    apiKey: 'YOUR_API_KEY_FROM_ENV',
    
    // Database configuration
    dataSource: 'Cluster0',
    database: 'tripsaver',
    
    // Collections
    collections: {
      destinations: 'destinations',
      trustBadges: 'trust_badges',
      trustMessages: 'trust_messages'
    }
  }
  */
};

