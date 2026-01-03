# Quick Reference: Debug Logging Console Output

**How to Use:** Open browser DevTools (F12) → Console tab

---

## What to Look For

### ✅ Success Scenario (Recommendations Found)

```
🚀 [LOADER] "Get Recommendations" button clicked!
🚀 [LOADER] Month: 1, Budget: moderate
🚀 [LOADER] Interests: Beach, Adventure
```
**What it means:** User clicked button with preferences set

```
⏳ [LOADER] Input sent to engine: {...}
✅ [LOADER] Engine returned: 12 recommendations
```
**What it means:** Engine processed request and returned results

```
🔄 [DEDUP] ================================
🔄 [Dedup] Raw results from engine: 12 items
   ✅ Keeping: Goa (score: 88%)
   ✅ Keeping: Manali (score: 82%)
   ❌ Removing duplicate: Goa
```
**What it means:** Deduplication removed any duplicate destinations

```
✅ [Dedup] Final unique destinations: 6
📋 [Dedup] Showing: Goa, Manali, Jaipur, Andaman, Coorg, Rishikesh
✅ [LOADER] Cards ready for user interaction (click to expand)
```
**What it means:** 6 unique destinations are now displayed as cards

---

### ⚠️ Fallback Scenario (No Engine Results)

```
⚠️ [LOADER] No recommendations found from engine (empty or failed)
⚠️ [LOADER] Falling back to sample destinations from FALLBACK_DESTINATIONS
```
**What it means:** Engine returned 0 results, using fallback data

```
🎯 [FALLBACK] ================================
🎯 [Fallback] Using FALLBACK_DESTINATIONS (61 pre-curated destinations)
🎯 [Fallback] Total available: 61 destinations
  1. Goa (beach, Goa) - Budget: budget
  2. Havelock Island (island, Andaman & Nicobar) - Budget: premium
  3. Manali (hill, Himachal Pradesh) - Budget: moderate
  ... (58 more)
```
**What it means:** Loading all 61 fallback destinations

```
✅ [Fallback] Selected 6 for display: Goa, Havelock Island, Manali, Jaipur, Agra, Rishikesh
✅ [Fallback] These are popular destinations to get started
✅ [Fallback] User can refine by setting preferences for personalized recommendations
```
**What it means:** Selected 6 popular destinations from fallback pool

---

### 📋 Itinerary/Drawer Scenario

**Opening Itinerary:**
```
📍 [DRAWER OPEN] ================================
📍 [Itinerary] Opening drawer for recommendation:
  - Destination Name: Goa
  - Destination State: Goa
  - Country: India
  - Match Score: 88%
  - Trying to load itinerary for: "Goa"

🔍 [AvailableDays] Discovering available days for Goa...
   Type: beach, State: Goa
✅ [AvailableDays] 2 days available for Goa
✅ [AvailableDays] 3 days available for Goa
✅ [AvailableDays] 4 days available for Goa
📌 [AvailableDays] Final available days: 2, 3, 4

✅ [Itinerary] Successfully loaded for Goa
   - Days: 3
   - Title: 3-Day Goa Beach Escape
```
**What it means:** Drawer opened, days discovered, itinerary loaded

**Changing Day Duration:**
```
📅 [DAY CHANGE] ================================
📅 [Day Selection] Button clicked for 4 days
📅 [Day Selection] Reloading itinerary for: Goa
✅ [Day Selection] Itinerary loaded successfully
   - Days: 4
   - Title: 4-Day Goa Beach Escape
```
**What it means:** Clicking day button reloaded itinerary with new duration

---

## Common Emoji Legend

| Emoji | Meaning | Context |
|-------|---------|---------|
| 🚀 | Starting operation | Button click, new process |
| ⏳ | Waiting/Processing | Async call in progress |
| ✅ | Success/Complete | Operation succeeded |
| ❌ | Failure/Removed | Item removed or failed |
| ⚠️ | Warning | Fallback triggered, unusual state |
| 🔄 | Processing/Dedup | Data transformation step |
| 📍 | Location/Drawer | Itinerary drawer operations |
| 📅 | Calendar/Days | Day selection change |
| 🔍 | Search/Discover | Finding available options |
| 📋 | List/Display | Showing final results |
| 📌 | Pinning/Final | Final state/result |
| 🎯 | Target/Fallback | Fallback data operations |

