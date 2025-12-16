# MongoDB Setup & Troubleshooting Guide

## Current Configuration

```typescript
// src/app/core/services/mongodb/mongodb.service.ts
dataApiUrl: 'https://ap-south-1.aws.data.mongodb-api.com/app/gzggipjk/endpoint/data/v1'
apiKey: 'VFPCzeFPD5k38njwbVmpf2vXvwdlQsGpmNY7OTfeTwRE6wJWh9Ht0cpLjN18Cww8'
dataSource: 'Cluster0'
database: 'tripsaver'
collection: 'destinations'
```

---

## Troubleshooting Checklist

### 1. **Check MongoDB Data in Browser Console**

When the app loads:
1. Open **Developer Tools** (F12)
2. Go to **Console** tab
3. Look for:
   - ✅ `✅ MongoDB Response: { documents: [...] }` — **Good! Data is coming**
   - ❌ `❌ MongoDB Error Details:` — **Connection/Auth problem**
   - ⚠️ No MongoDB logs — **Timeout occurred**

### 2. **Common Error Messages & Fixes**

#### **Error: "Unauthorized" / "Invalid API Key"**
```
Status: 401
Message: Unauthorized
```
**Fix:**
- Verify API key is correct
- Regenerate API key in MongoDB Atlas Dashboard
- Update in `mongodb.service.ts`

#### **Error: "Not Found" / Collection doesn't exist**
```
Status: 404
Message: Collection not found
```
**Fix:**
- Check MongoDB Atlas → Database → Collections
- Ensure `destinations` collection exists
- If not, create it or import sample data

#### **Error: "CORS" / Blocked by browser**
```
Cross-Origin Request Blocked
```
**Fix:**
- MongoDB Data API already allows CORS
- If still blocked, add to CORS settings in MongoDB Atlas

#### **Error: "Timeout" / No response**
```
No logs after 5 seconds
```
**Fix:**
- Check MongoDB Atlas cluster status (might be paused)
- Check internet connectivity
- MongoDB API might be down (check status page)

---

## MongoDB Atlas Setup (If Not Done)

### Step 1: Create MongoDB Atlas Cluster
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Sign up / Log in
3. Create a cluster (free tier available)
4. Wait for cluster to be ready (~10 min)

### Step 2: Create Database & Collection
1. Click **Collections** in sidebar
2. Create new database: `tripsaver`
3. Create new collection: `destinations`

### Step 3: Insert Sample Data
```json
{
  "_id": "goa",
  "state": "Goa",
  "categories": ["Beach", "Party"],
  "bestMonths": [11, 12, 1, 2],
  "avoidMonths": [6, 7, 8],
  "climate": "tropical",
  "budget": "moderate",
  "agoda": "goa-in"
}
```

### Step 4: Enable Data API
1. In MongoDB Atlas, go to **Data API** → **Enable**
2. Create an API Key
3. Note the App ID and API Key

### Step 5: Update mongodb.service.ts
```typescript
private readonly CONFIG = {
  dataApiUrl: 'https://YOUR_REGION.aws.data.mongodb-api.com/app/YOUR_APP_ID/endpoint/data/v1',
  apiKey: 'YOUR_API_KEY',
  dataSource: 'Cluster0',
  database: 'tripsaver'
};
```

---

## Current Implementation

### Fallback Mechanism (Already Active)

```typescript
// Component automatically uses fallback if:
// 1. MongoDB returns empty array
// 2. MongoDB times out after 5 seconds
// 3. Any network error occurs

// Fallback uses static data from:
// src/app/core/engines/destination/destinations.data.ts
```

### Testing Without MongoDB

If you want to skip MongoDB entirely and use static data:

**Option 1: Set timeout to 1 second (force fallback immediately)**
```typescript
// In smart-recommendations.component.ts
setTimeout(() => reject(new Error('Force fallback')), 1000)
```

**Option 2: Disable MongoDB calls in DestinationScoringEngine**
```typescript
// In destination-scoring.engine.ts
const destinations = await firstValueFrom(this.mongoService.getAllDestinations());

// Change to:
import { DESTINATIONS_DATA } from '../destination/destinations.data';
const destinations = Object.values(DESTINATIONS_DATA);
```

---

## Recommended Setup

### For Development (Recommended)
- **Use Static Data** (no MongoDB needed)
- App works immediately
- No API key exposure
- All features work locally

**To use static data only:**
```typescript
// src/app/core/engines/destination-scoring/destination-scoring.engine.ts

async process(input: DestinationScoringInput): Promise<DestinationScoringResult> {
  // Skip MongoDB, use static data
  const destinations = Object.values(DESTINATIONS_DATA);
  
  // Continue with scoring...
}
```

### For Production
- **Use MongoDB with fallback**
- Provides flexibility to add/update destinations without code deploy
- Falls back to static data if MongoDB is down
- Current implementation already does this!

---

## Environment Configuration (Best Practice)

### Create `src/environments/environment.ts`
```typescript
export const environment = {
  production: false,
  mongodb: {
    apiUrl: 'https://ap-south-1.aws.data.mongodb-api.com/app/gzggipjk/endpoint/data/v1',
    apiKey: 'YOUR_KEY_HERE',
    dataSource: 'Cluster0',
    database: 'tripsaver'
  }
};
```

### Update `src/environments/environment.prod.ts`
```typescript
export const environment = {
  production: true,
  mongodb: {
    apiUrl: 'https://ap-south-1.aws.data.mongodb-api.com/app/gzggipjk/endpoint/data/v1',
    apiKey: process.env['MONGODB_API_KEY'],
    dataSource: 'Cluster0',
    database: 'tripsaver'
  }
};
```

### Update `mongodb.service.ts`
```typescript
import { environment } from '../../../../environments/environment';

private readonly CONFIG = environment.mongodb;
```

---

## Verification Steps

### 1. Run Application
```bash
npm start
```

### 2. Open Browser Console
- F12 → Console tab

### 3. Submit Form
- Fill destination finder form
- Click "Get Recommendation"

### 4. Check Logs
```
✅ MongoDB Response: { documents: [...] }  → SUCCESS
❌ MongoDB Error Details:                   → Check error
⚠️ Falling back to static data              → MongoDB unavailable
```

---

## Current Status

✅ **Application works with or without MongoDB**
- Fallback to static data: 5-second timeout
- Static data includes 20+ Indian destinations
- All scoring algorithms work with static data
- Production-ready!

**Issue:** If you see infinite loading spinner, it means:
1. MongoDB is responding slowly (> 5 seconds)
2. Static fallback data is not loading properly
3. Check browser console for errors

---

## Quick Fix

If experiencing infinite loading:

1. **Open Browser Console** (F12)
2. **Copy the exact error**
3. **Check against checklist above**
4. **Apply fix**

Most common: MongoDB collection is empty → Insert sample data in MongoDB Atlas
