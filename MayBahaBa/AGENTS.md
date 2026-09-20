## Imported Claude Cowork project instructions

# MayBahaBa — Crowdsourced Flood Condition Intelligence for the Philippines

You are acting as a **Senior Product Designer, UX Engineer, and Full-Stack Developer**.

I want you to design and build a production-quality web application called **MayBahaBa**.

The goal is to create a **free-to-use, crowdsourced flood-condition information platform for the Philippines**, initially focusing on **Metro Manila**.

The core problem is simple:

> As a motorist in the Philippines, I cannot reliably determine whether my route is currently flooded before or during a trip.

Existing flood maps can show historically flood-prone areas, but they often don't answer the question motorists actually need:

> **"May baha ba ngayon sa dadaanan ko?"**

MayBahaBa should allow people to quickly search a location and see whether there are recent flood reports nearby, while also allowing the public to submit and validate reports.

The product should be minimalist, fast, mobile-friendly, and extremely easy to understand.

---

# 1. Product Name

**MayBahaBa**

The name intentionally uses a familiar Filipino phrase:

> "May baha ba?"

The branding should feel:

* Filipino
* approachable
* community-driven
* trustworthy
* practical
* non-governmental
* not overly corporate
* not overly playful

The product should feel like a **public utility built by the community**.

---

# 2. Product Inspiration

The interaction concept is loosely inspired by:

**maypasokba.com**

However, MayBahaBa should NOT simply copy its design.

Instead, take inspiration from its simplicity:

> Ask one question → provide one useful answer.

The primary question for MayBahaBa is:

> **"May baha ba sa lugar na ito?"**

---

# 3. Primary User

The primary user is a Filipino motorist.

Example scenario:

Someone is about to drive from Quezon City to Makati.

Before leaving, they search:

> "Katipunan Avenue"

The application should immediately tell them whether there are recent flood reports around that location.

The user should not need to understand GIS, coordinates, flood maps, or technical terminology.

---

# 4. Core User Flow

The primary experience should be:

1. Open MayBahaBa
2. Search for a location
3. Select the correct location if multiple results exist
4. Display the current/recent flood condition
5. Show flood depth classification
6. Show when the report was submitted
7. Optionally view the location on a map
8. Allow the user to submit a new flood report

The entire process should take only a few seconds.

---

# 5. Homepage

Create an extremely minimalist homepage.

The main interface should contain:

## Header

Left:

**MayBahaBa**

Right:

**Report Baha**

The "Report Baha" CTA should be prominent but not visually overwhelming.

---

## Main Search

Large central question:

> **May baha ba?**

Underneath:

> Search a street, barangay, city, or province.

Search field:

> "Enter a location..."

The search should support fuzzy matching.

Prioritize:

1. Street name
2. Specific address
3. Barangay
4. City / municipality
5. Province
6. Landmark

Examples:

* EDSA
* Commonwealth Avenue
* Katipunan Avenue
* Barangay Holy Spirit
* Quezon City
* Pasig City
* Marikina
* Makati
* Cavite

If possible, use geocoding/autocomplete.

---

# 6. Search Results

After searching for a location, show a very simple result.

Example:

## MAY BAHA

### YES

**Depth: Gutter Deep**

**Reported 12 minutes ago**

Location:

> Katipunan Avenue, Quezon City

Button:

**View on Map**

Then optionally show:

> 3 recent reports within 300m

The result should prioritize the most recent reliable reports.

---

# 7. Flood Status

Do NOT make the application depend on a simple binary flooded/not-flooded state internally.

Create a status model that can support:

* No Recent Report
* No Flood Reported
* Flooded
* Severe Flooding
* Road Impassable
* Unknown / Stale

The UI can still simplify this for normal users.

For example:

### MAY BAHA

Flood depth:

**Gutter Deep**

Reported:

**8 minutes ago**

---

# 8. Filipino-Friendly Flood Depth Classification

Avoid technical measurements as the primary user-facing terminology.

Users should be able to understand the classification immediately.

Create a standardized flood-depth classification such as:

### 1. Walang Baha

No visible flooding.

### 2. Mabaw / Gutter Deep

Water is around gutter level.

Example explanation:

> Tubig hanggang gutter o ilalim ng gulong.

### 3. Bukong-bukong

Water reaches approximately ankle level.

### 4. Binti

