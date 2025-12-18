# 🚀 MongoDB Destinations Setup Guide

## Overview
TripSaver now uses **MongoDB-only** data for destinations. No static fallback. All 156+ destinations stored in the cloud.

---

## 📋 Setup Steps

### **Step 1: Deploy Backend (if not already deployed)**

If deploying to Render:
```bash
cd backend
git push  # Render auto-deploys
```

Backend should be live at: `https://your-render-app.onrender.com`

---

### **Step 2: Run Destination Insertion Script**

**Option A: Local Insertion (Backend running locally)**

```bash
# Terminal 1: Start backend
cd backend
npm install
npm start

# Terminal 2: Insert destinations
node insert-destinations.js
```

Expected output:
```
🚀 TripSaver Destinations – Bulk Insert Script
📍 Backend URL: http://localhost:3000
📁 Data file: public/assets/data/destinations-v2.json

📖 Reading destination data...
✅ Loaded 10 destinations

📤 Preparing bulk insert request...
   Payload size: 25.40 KB

🔗 Connecting to backend...
⏳ Sending 10 destinations to MongoDB...

📊 Response Status: 201
✅ SUCCESS!

   ✓ Inserted: 10 destinations
   ✓ Message: Successfully inserted 10 destinations

🎉 All destinations are now in MongoDB!
   The frontend will fetch them automatically.
```

---

**Option B: Remote Insertion (Deployed Backend)**

```bash
# Set backend URL and run
BACKEND_URL=https://your-render-app.onrender.com node insert-destinations.js
```

Or on Windows PowerShell:
```powershell
$env:BACKEND_URL='https://your-render-app.onrender.com'
node insert-destinations.js
```

---

### **Step 3: Verify Data in MongoDB**

Check MongoDB Atlas:
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Select your cluster → Collections
3. Find `tripsaver` database
4. Verify `destinations` collection has 10+ documents

Or via API:
```bash
curl https://your-render-app.onrender.com/api/destinations
```

Should return JSON array of destinations.

---

### **Step 4: Test Frontend**

1. Start frontend:
```bash
npm install
npm start
```

2. Navigate to Trip Stepper
3. Select preference (e.g., "Beach")
4. Should see: **Gokarna, Varkala, Udupi, Kovalam, etc.** (NOT state names)
5. Verify each card shows:
   - City name + State
   - Destination type emoji
   - Match score
   - Explore button

---

## 📊 API Endpoints

### **GET /api/destinations**
Returns all destinations from MongoDB.

```bash
curl http://localhost:3000/api/destinations
```

Response:
```json
[
  {
    "id": "IN-GOA-GOK",
    "name": "Gokarna",
    "state": "Karnataka",
    "type": "beach",
    "scores": { "beach": 92, "adventure": 55, ... }
  },
  ...
]
```

---

### **POST /api/destinations/bulk-insert** ⚠️ ONE-TIME USE

Clears and repopulates all destinations.

```bash
curl -X POST http://localhost:3000/api/destinations/bulk-insert \
  -H "Content-Type: application/json" \
  -d @payload.json
```

Where `payload.json`:
```json
{
  "destinations": [
    { "id": "IN-GOA-GOK", "name": "Gokarna", ... },
    ...
  ]
}
```

⚠️ **WARNING**: This deletes existing destinations first!

---

## 🔧 Troubleshooting

### "❌ Failed to load destinations"
- ✅ Is backend running?
- ✅ Is MongoDB Atlas connected?
- ✅ Check environment variables (MONGODB_URI, PORT)
- ✅ Check backend logs on Render

### "❌ Request failed: Cannot find module"
```bash
npm install  # Make sure all dependencies installed
```

### "Empty response from backend"
- ✅ Run the insertion script: `node insert-destinations.js`
- ✅ Verify data exists in MongoDB Atlas

### "ECONNREFUSED localhost:3000"
- ✅ Backend not running. Start it with `npm start` in `/backend`
- ✅ Or set correct BACKEND_URL for remote backend

---

## 📝 Files Changed

| File | Change |
|------|--------|
| `backend/server.js` | ➕ Added POST `/api/destinations/bulk-insert` endpoint |
| `insert-destinations.js` | ➕ NEW: One-time insertion script |
| `destination-scoring.engine.ts` | 🔄 Removed static fallback, MongoDB-only |
| `destinations.data.ts` | ⚠️ No longer imports DESTINATIONS_DATA |
| `public/assets/data/destinations-v2.json` | ➕ NEW: Full destination dataset |

---

## 🎯 Next Steps

1. ✅ Run insertion script (one time)
2. ✅ Verify data in MongoDB
3. ✅ Test frontend recommendations
4. ✅ Deploy to production
5. ✅ Monitor backend logs

---

## 📞 Support

If destinations not showing:
1. Check backend is running
2. Run: `node insert-destinations.js`
3. Verify in MongoDB Atlas
4. Check browser console for API errors

---

**Version**: 1.0.0  
**Last Updated**: 2025-12-18  
**Status**: Production Ready
