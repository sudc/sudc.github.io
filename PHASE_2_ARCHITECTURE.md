# 🏗️ Phase 2 Architecture Visualization

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────┐        ┌─────────────────────┐   │
│  │  TripPlannerComponent    │        │  ItineraryDayCard   │   │
│  ├──────────────────────────┤        ├─────────────────────┤   │
│  │ • Destination Dropdown   │   →    │ • Day Title         │   │
│  │ • Days Dropdown          │        │ • Places List       │   │
│  │ • Preferences Checkboxes │        │ • Activities List   │   │
│  │ • ⚙️ Advanced Filters:   │        │ • CTA Buttons       │   │
│  │   - Budget Filter        │        │ • Expandable        │   │
│  │   - Pace Filter          │        │ • Color-coded       │   │
│  │   - Accommodation Filter │        │   (blue, purple,    │   │
│  │   - Travel Type Filter   │        │    orange, teal)    │   │
│  │ • Generate Button        │        │                     │   │
│  │ • Share Button           │        │                     │   │
│  └──────────────────────────┘        └─────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    (Method Calls)
┌─────────────────────────────────────────────────────────────────┐
│                      SERVICE LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           ItineraryService (Orchestrator)                │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │ • Injects ItineraryProvider                             │   │
│  │ • generatePlan(dest, days, prefs, filters)              │   │
│  │ • setProvider(provider) ← Switch JSON ↔ AI              │   │
│  │ • setFilters(filters) ← Store filter state              │   │
│  │ • getFilters() ← Retrieve current filters               │   │
│  │ • getDestinations() → All 15 destinations               │   │
│  │ • getDurations(dest) → Available durations              │   │
│  │                                                           │   │
│  │ State Management (BehaviorSubjects):                    │   │
│  │ • currentPlan$ ← Observable<ItineraryPlan>              │   │
│  │ • preferences$ ← Observable<PlannerPreferences>         │   │
│  │ • filters$ ← Observable<AdvancedFilters>                │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │    AffiliateMappingService (CTA Management)              │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │ • getAffiliateLink(cta) → URL with UTM params           │   │
│  │ • buildHotelLink(hotel) → Agoda link                    │   │
│  │ • buildActivityLink(activity) → GetYourGuide link       │   │
│  │ • trackAffiliateClick(cta) → Analytics                  │   │
│  │                                                           │   │
│  │ CTA Type Mapping:                                        │   │
│  │ • hotel → Agoda 🏨                                       │   │
│  │ • activity → GetYourGuide 🎫                             │   │
│  │ • essential → Amazon 🛍️                                 │   │
│  │ • transport → AbhiBus 🚌                                 │   │
│  │ • food → MakeMyTrip 🍽️                                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
          (Delegates via ItineraryProvider Interface)