Water reaches approximately lower-leg/shin level.

### 5. Tuhod

Water reaches approximately knee level.

### 6. Hita

Water reaches approximately thigh level.

### 7. Baywang

Water reaches approximately waist level.

### 8. Hindi Madaanan

Road is effectively impassable.

Do not require users to enter exact centimeters unless there is a good reason to do so.

However, design the database so exact measurements can be supported later.

---

# 9. Report Baha

The "Report Baha" button should open a modal.

The reporting process must be extremely fast.

Use a clean form.

## Location

Search box:

> "Where is the flooding?"

Provide:

* Location autocomplete
* Use current location
* Open map
* Drop a pin manually

The user should be able to manually adjust the location on the map.

Store:

* latitude
* longitude
* formatted address
* street
* barangay
* city
* province

---

# 10. Time

Provide a time picker.

Default:

**Current date and time**

The user should be able to modify it if they are reporting an observation from a few minutes earlier.

Store timestamps in UTC internally but display them using Philippine time:

**Asia/Manila / UTC+8**

Example:

> August 18, 2026 · 5:42 PM

---

# 11. Flood Depth

Use the Filipino-friendly classification described above.

Allow exactly one primary classification.

Potential options:

* Walang Baha
* Gutter Deep
* Bukong-bukong
* Binti
* Tuhod
* Hita
* Baywang
* Hindi Madaanan

Consider adding a short explanatory description beneath each option.

---

# 12. Reporter

Field:

**Reported by**

Optional.

Allow:

* Name
* Nickname
* Anonymous

Do NOT require account registration for basic reporting.

The goal is to reduce friction and maximize participation.

---

# 13. Optional Report Details

Consider adding optional fields that could improve usefulness:

### Road Condition

* Passable
* Passable with caution
* Difficult to pass
* Not passable

### Vehicle Type

Optional:

* Motorcycle
* Sedan
* SUV
* Truck
* Jeepney
* Other

Do not overcomplicate the initial reporting flow.

These should only be included if they materially improve the product.

---

# 14. Duplicate Detection

This is an important part of the system.

When a user submits a report:

1. Geocode the location.
2. Search for existing reports within a **300-meter radius**.
3. Compare timestamps.
4. Compare flood condition.
5. Determine whether this is likely a duplicate.

A report should NOT automatically be considered a duplicate simply because another report exists within 300 meters.

For example:

Report A:

> Katipunan Ave — gutter deep — 5:00 PM

Report B:

> Katipunan Ave — knee deep — 5:15 PM

These should potentially remain separate because the condition changed.

Create a duplicate-confidence system.

For example:

* Same location + same/similar timestamp + same condition → high duplicate probability
* Same location + different time → probably separate
* Nearby location + same timestamp → possible duplicate
* Nearby location + significantly different conditions → separate report

If a report appears to be a duplicate, inform the user:

> "May existing report na malapit sa lokasyong ito."

Then provide the existing report.

The user should still be able to submit if the conditions have changed.

---

# 15. Report Validation

Create a validation/moderation interface.

This should be separate from the normal public interface.

Create a **Validate Reports** page.

Display reports as cards.

Each card should show:

* Location
* Map preview
* Date/time
* Flood depth
* Road condition
* Reporter name/nickname
* Distance from selected area
* Report age
* Number of validations
* Current status

Actions:

**✓ Validate**

**✕ Deny**

Potential statuses:

* Pending
* Validated
* Denied
* Expired
* Flagged

---

# 16. Community Validation

Think about how crowdsourcing can establish trust without requiring every user to create an account.

Consider a validation model where multiple independent reports increase confidence.

Example:

### High Confidence

5 recent reports agree.

### Medium Confidence

2–3 recent reports agree.

### Low Confidence

Only one recent report.

The UI could eventually display:

> **High confidence · 8 reports**

or

> **Low confidence · 1 report**

Design the data model so this can be implemented.

---

# 17. Report Expiration

Flood reports are time-sensitive.

A report from yesterday should NOT appear as though it represents current conditions.

Implement a freshness model.

For example:

**0–30 minutes**
Very recent

**30–60 minutes**
Recent

**1–3 hours**
Aging

**3–6 hours**
Stale

**6+ hours**
Expired

These values should be configurable rather than hardcoded throughout the application.

