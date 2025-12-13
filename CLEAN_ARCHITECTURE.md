# TripSaver - Clean Architecture Documentation

## 🎯 Core Principles

1. **Separation of Concerns**: Configuration → Logic → UI
2. **Single Source of Truth**: One config file for all partners
3. **Easy Onboarding/Offboarding**: Change one value, system auto-adapts
4. **Affiliate-Safe**: No price comparisons, reason-based recommendations
5. **Future-Proof**: Scales from 1 to 100 partners

---

## 📁 Clean Architecture

```
src/app/
├── core/
│   ├── config/
│   │   └── partners.config.ts          # 🎯 PARTNER REGISTRY (Add/Remove partners here)
│   └── services/
│       └── recommendation/
│           └── recommendation.engine.ts # 🧠 RECOMMENDATION LOGIC (Scoring + Reasons)
│
├── shared/
│   └── components/
│       ├── requirement-form/           # ✅ USER INPUT (4-step form)
│       └── recommendation-result/      # ✅ RECOMMENDATION UI (Display results)
│
└── pages/
    ├── home/                           # Homepage with CTA
    └── how-it-works/                   # SEO-friendly explanation page
```

---

## 🔧 Three Core Files

### 1. **partners.config.ts** - Partner Registry
**Purpose**: Single source of truth for all affiliate partners  
**Location**: `src/app/core/config/partners.config.ts`

**What it contains:**
- Partner details (name, ID, affiliate ID)
- Branding (logo, color)
- URL builders for hotels/search
- Network-safe descriptions
- Active/inactive flag

**To add a partner:**
```typescript
goibibo: {
  id: 'goibibo',
  displayName: 'Goibibo',
  active: true,  // ← Set to true
  affiliateId: 'YOUR_ID',
  color: '#FF6D38',
  urls: { ... },
  descriptions: { ... }
}
```

**To remove a partner:**
```typescript
active: false  // ← That's it!
```

---

### 2. **recommendation.engine.ts** - Core Logic
**Purpose**: Generate recommendations based on user preferences  
**Location**: `src/app/core/services/recommendation/recommendation.engine.ts`

**What it does:**
- Calculates scores for each partner
- Generates affiliate-safe reasons
- Selects primary + secondary recommendations
- Completely testable and isolated

**Scoring Algorithm:**
```typescript
// Agoda
if (budgetRange === 'luxury') score += 3;
if (preferences.internationalBrands) score += 3;
if (travelType === 'couple') score += 2;

// MakeMyTrip
if (budgetRange === 'budget') score += 3;
if (preferences.indianChains) score += 3;
if (destination is domestic) score += 2;
```

**To add new partner scoring:**
```typescript
// In calculateScore method
if (partnerId === 'goibibo') {
  if (budgetRange === 'budget') score += 3;
  if (domestic destination) score += 2;
}

// In generateReasons method
if (partnerId === 'goibibo') {
  reasons.push('Strong domestic inventory');
  reasons.push('Fast refunds available');
}
```

---

### 3. **recommendation-result.component.ts** - UI Display
**Purpose**: Display recommendations to user  
**Location**: `src/app/shared/components/recommendation-result/`

**What it shows:**
- Primary recommendation with reasons
- Secondary recommendation (optional)
- Affiliate-safe disclaimer
- CTA buttons with tracking

**Data flow:**
```
User Input (form) 
  → Recommendation Engine (scoring)
    → Recommendation Result (UI)
      → User clicks → Affiliate link
```

---

## 🚀 Adding a New Partner (3 Steps)

### Step 1: Add to Config
Edit `partners.config.ts`:
```typescript
newpartner: {
  id: 'newpartner',
  displayName: 'New Partner',
  active: true,
  affiliateId: 'YOUR_AFFILIATE_ID',
  color: '#FF0000',
  urls: {
    hotels: (params) => `https://partner.com/hotels?destination=${params?.destination}`,
    search: (params) => `https://partner.com/search`
  },
  descriptions: {
    general: "TripSaver recommends New Partner when...",
    specific: "New Partner is suitable for..."
  }
}
```

### Step 2: Add Scoring Logic
Edit `recommendation.engine.ts`:
```typescript
// In calculateScore method
if (partnerId === 'newpartner') {
  if (budgetRange === 'budget') score += 3;
  if (travelType === 'family') score += 2;
  // Add your scoring rules
}