┌─────────────────────────────────────────────────────────────────┐
│                    PROVIDER ABSTRACTION LAYER                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │     ItineraryProvider (Interface - Contract)              │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │ • getItinerary(dest, days, prefs, filters)                │  │
│  │   → Observable<ItineraryPlan | null>                      │  │
│  │                                                             │  │
│  │ • getAvailableDestinations()                               │  │
│  │   → Promise<Array<{name: string, value: string}>>         │  │
│  │                                                             │  │
│  │ • getAvailableDurations(destination)                       │  │
│  │   → Promise<number[]>                                      │  │
│  │                                                             │  │
│  │ • isReady()                                                │  │
│  │   → Promise<boolean>                                       │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              ↓ Implemented by                    │
│  ┌─────────────────────────────────┐  ┌──────────────────────┐  │
│  │ JsonItineraryProvider (Current) │  │ AiItineraryProvider  │  │
│  │ (Production Ready)              │  │ (Phase 3 Skeleton)   │  │
│  ├─────────────────────────────────┤  ├──────────────────────┤  │
│  │ • Implements all methods        │  │ • Implements all     │  │
│  │ • Loads from JSON data          │  │   methods            │  │
│  │ • Applies filters:              │  │ • Falls back to JSON │  │
│  │   - Budget filtering            │  │ • Ready for LLM      │  │
│  │   - Pace filtering              │  │   integration        │  │
│  │   - Type filtering              │  │ • Structure for:     │  │
│  │ • Returns synchronously         │  │   - buildPrompt()    │  │
│  │   wrapped in Observable         │  │   - callLLM()        │  │
│  │                                 │  │   - parseResponse()  │  │
│  └─────────────────────────────────┘  └──────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │          SAMPLE_ITINERARIES (JSON Database)                │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │ 15 Destinations × Multiple Plans = 20+ Itineraries         │ │
│  │                                                              │ │
│  │ Structure for each destination:                            │ │
│  │ ├─ destination: 'Goa'                                      │ │
│  │ ├─ destinationEmoji: '🏖️'                                 │ │
│  │ ├─ days: 3                                                 │ │
│  │ ├─ title: '3-Day Goa Beach Escape'                         │ │
│  │ ├─ description: 'Beach, culture, nightlife'               │ │
│  │ ├─ itinerary: [                                            │ │
│  │ │   {                                                       │ │
│  │ │     day: 1,                                              │ │
│  │ │     title: 'Arrival & Baga Beach',                       │ │
│  │ │     emoji: '🌅',                                         │ │
│  │ │     places: ['Baga Beach', 'Calangute Beach'],           │ │
│  │ │     activities: ['Beach walk', 'Water sports'],          │ │
│  │ │     ctas: [                                              │ │
│  │ │       {                                                   │ │
│  │ │         type: 'hotel',                                   │ │
│  │ │         label: 'Hotels near Baga',                       │ │
│  │ │         affiliate: 'agoda',                              │ │
│  │ │         emoji: '🏨'                                      │ │
│  │ │       },                                                  │ │
│  │ │       ... more CTAs                                       │ │
│  │ │     ]                                                     │ │
│  │ │   },                                                      │ │
│  │ │   ... more days                                           │ │
│  │ │ ]                                                         │ │
│  │ ├─ bestTime: 'November to March'                           │ │
│  │ └─ budget: '₹20,000 - ₹35,000'                             │ │
│  │                                                              │ │
│  │ Destinations: 15 Total                                      │ │
│  │ ├─ Coastal (5): Goa, Kochi, Guwahati                       │ │
│  │ ├─ Mountains (4): Manali, Shimla, Darjeeling, Leh          │ │
│  │ ├─ Heritage (5): Delhi, Agra, Varanasi, Jaipur, Udaipur   │ │
│  │ ├─ Modern (2): Mumbai, Bangalore                            │ │
│  │ └─ Spiritual (4): Rishikesh, Mysore, Pushkar, Jodhpur     │ │
│  │                                                              │ │
│  │ Total CTAs: 150+                                            │ │
│  │ ├─ Hotels (Agoda)                                          │ │
│  │ ├─ Activities (GetYourGuide)                               │ │
│  │ ├─ Essentials (Amazon)                                     │ │
│  │ ├─ Transport (AbhiBus)                                     │ │
│  │ └─ Food (MakeMyTrip)                                       │ │
│  │                                                              │ │
│  │ File: src/app/core/data/sample-itineraries.ts (1,300 lines)│ │
│  │ Status: Production ready, expandable                        │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              Models & Interfaces                            │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │ • ItineraryPlan {destination, days, itinerary[], ...}      │ │
│  │ • ItineraryDay {day, title, places[], activities[], ...}   │ │
│  │ • ItineraryCTA {type, label, affiliate, emoji}             │ │
│  │ • PlannerPreferences {travelType[]}                         │ │
│  │ • AdvancedFilters {budget?, pace?, accommodation?, ...}    │ │
│  │ • ItineraryProvider {interface with 4 methods}             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
USER INTERACTION:

1. User visits /planner
   ↓
   TripPlannerComponent initializes
   ↓
   Shows: Destination dropdown, Days dropdown, Advanced Filters toggle
   ↓
   Right panel shows: Empty state ("Select a destination")

2. User selects destination (e.g., "Goa")
   ↓
   onDestinationChange() called
   ↓
   ItineraryService.getDurations('goa') called
   ↓
   Returns: [3, 5]
   ↓
   Days dropdown populated

3. User selects duration (e.g., "3")
   ↓
   selectedDays = 3
   ↓
   Generate button enabled

4. User clicks "⚙️ Show Advanced Filters"
   ↓
   toggleAdvancedFilters() called
   ↓
   showAdvancedFilters = true
   ↓
   Advanced filters section expands
   ↓
   User sees: Budget, Pace, Accommodation, Travel Type dropdowns