Expired reports should remain in the database for historical analysis but should not be presented as current conditions.

---

# 18. Map

Use maps if possible while keeping the project free.

Investigate free/open-source alternatives before defaulting to paid services.

Potential technologies to evaluate:

* OpenStreetMap
* Leaflet
* MapLibre
* Google Maps Platform free-tier
* Google Geocoding / Places APIs if the available free tier is sufficient

Do NOT assume Google Maps is completely free.

Clearly separate:

### Free/Open Source

from:

### Requires API key / potentially billable

The implementation should prioritize:

**OpenStreetMap + Leaflet or MapLibre**

where practical.

---

# 19. Interactive Flood Map

Design the architecture so MayBahaBa can eventually support an interactive flood map.

The map could display:

* Flood reports
* Recent reports
* Flood severity
* Report density
* Historical flood reports
* Potential flood-prone areas

Example visualization:

Green:

> No recent flood report

Yellow:

> Minor flooding

Orange:

> Moderate flooding

Red:

> Severe flooding

Dark red:

> Road impassable

Do not claim that a road is flood-free merely because there is no report.

Instead:

> **No recent report**

is safer than:

> **No flood**

This distinction is extremely important.

---

# 20. Map Interaction

Users should be able to:

* Search location
* Zoom
* Pan
* View nearby reports
* Tap a report
* View flood depth
* View report timestamp
* View confidence
* Submit a report by dropping a pin

Mobile interaction should be especially good.

---

# 21. Database

The database should be:

* Free-tier friendly
* Open-source where practical
* Easy to deploy
* Easy to migrate
* capable of geospatial queries

Evaluate options such as:

### Supabase / PostgreSQL + PostGIS

This is the preferred starting point if its free tier is sufficient.

PostGIS is particularly useful for:

> Find reports within 300 meters of these coordinates.

Create an appropriate geospatial index.

Do not store coordinates as simple text.

---

# 22. Suggested Data Model

Design a proper schema.

Potential entities:

### reports

* id
* latitude
* longitude
* location_name
* street
* barangay
* city
* province
* flood_depth
* road_condition
* reported_at
* reporter_name
* anonymous
* status
* confidence_score
* created_at
* updated_at

### report_validations

* id
* report_id
* validator_id or anonymous identifier
* action
* created_at

### locations

Optional cached geocoding information.

### users

Only if authentication becomes necessary.

Do not require user accounts in V1 unless technically necessary.

---

# 23. Abuse Prevention

Because reports are public, think about abuse.

Implement reasonable protections such as:

* Rate limiting
* CAPTCHA or bot protection if necessary
* Duplicate detection
* Report expiration
* Validation
* Moderation
* Basic abuse logging
* IP hashing rather than storing raw IP addresses if IP-based abuse prevention is necessary

Do not collect unnecessary personal information.

---

# 24. Privacy

The application should collect as little personal data as possible.

Reporter name should be optional.

Do not expose unnecessary user information.

Do not publicly display IP addresses.

If anonymous reporting is enabled, design the system so that users do not need to create accounts.

Add a simple privacy notice.

---

# 25. Mobile-First Design

A significant percentage of users will access this while traveling.

The interface must be mobile-first.

Optimize for:

* One-handed use
* Large touch targets
* Fast loading
* Minimal typing
* Poor mobile connections
* Outdoor visibility
* Simple language

Support:

> Pull/slide to refresh

on mobile where appropriate.

Also provide a conventional refresh button for accessibility.

---

# 26. Desktop Design

Desktop should provide a slightly richer experience.

Potential layout:

Left:

Search and flood status

Right:

Interactive map

However, do NOT compromise the minimalist nature of the product.

---

# 27. Visual Design

Design direction:

**Minimalist public utility.**

Avoid:

* excessive gradients
* glassmorphism
* excessive cards
* complicated dashboards
* unnecessary animations
* excessive icons
* overly decorative illustrations

Prioritize:

* typography
* whitespace
* clear hierarchy
* accessibility
* fast comprehension

The most important information should be immediately visible:

> **MAY BAHA**

> **GUTTER DEEP**

> **12 MINUTES AGO**

---

# 28. Accessibility

Target WCAG 2.2 AA where practical.

Ensure:

* keyboard accessibility
* sufficient color contrast
* visible focus states
* screen-reader labels
* semantic HTML
* accessible modals
* large touch targets
* no information conveyed through color alone