---

## Troubleshooting

### Problem: No destinations showing

**Check console for:**
```
⚠️ [FALLBACK] No fallback destinations available!
```
**Fix:** Ensure FALLBACK_DESTINATIONS is imported and populated

### Problem: Duplicates showing in list

**Check console for:**
```
❌ [Dedup] Removed 0 duplicates
```
**Fix:** Deduplication is working. If duplicates appear anyway, check destination name matching

### Problem: Itinerary won't load

**Check console for:**
```
⚠️ [Itinerary] No itinerary found for Goa. Switching to explore mode
```
**Fix:** This is normal - shows explore mode fallback. Check that destination name matches SAMPLE_ITINERARIES keys

### Problem: Days buttons not showing

**Check console for:**
```
📌 [AvailableDays] Final available days: 3
```
**Fix:** If showing only [3], only 3-day itinerary exists for that destination

---

## Key Metrics to Monitor

**From Console:**
1. **Engine Performance:** Time between "Input sent" and "Engine returned"
2. **Dedup Effectiveness:** Compare "Raw results" vs "Final unique"
3. **Fallback Usage:** Count how often "No recommendations found" appears
4. **Day Coverage:** Check which day durations are available per destination

**Example Tracking:**
```
Engine returned: 12 recommendations in ~200ms
Raw results: 12 items
Final unique: 6 destinations
Fallback used: 0 times (engine always returned results)
Days available: 2, 3, 4, 5, 7 (all durations)
```

---

## Performance Tips

✅ **Good Signs:**
- Engine processes in <500ms
- Dedup removes <50% duplicates
- All destinations show 4+ day options
- Fallback rarely triggered

❌ **Problem Signs:**
- Engine takes >2 seconds
- >50% duplicates removed
- Many destinations have only 1 day option
- Fallback triggered frequently

---

## For Developers

### Adding New Console Logs

Use standard format:
```typescript
console.log(`✅ [CATEGORY] Message about what happened`);
console.log(`⏳ [CATEGORY] Waiting for operation`);
console.error(`❌ [CATEGORY] Error message`);
console.warn(`⚠️ [CATEGORY] Warning message`);
```

### Categories Used
- `[LOADER]` - Recommendation loading process
- `[DEDUP]` - Deduplication of destinations
- `[FALLBACK]` - Fallback destination loading
- `[DRAWER OPEN]` - Opening side drawer/itinerary
- `[Itinerary]` - Loading itinerary data
- `[AvailableDays]` - Discovering day options
- `[Day Selection]` - Changing day duration
- `[Dedup]` - Sub-step: keeping/removing destinations

---

## Console Filter Tips

**Show only loading logs:**
```javascript
// In console:
filter: "[LOADER]"
```

**Show errors only:**
```javascript
filter: "error"
```

**Show warnings only:**
```javascript
filter: "warn"
```

---

## Testing Scenarios

### Scenario 1: Fresh Load, No Interests
1. Don't select any interests
2. Click "Get Recommendations"
3. Expect: All 61 destinations returned (or fallback shown)
4. Check console: Look for "NONE" in interests and "Fallback" trigger

### Scenario 2: With Interests Selected
1. Select "Beach" and "Adventure"
2. Click "Get Recommendations"
3. Expect: Filtered recommendations shown
4. Check console: Verify interests appear in input

### Scenario 3: Open Itinerary
1. Get recommendations
2. Click a destination card
3. Click a day button (e.g., "4 days")
4. Expect: Different itinerary loads
5. Check console: Verify [DAY CHANGE] logs appear

---

**Remember:** The console is your friend! Every operation logs its status.
