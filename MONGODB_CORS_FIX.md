# MongoDB CORS Setup for GitHub Pages

## Problem
You're getting CORS error when accessing MongoDB API from GitHub Pages:
```
Access to XMLHttpRequest at 'https://ap-south-1.aws.data.mongodb-api.com/...' 
from origin 'https://tripsaver.github.io' has been blocked by CORS policy
```

## Solution: Enable CORS in MongoDB Atlas

### Step 1: Go to MongoDB Atlas Dashboard
1. Visit [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Sign in with your account
3. Select your cluster (Cluster0)

### Step 2: Enable Data API
1. In left sidebar, click **Data API**
2. Click **Enable Data API** (if not already enabled)
3. Wait a few seconds for it to activate

### Step 3: Configure CORS Settings
1. Click **Data API** → **Settings**
2. Look for **CORS Configuration** section
3. Add your GitHub Pages URL:
   ```
   https://tripsaver.github.io
   ```
4. Also add localhost for development:
   ```
   http://localhost:4200
   http://localhost:3000
   http://127.0.0.1:4200
   ```
5. Click **Save**

### Step 4: Get Your API Details
1. In Data API section, you should see:
   - **App ID**: `gzggipjk` (already in your code)
   - **API Key**: Create a new key or use existing
   - **URL**: `https://ap-south-1.aws.data.mongodb-api.com/app/gzggipjk/endpoint/data/v1`

### Step 5: Verify Configuration
Your `mongodb.service.ts` should have:
```typescript
private readonly CONFIG = {
  dataApiUrl: 'https://ap-south-1.aws.data.mongodb-api.com/app/gzggipjk/endpoint/data/v1',
  apiKey: 'VFPCzeFPD5k38njwbVmpf2vXvwdlQsGpmNY7OTfeTwRE6wJWh9Ht0cpLjN18Cww8',
  dataSource: 'Cluster0',
  database: 'tripsaver'
};
```

---

## Testing CORS

### Local Testing
```bash
npm start
# Visit http://localhost:4200
# Open console (F12)
# Fill form and click "Get Recommendation"
# Look for: ✅ MongoDB Direct API Response
```

### GitHub Pages Testing
1. Visit https://tripsaver.github.io/
2. Open browser console (F12)
3. Fill form and click "Get Recommendation"
4. Check for:
   - ✅ `✅ MongoDB Direct API Response:` → **SUCCESS!**
   - ⚠️ `⚠️ Trying backend proxy...` → Proxy fallback (expected)
   - ⚠️ `⚠️ Falling back to static data` → Using static data (acceptable)

---

## Current Fallback Logic

The app now tries in this order:

1. **Direct MongoDB API** (requires CORS enabled)
2. **Backend Proxy** (`/api/mongo/destinations`) - if you have a server
3. **Static Data** - Always works as final fallback ✅

---

## If CORS Still Doesn't Work

### Option A: Use Only Static Data
The app **already works perfectly** with static data. If you don't want to mess with CORS:

1. Comment out the MongoDB calls in `destination-scoring.engine.ts`
2. Use static `DESTINATIONS_DATA` instead
3. Everything works, no CORS issues

### Option B: Deploy a Backend Server
If you need live MongoDB data on GitHub Pages:

1. **Deploy Express server** to Render.com or Railway.app (free)
2. **Backend proxies** requests to MongoDB
3. **Frontend calls** your backend (same-origin or configured CORS)

Example backend:
```typescript
// backend/server.ts
app.post('/api/destinations', async (req, res) => {
  const response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/...', {
    headers: { 'api-key': process.env.MONGODB_API_KEY }
  });
  res.json(await response.json());
});
```

Then deploy to: `https://your-backend.onrender.com`
And call from frontend: `https://your-backend.onrender.com/api/destinations`

---

## Quick Checklist

- [ ] MongoDB Atlas dashboard open
- [ ] Data API enabled
- [ ] CORS settings page visible
- [ ] `https://tripsaver.github.io` added to CORS list
- [ ] `http://localhost:4200` added for development
- [ ] Settings saved
- [ ] Wait 2-3 minutes for changes to propagate
- [ ] Test on GitHub Pages
- [ ] Check browser console for success message

---

## Expected Results After CORS Fix

### Browser Console Should Show:
```
✅ MongoDB Direct API Response: { documents: [...] }
📊 Destinations fetched from MongoDB: 20
✨ Recommended for You
- Goa (Score: 92/100)
- Manali (Score: 88/100)
...
```

### No More CORS Error! ✅

---

## Support

If you see:
- `✅ MongoDB Response` → **Working!** MongoDB CORS is enabled
- `❌ Status: 0` → Browser blocked the request (CORS issue)
- `❌ Status: 401` → API key invalid
- `❌ Status: 404` → Collection not found
- `⚠️ Falling back` → Using static data (acceptable)

---

## Your App Works Either Way!

Even if MongoDB CORS doesn't work:
- ✅ App uses fallback static data
- ✅ All 20+ destinations available
- ✅ Scoring works perfectly
- ✅ No user-facing issues

**CORS fix is for live MongoDB updates only.**