Never rely only on red/green to communicate flood status.

---

# 29. Technology Strategy

Before implementing, inspect the existing project.

If this is a new project, choose a modern, maintainable stack.

Preferred direction:

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### UI

Use a lightweight component architecture.

You may use:

* shadcn/ui
* Radix primitives
* Lucide icons

if appropriate.

### Database

Prefer:

* Supabase
* PostgreSQL
* PostGIS

### Maps

Prefer:

* OpenStreetMap
* Leaflet
* MapLibre

Evaluate Google Maps only where it provides significant value and remains within a genuinely free/low-cost usage model.

---

# 30. Zero-Cost Principle

A major requirement:

> **I want to build and operate this project without spending money if possible.**

Therefore:

Prioritize:

* Open-source software
* Free tiers
* Free hosting
* Free databases
* Open map data
* Community-supported infrastructure

Potential services to investigate:

* Vercel free tier
* Supabase free tier
* Cloudflare
* OpenStreetMap
* Leaflet
* MapLibre
* GitHub

Do not introduce paid services unless absolutely necessary.

If an API may incur charges, clearly identify it.

Do not silently implement a service that could generate a bill.

---

# 31. API Architecture

Separate external services behind an abstraction layer.

For example:

```text
LocationService
MapService
FloodReportService
GeocodingService
```

This allows the application to replace Google Maps later without rewriting the entire application.

For example:

```text
GeocodingProvider
 ├── OpenStreetMap/Nominatim
 └── Google Maps
```

The same principle should apply to map providers.

---

# 32. Search Architecture

The search should prioritize street-level results.

Implement:

* autocomplete
* fuzzy search
* address normalization
* location ranking
* geographic relevance

For example:

Searching:

> "Commonwealth"

should prioritize:

> Commonwealth Avenue, Quezon City

over:

> Commonwealth, Virginia

when the user is in Metro Manila.

Design the architecture so location bias can be applied.

---

# 33. Current Location

Allow users to use:

> **Use my current location**

Request browser geolocation permission only when necessary.

Do not continuously track the user.

One-time location access is sufficient for:

* searching nearby flood reports
* submitting a report
* centering the map

---

# 34. Report Confidence

Create a confidence calculation that can eventually consider:

* number of reports
* report age
* distance
* agreement between reports
* community validation
* reporter history
* contradictory reports

Example:

```text
Confidence =
report_count
× freshness
× proximity
× agreement
× validation
```

Do not expose the raw mathematical formula to users.

Instead display:

* High confidence
* Medium confidence
* Low confidence

---

# 35. Important Product Principle

Never make the application claim something it cannot verify.

For example:

If nobody has reported flooding on EDSA:

DO NOT say:

> "EDSA is flood-free."

Instead say:

> **No recent flood report**

with:

> "No reports have been received recently in this area."

This distinction is critical because users may make safety decisions based on the information.

---

# 36. Homepage Example

The final experience could conceptually look like:

```text
                    MayBahaBa
                                [ Report Baha ]



                         MAY BAHA BA?



                 [ Search a location... ]


                  Search street, barangay,
                    city, or province


                ─────────────────────


                  Recent Reports
```

After searching:

```text
                 KATIPUNAN AVENUE


                     MAY BAHA


                  Gutter Deep


                 Reported 12 min ago


              High confidence · 4 reports


                  [ View on Map ]
```

---

# 37. Reporting Modal

Conceptually:

```text
Report Baha

Where is the flooding?

[ Search location... ]

[ Use My Location ] [ Pin on Map ]


When?

[ 5:42 PM ]


How deep?

○ Walang Baha
○ Gutter Deep
○ Bukong-bukong
○ Binti
○ Tuhod
○ Hita
○ Baywang
○ Hindi Madaanan


Reported by

[ Optional name / nickname ]

                    [ Submit Report ]
```

Keep the form short.

---

# 38. Validation Interface

Create a simple moderation/validation view.

Example:

```text
Reports to Validate


┌───────────────────────────────┐
│ Katipunan Avenue              │
│                               │
│ 5:31 PM                       │
│ Gutter Deep                   │
│                               │
│ Reported by: Juan             │
│                               │
│ [ ✓ Validate ] [ ✕ Deny ]    │
└───────────────────────────────┘
```