5. User selects filters and clicks "Generate Plan"
   ↓
   generatePlan() called with:
   - destination: 'goa'
   - days: 3
   - preferences: {travelType: [...]}
   - filters: {budget: 'moderate', pace: 'balanced', ...}
   ↓
   ItineraryService.generatePlan(...) called
   ↓
   Service stores filters: setFilters(filters)
   ↓
   Service delegates to provider:
   this.provider.getItinerary(destination, days, preferences, filters)
   ↓
   JsonItineraryProvider.getItinerary() executes:
   ├─ Load SAMPLE_ITINERARIES['goa']['3']
   ├─ Call applyFilters() with budget, pace, etc.
   ├─ Filter CTAs: Keep only budget-level hotels
   ├─ Filter activities: Keep only balanced-pace activities
   ├─ Return Observable<ItineraryPlan>
   ↓
   TripPlannerComponent receives plan
   ↓
   currentPlan = plan
   ↓
   Right panel renders:
   ├─ Plan header (emoji + title)
   ├─ Best time & budget info
   ├─ 3 day cards with filtered CTAs
   └─ Action buttons (Reset, Share)

6. User clicks hotel CTA
   ↓
   ItineraryDayCardComponent emits click
   ↓
   AffiliateMappingService.getAffiliateLink(cta) called
   ↓
   Returns Agoda link with:
   - Affiliate ID
   - Campaign source (TripSaver)
   - UTM parameters
   ↓
   User redirected to Agoda
   ↓
   Affiliate commission earned! 💰

7. User modifies filter (e.g., changes pace to "relaxed")
   ↓
   applyFilters() called
   ↓
   Plan regenerates with new filters
   ↓
   Right panel updates in real-time
   ↓
   Activities now show only relaxed pace items
```

---

## Provider Switching Flow (Phase 3 Preview)

```
CURRENT STATE (Phase 2):
┌────────────────────────────────┐
│  ItineraryService              │
│  • provider = JsonProvider      │
│  • generatePlan() delegates     │
│  • setProvider(newProvider)     │
└────────────────────────────────┘
         ↓ calls
┌────────────────────────────────┐
│  JsonItineraryProvider          │
│  • Loads from SAMPLE_ITINERARIES│
│  • Applies filters              │
│  • Returns Observable<Plan>     │
└────────────────────────────────┘

PHASE 3 (AI Integration):
┌────────────────────────────────┐
│  ItineraryService              │
│  • provider = AiProvider (NEW!) │
│  • generatePlan() delegates     │
│  • setProvider(newProvider)     │
└────────────────────────────────┘
         ↓ calls
┌────────────────────────────────┐
│  AiItineraryProvider (NEW!)     │
│  • Builds prompt with filters   │
│  • Calls LLM API (OpenAI/Claude)│
│  • Parses response to Plan      │
│  • Returns Observable<Plan>     │
└────────────────────────────────┘

SWITCHING MECHANISM:
const service = inject(ItineraryService);

// Currently using JSON
// service.generatePlan() → JsonProvider

// Switch to AI
service.setProvider(new AiItineraryProvider());

// Now using AI - NO UI CHANGES!
// service.generatePlan() → AiProvider
// Components continue working unchanged ✨
```

---

## Filter Application Logic

```
FILTER PIPELINE:

Input: ItineraryPlan with all CTAs
       + AdvancedFilters {budget, pace, accommodation, travelType}

Process in JsonItineraryProvider.applyFilters():

1. BUDGET FILTER
   ┌─────────────────────┐
   │ Original CTAs: 10   │ (all budget levels)
   ├─────────────────────┤
   │ Filter: 'moderate'  │
   ├─────────────────────┤
   │ Result CTAs: 7      │ (budget + moderate only)
   └─────────────────────┘

2. PACE FILTER
   ┌─────────────────────┐
   │ Original: 12 items  │ (mixed pace activities)
   ├─────────────────────┤
   │ Filter: 'fast'      │
   ├─────────────────────┤
   │ Result: 6 items     │ (fast-paced activities)
   └─────────────────────┘

3. ACCOMMODATION FILTER
   ┌─────────────────────┐
   │ Original: 15 CTAs   │ (all accommodation types)
   ├─────────────────────┤
   │ Filter: 'heritage'  │
   ├─────────────────────┤
   │ Result: 3 CTAs      │ (heritage properties only)
   └─────────────────────┘

4. TRAVEL TYPE FILTER
   ┌─────────────────────┐
   │ Original: 20 items  │ (mixed group types)
   ├─────────────────────┤
   │ Filter: 'family'    │
   ├─────────────────────┤
   │ Result: 12 items    │ (family-friendly)
   └─────────────────────┘

Output: Filtered ItineraryPlan with selected CTAs/activities only
```

---

## Monetization Flow

```
AFFILIATE REVENUE GENERATION:

Step 1: User Generates Plan
┌─────────────────┐
│ /planner visited│
│ 10,000 users/mo │
└─────────────────┘
           ↓
Step 2: User Interacts with CTAs
┌─────────────────┐
│ 30% click rate  │
│ 3,000 clicks/mo │
└─────────────────┘
           ↓ (AffiliateMappingService)
Step 3: Affiliate Link Generation
┌──────────────────────┐
│ CTA → Affiliate URL  │
│ + Campaign tracking  │
│ + UTM parameters     │
└──────────────────────┘
           ↓
Step 4: User Visits Affiliate
┌──────────────────────┐
│ Agoda (Hotels): 40%  │ ← ₹120 avg
│ GetYourGuide: 25%    │ ← ₹80 avg
│ Amazon: 12%          │ ← ₹50 avg
│ AbhiBus: 15%         │ ← ₹60 avg
│ MakeMyTrip: 8%       │ ← ₹40 avg
└──────────────────────┘
           ↓
Step 5: Booking Made
┌─────────────────────┐
│ ₹100-500 commission │
│ per booking         │
└─────────────────────┘
           ↓
Step 6: Revenue
┌──────────────────────────┐
│ 3,000 clicks × 20% CVR   │ 600 bookings/mo
│ 600 × ₹250 avg           │
│ = ₹150,000/month         │
│ = ₹1.8M/year             │
│ = ₹18L annually          │
└──────────────────────────┘
```

---

## File Organization

```
src/app/
├── core/
│   ├── models/
│   │   ├── itinerary.model.ts              (ItineraryPlan, ItineraryDay, etc.)
│   │   └── itinerary-provider.interface.ts (NEW - ItineraryProvider interface)
│   ├── providers/                          (NEW - Provider implementations)
│   │   ├── json-itinerary.provider.ts      (NEW - Current JSON provider)
│   │   └── ai-itinerary.provider.ts        (NEW - Phase 3 AI skeleton)
│   ├── data/
│   │   └── sample-itineraries.ts           (EXPANDED - 15 destinations, 20+ plans)
│   ├── services/
│   │   ├── itinerary/
│   │   │   └── itinerary.service.ts        (UPDATED - Provider abstraction)
│   │   └── affiliate-mapping/
│   │       └── affiliate-mapping.service.ts (CTA link mapping)
│   └── config/
│       └── config.ts                       (Affiliate configuration)
│
├── pages/
│   └── trip-planner/
│       ├── trip-planner.component.ts       (UPDATED - Advanced filters UI)
│       ├── itinerary-day-card.component.ts (Day card display)
│       └── ...
│
└── ...

Documentation/
├── PHASE_2_COMPLETE.md                     (NEW - Full architecture reference)
├── PHASE_2_SUMMARY.md                      (NEW - Executive summary)
├── PHASE_2_CHECKLIST.md                    (NEW - Implementation checklist)
├── PHASE_2_TESTING.md                      (NEW - Testing guide)
├── DESTINATIONS_EXPANDED.md                (NEW - Destination database)
└── ARCHITECTURE_FINAL_VERDICT.md           (Original - Updated in Phase 2)
```

---

## State Management Flow

```
TripPlannerComponent
├─ selectedDestination: string
├─ selectedDays: number
├─ selectedPreferences: PlannerPreferences
├─ filters: {budget, pace, accommodation, travelType}
└─ currentPlan: ItineraryPlan | null

                    ↓ calls

ItineraryService (Observable State)
├─ currentPlan$: BehaviorSubject<ItineraryPlan | null>
├─ preferences$: BehaviorSubject<PlannerPreferences>
├─ filters$: BehaviorSubject<AdvancedFilters>
└─ provider: ItineraryProvider
   ├─ JsonItineraryProvider (current)
   └─ AiItineraryProvider (phase 3)

                    ↓ delegates to

Provider Implementation
├─ JsonItineraryProvider
│  ├─ SAMPLE_ITINERARIES (JSON data)
│  └─ applyFilters()
└─ AiItineraryProvider
   ├─ buildPrompt()
   └─ callLLM() (future)

                    ↓ returns

Observable<ItineraryPlan | null>
```

---

This architecture ensures:
✅ **Scalability**: Easy to add providers, destinations, filters
✅ **Maintainability**: Clear separation of concerns
✅ **Testability**: Mockable providers for unit tests
✅ **Extensibility**: Ready for Phase 3 AI without UI changes
✅ **Type Safety**: Full TypeScript support throughout