// In generateReasons method
if (partnerId === 'newpartner') {
  reasons.push('Reason 1 why this partner is suitable');
  reasons.push('Reason 2 based on user preferences');
}
```

### Step 3: Done!
That's it. No UI changes, no route updates, no file imports. System auto-adapts.

---

## 📊 Removed/Deprecated Files

The following files are **NO LONGER NEEDED** with the clean architecture:

### ❌ Removed
- `affiliate-partners.config.ts` (merged into `partners.config.ts`)
- `partner-links.config.ts` (merged into `partners.config.ts`)
- `agoda-affiliate.config.ts` (merged into `partners.config.ts`)
- `comparison.service.ts` (replaced by `recommendation.engine.ts`)
- `search.service.ts` (not used in recommendation flow)
- `comparison-card.component.ts` (not used in recommendation flow)

### ✅ Kept (Core)
- `partners.config.ts` - Partner registry
- `recommendation.engine.ts` - Core logic
- `requirement-form.component.*` - User input
- `recommendation-result.component.*` - Display results
- `analytics.service.ts` - Tracking (if used)
- `seo.service.ts` - SEO metadata (if used)

---

## 🔒 Affiliate Compliance

### Safe Language Used
- ✅ "Better suited"
- ✅ "Recommended"
- ✅ "Popular among"
- ✅ "Known for"
- ✅ "Strong selection"

### Avoided Language
- ❌ "Cheapest"
- ❌ "Lowest price"
- ❌ "Best price"
- ❌ "Guaranteed savings"
- ❌ "Price match"

### Required Disclaimers
1. **Homepage**: "Recommendations are based on travel preferences and general platform strengths, not live pricing."
2. **Result Page**: "TripSaver recommends booking platforms based on travel preferences and publicly available platform features. We do not compare prices or availability."
3. **Footer**: "TripSaver may earn a commission when users click partner links, at no extra cost..."

---

## 📈 Scaling Strategy

### Current State
- **Active Partners**: 2 (Agoda, MakeMyTrip)
- **Ready to Activate**: 2 (Goibibo, Booking.com)
- **System Capacity**: Unlimited

### Adding 10th Partner
**Time Required**: ~15 minutes  
**Files to Edit**: 2 (`partners.config.ts`, `recommendation.engine.ts`)  
**Lines of Code**: ~50 lines

**No changes needed to:**
- ❌ UI components
- ❌ Routes
- ❌ HTML templates
- ❌ CSS styles
- ❌ Other services

---

## 🧪 Testing Checklist

### Configuration Test
```typescript
import { getActivePartners, getPartner } from './partners.config';

console.log('Active partners:', getActivePartners().length);
const agoda = getPartner('agoda');
console.log('Agoda URL:', agoda?.urls.hotels({ destination: 'Goa' }));
```

### Recommendation Test
```typescript
import { RecommendationEngine } from './recommendation.engine';

const engine = new RecommendationEngine();
const result = engine.generateRecommendations({
  destination: 'Goa',
  travelType: 'couple',
  budgetRange: 'luxury',
  preferences: {
    internationalBrands: true,
    indianChains: false,
    payAtHotel: true,
    freeCancellation: true,
    mobileDeal: false,
    couponsCashback: false
  }
});

console.log('Primary:', result.primary?.partnerName);
console.log('Reasons:', result.primary?.reasons);
```

### UI Test
1. Navigate to homepage
2. Click "Find Recommended Platform"
3. Fill 4-step form
4. View recommendation with reasons
5. Click CTA → Verify affiliate URL

---

## 📝 Quick Reference

### Enable Partner
```typescript
// partners.config.ts
active: true
```

### Disable Partner
```typescript
// partners.config.ts
active: false
```

### Update Affiliate ID
```typescript
// partners.config.ts
affiliateId: 'NEW_ID'
```

### Add Scoring Rule
```typescript
// recommendation.engine.ts
if (partnerId === 'partner') {
  if (condition) score += points;
}
```

### Add Reason
```typescript
// recommendation.engine.ts
if (partnerId === 'partner') {
  reasons.push('Affiliate-safe reason');
}
```

---

## 🎯 Benefits of Clean Architecture

1. **Easy Maintenance**: One file to update partners
2. **No Breaking Changes**: Add/remove partners without code rewrites
3. **Testable**: Logic isolated from UI
4. **Scalable**: Works with 1 or 100 partners
5. **Affiliate-Safe**: Built-in compliant language
6. **Future-Proof**: Ready for any business model changes

---

## 🚦 Migration Guide (If Updating from Old Code)

### Before (Old Architecture)
```
Multiple config files
Logic scattered across components
Hard to add partners
Tight coupling
```

### After (Clean Architecture)
```
Single config file: partners.config.ts
Single logic file: recommendation.engine.ts
Easy partner onboarding: Change 1 value
Loose coupling: Services → Components
```

### Steps to Migrate
1. ✅ Create `partners.config.ts`
2. ✅ Create `recommendation.engine.ts`
3. ✅ Update `recommendation-result.component.ts` to use engine
4. ✅ Remove old config files
5. ✅ Test all recommendations
6. ✅ Deploy

---

## 📚 Additional Documentation

- `AFFILIATE_SAFE_IMPLEMENTATION.md` - Compliance checklist
- `how-it-works/` - SEO page explaining methodology
- Partners' affiliate program documentation

---

**Status**: ✅ PRODUCTION READY  
**Architecture**: ✅ CLEAN & SCALABLE  
**Compliance**: ✅ AFFILIATE-SAFE  
**Maintenance**: ✅ MINIMAL EFFORT