Allow filtering by:

* newest
* nearest
* pending
* flagged
* high priority

---

# 39. Admin vs Public

Separate public functionality from moderation functionality.

Public users:

* Search
* View reports
* Submit reports
* Validate reports if appropriate

Moderators/admins:

* Review reports
* Deny reports
* Flag users/reports
* View report history
* Manage abuse
* View analytics

Do not expose administrative functions through the public interface.

---

# 40. Future Features

Architect the application so these can eventually be added:

### Route Flood Checker

User enters:

> From: Quezon City

> To: Makati

System displays potentially flooded areas along the route.

### Flood Alerts

Allow users to subscribe to alerts for a location.

### Barangay Dashboard

Barangay officials could view reports in their area.

### Historical Flood Map

Show historical reports by date.

### Rainfall Data

Potential integration with public weather/rainfall APIs.

### Government Data

Potential integration with publicly available flood information.

### Community Reputation

Trusted contributors can gain reputation based on validated reports.

### Offline/PWA support

Allow basic access during poor connectivity.

---

# 41. Philippine Localization

The application is specifically intended for the Philippines.

Use:

* Philippine date/time
* Philippine location hierarchy
* Filipino-friendly terminology
* Philippine road/address formats
* Filipino language where appropriate

The primary interface may remain in English if that produces better clarity, but flood classifications and user-facing messaging should use terminology that ordinary Filipino motorists understand.

Consider eventually supporting:

* Filipino
* English
* Taglish
* major regional languages

Do not overbuild localization in V1.

---

# 42. UX Writing

Keep language short and natural.

Avoid:

> "Submit a geographic flood condition report."

Prefer:

> "Report Baha"

Avoid:

> "No flood incidents have been identified within the specified geographic radius."

Prefer:

> "Walang recent na report ng baha dito."

Use language that feels written for actual Filipino motorists.

---

# 43. Error States

Design proper states for:

### No results

> "Hindi namin makita ang lugar."

### No recent reports

> "Walang recent na report ng baha dito."

### Location permission denied

> "Hindi namin makuha ang location mo. Maaari kang mag-search manually."

### Duplicate report

> "May existing report na malapit dito."

### API failure

> "Hindi available ang map service ngayon. Subukan ulit."

### Network failure

> "Mukhang offline ka. Check your connection and try again."

---

# 44. Loading States

Use skeletons or lightweight loading states.

Avoid unnecessary spinners.

Search should feel instant whenever cached data is available.

---

# 45. Performance

Optimize aggressively.

Priorities:

1. Fast initial load
2. Minimal JavaScript
3. Lazy-load maps
4. Cache geocoding results
5. Cache report queries
6. Use spatial database indexes
7. Avoid loading every flood report globally
8. Query reports based on viewport/radius

Do not load thousands of map markers at once.

Consider clustering.

---

# 46. Security

Implement reasonable production security.

Consider:

* API route validation
* server-side validation
* rate limiting
* database row-level security
* input sanitization
* abuse prevention
* secure environment variables
* no exposed API secrets
* protection against unauthorized report modification

Never trust client-side validation alone.

---

# 47. Development Process

Do NOT immediately start writing code.

First:

### Phase 1 — Discovery

Inspect the project structure and determine:

* existing framework
* dependencies
* styling system
* available components
* environment configuration
* deployment configuration

Then propose the architecture.

### Phase 2 — UX Architecture

Define:

* information architecture
* user flows
* page structure
* component structure
* responsive behavior
* states
* edge cases

### Phase 3 — Data Architecture

Define:

* database schema
* relationships
* PostGIS strategy
* report lifecycle
* duplicate detection
* validation logic
* confidence calculation

### Phase 4 — Design System

Create a minimal design system:

* typography
* spacing
* buttons
* inputs
* cards
* badges
* modal
* map controls
* status indicators

### Phase 5 — Implementation

Implement the MVP.

### Phase 6 — Testing

Test:

* mobile
* desktop
* location search
* report submission
* duplicate detection
* map interaction
* validation
* stale reports
* accessibility
* network failures

---

# 48. MVP Scope

Do NOT overbuild V1.

The first version should focus on:

### MUST HAVE

* Homepage
* Location search
* Flood status
* Recent reports
* Report Baha modal
* Map location selection
* Geolocation
* Database
* Duplicate detection
* Report expiration
* Basic validation
* Responsive mobile UI
* Interactive map

### SHOULD HAVE

* Confidence score
* Report clustering
* Current location
* Abuse prevention
* Basic moderation

### FUTURE

* Route analysis
* Push notifications
* Government integrations
* Weather integrations
* Historical heatmaps
* User reputation
* Barangay dashboards

---

# 49. Engineering Expectations

Write clean, maintainable, production-quality code.

Use:

* TypeScript
* reusable components
* proper types
* server-side validation
* environment variables
* clear separation of concerns
* modular services
* reusable hooks where appropriate

Avoid:

* giant components
* hardcoded configuration
* duplicated logic
* unnecessary dependencies
* premature abstractions
* fake data presented as real data

If external API credentials are unavailable, create a clean provider interface and a development/mock implementation rather than pretending the integration works.

---

# 50. Data Integrity

Do not fabricate flood reports.

During development, clearly distinguish:

```text
DEMO DATA
```

from:

```text
LIVE COMMUNITY REPORT
```

If seed data is required, label it clearly.

---

# 51. Environment Variables

Document all required environment variables.

For example:

```text
DATABASE_URL=
NEXT_PUBLIC_MAP_PROVIDER=
MAP_API_KEY=
GEOCODING_API_KEY=
```

Never commit secrets.

Provide a `.env.example`.

---

# 52. Documentation

Create a README explaining:

* what MayBahaBa is
* architecture
* setup
* local development
* database setup
* PostGIS setup
* map provider setup
* environment variables
* deployment
* free-tier considerations
* API limitations
* future roadmap

Also document any service that could potentially incur charges.

---

# 53. Important Cost Constraint

Before selecting a third-party service, ask:

> Can this be done using a free/open-source alternative?

If yes, prefer the free/open-source option.

If no, explain why.

Do not introduce paid infrastructure simply because it is easier.

The goal is:

> **₱0 operating cost for the MVP whenever technically possible.**

---

# 54. Product Philosophy

The most important principle is:

> **MayBahaBa is not trying to predict flooding. It is trying to make current community observations easy to find and share.**

The platform should clearly distinguish:

**Reported information**

from:

**Predictions**

and:

**Historical flood risk**

Do not mix these concepts in a confusing way.

---

# 55. Success Criteria

The MVP is successful if a motorist can:

### In under 10 seconds:

1. Search a location
2. Determine whether there is a recent flood report
3. Understand approximately how deep the water is
4. See how recent the report is
5. View the location on a map

And another user can:

### In under 30 seconds:

1. Open Report Baha
2. Select a location
3. Select flood depth
4. Submit the report

---

# 56. Final Instruction to Claude Code

Approach this project as if you are building a real public-facing product, not a coding demo.

Before implementation:

1. Inspect the repository.
2. Identify the current stack.
3. Identify what can be reused.
4. Recommend the cheapest/free architecture.
5. Identify any potentially billable services.
6. Propose the database schema.
7. Propose the UX architecture.
8. Explain your technical decisions briefly.
9. Then implement the MVP.

When making design decisions, prioritize:

**Simplicity > features**

**Accuracy > visual decoration**

**Freshness > historical assumptions**

**Community trust > vanity metrics**

**Free/open source > paid services**

**Mobile usability > desktop complexity**

---

# 57. Brand Direction

The visual identity should communicate:

**"Know before you go."**

Potential supporting tagline:

> **Alamin bago bumiyahe.**

Alternative:

> **May baha ba sa dadaanan mo?**

Keep the brand approachable and community-focused.

Do not make it look like a government website.

Do not make it look like a generic weather application.

It should feel like a **modern Filipino public utility powered by the community**.

---

# FINAL DELIVERABLE

Build the working MVP of **MayBahaBa**.

Do not stop at mockups.

The final implementation should include:

* responsive UI
* working search
* working map
* working location selection
* working flood report submission
* database integration
* duplicate detection
* report freshness
* validation workflow
* clean architecture
* accessible UI
* mobile-first experience
* README/documentation
* `.env.example`

If an external API cannot be configured because credentials are unavailable, implement the integration boundary properly and provide a clear setup path instead of hardcoding or fabricating results.

Most importantly:

**Build something that a Filipino motorist could genuinely use before deciding whether to drive through a particular road.**
