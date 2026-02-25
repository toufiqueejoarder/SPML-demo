# SPML Demo - Complete Guide & Verification Documentation

**Live Demo URL:** https://toufiqueejoarder.github.io/SPML-demo/  
**Repository:** https://github.com/toufiqueejoarder/SPML-demo

---

## Table of Contents

1. [Demo Website Feature Guide](#1-demo-website-feature-guide)
2. [GitHub Deployment Verification Checklist](#2-github-deployment-verification-checklist)
3. [Mock Data & System Consistency Confirmation](#3-mock-data--system-consistency-confirmation)
4. [Demo-Only Scope & Limitations](#4-demo-only-scope--limitations)
5. [Final Demo Readiness Summary](#5-final-demo-readiness-summary)

---

## 1. Demo Website Feature Guide

This section explains all features available in the demo, organized by portal, with guidance on how to showcase each during a live presentation.

### 1.1 Public Website

| Feature | Location | What It Demonstrates | How to Showcase |
|---------|----------|---------------------|-----------------|
| **Hero Section** | Homepage (`/`) | Brand positioning, value proposition | Scroll through the landing page to show professional design and messaging |
| **Feature Highlights** | Homepage - Features section | Platform capabilities overview | Point out the 6 core platform features with icons |
| **Statistics Counter** | Homepage - Stats section | Company credibility (180+ investors, 500+ crore managed) | Highlight these trust-building metrics |
| **Featured Projects** | Homepage - Projects section | Property showcase with key details | Click on any project card to navigate to details |
| **Property Listings** | `/properties/` | Full property catalog with filters | Use the search bar, price slider, and availability filter |
| **Grid/List Views** | `/properties/` | Flexible browsing options | Toggle between grid and list view buttons |
| **Property Details** | `/properties/[id]/` | Comprehensive property information | Navigate to any property to show all tabs |
| **Image Gallery** | Property detail page | Visual property showcase | Click thumbnail images to change main display |
| **ROI Calculator** | Property detail - Right sidebar | Investment projection tool | Drag the "Investment Size" slider to show value calculations |
| **Milestone Tracker** | Property detail - Progress tab | Project development transparency | Click the "Progress" tab to show completion status |
| **Live Surveillance** | Property detail - Live View tab | Construction monitoring capability | Click "Live View" tab (shows placeholder with LIVE badge) |
| **Nearby Places** | Property detail - Nearby tab | Neighborhood intelligence | Shows schools, hospitals, transport with distances |
| **About Page** | `/about/` | Company story, values, leadership | Scroll to show timeline and team section |
| **Contact Page** | `/contact/` | Multi-channel communication | Show inquiry form, WhatsApp support, site visit scheduling |
| **AI Chat Widget** | Floating button (bottom-right) | AI-powered customer support | Click the chat bubble, type a question like "What properties are available?" |

### 1.2 Investor Portal

Access via: Click "Investor Portal" in the header navigation

| Feature | Location | What It Demonstrates | How to Showcase |
|---------|----------|---------------------|-----------------|
| **Investment Dashboard** | `/investor/dashboard/` | Portfolio overview at a glance | Show total investment, appreciation, property cards |
| **Investor Selector** | Sidebar dropdown | Multi-account management | Switch between "Rahman Family Trust" and "Karim Holdings" |
| **KYC Status Badge** | Sidebar (under investor name) | Compliance verification display | Point out "KYC Verified" badge |
| **Payment Progress** | Dashboard - Payment section | Installment tracking | Show progress bars for each property |
| **Overdue Alerts** | Dashboard - Alerts section | Smart notification system | Use Demo Controls to toggle overdue status, then refresh |
| **Financial Ledger** | `/investor/payments/` | Complete payment history | Show paid/upcoming/overdue installments in table |
| **Make Payment Modal** | Payments page - "Pay Now" button | Payment simulation | Click "Pay Now" to open modal (demo-only) |
| **Document Vault** | `/investor/documents/` | Secure document storage | Show document list with download buttons |
| **Document Search** | Documents page - Search box | Quick document retrieval | Type a document name to filter |
| **Investor Profile** | `/investor/profile/` | Account management | Show personal info, notification preferences |
| **KYC Verification** | Profile page - KYC section | Compliance process | Shows verification status and steps |
| **Resale Market** | `/investor/resale/` | Secondary market access | Show active listings, list property option |
| **Rental Management** | `/investor/rental/` | Property rental services | Show tenant info, rent history, maintenance tickets |

### 1.3 Admin Panel

Access via: Click "Admin Panel" in the header navigation

| Feature | Location | What It Demonstrates | How to Showcase |
|---------|----------|---------------------|-----------------|
| **KPI Dashboard** | `/admin/dashboard/` | Executive-level analytics | Show all metric cards with real-time data |
| **Monthly Collections Chart** | Dashboard - Bar chart | Revenue tracking | Hover over bars to show tooltips with values |
| **Lead Distribution Pie** | Dashboard - Pie chart | Pipeline visualization | Point out HOT/WARM/COLD distribution |
| **Support Overview** | Dashboard - Tickets section | Support metrics | Show ticket counts by status |
| **Inventory Management** | `/admin/inventory/` | Property inventory control | Show all projects with unit breakdowns |
| **Inventory Stats** | Inventory page - Project cards | Availability tracking | Point out sold/booked/available counts |
| **Lead Management** | `/admin/leads/` | CRM functionality | Show lead table with all details |
| **Lead Filtering** | Leads page - Filter buttons | Lead prioritization | Click HOT/WARM/COLD filter buttons |
| **Add New Lead** | Leads page - "Add Lead" button | Lead capture | Opens modal with lead form |
| **Demand Heatmap** | `/admin/heatmap/` | Market intelligence | Show regional demand visualization |
| **Marketing Analytics** | `/admin/analytics/` | Traffic and conversion metrics | Show source breakdown, conversion funnel |
| **Gap Analysis** | `/admin/gap-analysis/` | Inventory-demand alignment | Show supply vs demand comparison |
| **Drip Campaigns** | `/admin/drip-campaigns/` | Automated marketing | Show campaign list and email sequences |
| **User Management** | `/admin/users/` | Customer database | Show investor list with KYC status |
| **Support Tickets** | `/admin/tickets/` | Customer support queue | Show ticket list, status filters |

### 1.4 Internal Demo Control Panel

**Access:** Navigate to `/demo-controls/` (not visible in navigation - for presenters only)

| Control | What It Does | When to Use |
|---------|-------------|-------------|
| **Role Switcher** | Changes active portal (Public/Investor/Admin) | To quickly navigate between views |
| **Investor Selector** | Switches between demo investor accounts | To show different portfolio scenarios |
| **Payment Status Toggle** | Sets all payments to Paid/Upcoming/Overdue | To demonstrate payment states and alerts |
| **Demand Level Toggle** | Switches between Normal/High demand | To show "Only X Left" badges on properties |
| **Lead Distribution Toggle** | Changes lead score distribution | To show different pipeline scenarios |
| **Demo Indicator Toggle** | Shows/hides the "Demo Environment" badge | Turn off for cleaner screenshots |
| **Simulate Payment** | Marks next upcoming installment as paid | To demonstrate payment flow |
| **Mark Overdue** | Marks next upcoming installment as overdue | To trigger overdue alerts |
| **Add Random Lead** | Generates a new lead with random data | To demonstrate lead capture |
| **Advance Milestone** | Progresses project to next milestone | To show milestone tracker updates |
| **Reset All Data** | Returns all data to initial state | To start fresh for a new demo |

**Quick Links Panel:** Direct navigation buttons to all portals from the control panel.

---

## 2. GitHub Deployment Verification Checklist

Use this checklist immediately after pushing to GitHub to verify the deployment.

### 2.1 Initial Load Verification

- [ ] Navigate to https://toufiqueejoarder.github.io/SPML-demo/
- [ ] Page loads without errors (no blank screen)
- [ ] SPML logo and header appear correctly
- [ ] Hero section displays with background image
- [ ] "Demo Environment" badge appears in bottom-left corner
- [ ] AI Chat widget button appears in bottom-right corner

### 2.2 Route Navigation

- [ ] **Homepage:** `/` loads correctly
- [ ] **Properties List:** `/properties/` shows all project cards
- [ ] **Property Detail:** `/properties/bashundhara/` loads with tabs
- [ ] **About Page:** `/about/` shows company information
- [ ] **Contact Page:** `/contact/` shows contact form
- [ ] **Investor Dashboard:** `/investor/dashboard/` loads with data
- [ ] **Investor Payments:** `/investor/payments/` shows installment table
- [ ] **Investor Documents:** `/investor/documents/` shows document list
- [ ] **Investor Profile:** `/investor/profile/` shows profile form
- [ ] **Investor Resale:** `/investor/resale/` shows resale listings
- [ ] **Investor Rental:** `/investor/rental/` shows rental units
- [ ] **Admin Dashboard:** `/admin/dashboard/` loads with charts
- [ ] **Admin Inventory:** `/admin/inventory/` shows project list
- [ ] **Admin Leads:** `/admin/leads/` shows lead table
- [ ] **Admin Analytics:** `/admin/analytics/` shows traffic data
- [ ] **Admin Heatmap:** `/admin/heatmap/` shows demand visualization
- [ ] **Admin Gap Analysis:** `/admin/gap-analysis/` shows comparison charts
- [ ] **Admin Drip Campaigns:** `/admin/drip-campaigns/` shows campaign list
- [ ] **Admin Users:** `/admin/users/` shows user list
- [ ] **Admin Tickets:** `/admin/tickets/` shows support tickets
- [ ] **Demo Controls:** `/demo-controls/` loads control panel

### 2.3 Navigation Functionality

- [ ] Header navigation links work across all pages
- [ ] "Investor Portal" button navigates to investor dashboard
- [ ] "Admin Panel" button navigates to admin dashboard
- [ ] Back buttons return to previous pages
- [ ] Sidebar navigation works in investor portal
- [ ] Sidebar navigation works in admin panel
- [ ] Demo indicator "Control Panel" link navigates correctly

### 2.4 Charts and Visualizations

- [ ] Admin dashboard bar chart renders (Monthly Collections)
- [ ] Admin dashboard pie chart renders (Lead Distribution)
- [ ] Admin analytics line chart renders (Website Traffic)
- [ ] Admin analytics funnel chart renders (Conversion Funnel)
- [ ] Admin gap analysis bar charts render
- [ ] Progress bars display in investor dashboard
- [ ] Milestone tracker displays in property detail page

### 2.5 Interactive Elements

- [ ] Property search/filter works on `/properties/`
- [ ] Price range slider filters properties
- [ ] Availability dropdown filters properties
- [ ] Grid/List view toggle works
- [ ] Property image gallery thumbnail clicking works
- [ ] ROI Calculator slider updates calculations
- [ ] Property detail tabs switch content
- [ ] Investor selector dropdown changes displayed data
- [ ] Lead filter buttons (HOT/WARM/COLD) filter table
- [ ] Support ticket status filter works
- [ ] Add Lead modal opens and submits
- [ ] Pay Now modal opens on payments page

### 2.6 Demo Control Panel Verification

- [ ] Role switcher changes active role
- [ ] Payment status toggle updates investor data
- [ ] Demand level toggle shows "high demand" badges
- [ ] Simulate Payment button works with toast notification
- [ ] Mark Overdue button works with warning toast
- [ ] Add Lead button creates new lead
- [ ] Advance Milestone button progresses project
- [ ] Reset All button restores initial data
- [ ] Demo indicator toggle shows/hides badge
- [ ] All Quick Links navigate correctly

### 2.7 State Persistence

- [ ] Refresh page - data persists (localStorage working)
- [ ] Navigate away and return - state maintained
- [ ] Close browser, reopen - state restored
- [ ] Reset All - state clears and reinitializes

---

## 3. Mock Data & System Consistency Confirmation

### 3.1 How Data Consistency is Guaranteed

The demo uses a **centralized state management architecture** that ensures all data remains consistent across views:

```
┌─────────────────────────────────────────────────────────────┐
│                    DemoStateContext                         │
│  (Single Source of Truth - React Context + useReducer)      │
├─────────────────────────────────────────────────────────────┤
│  State:                                                     │
│  ├── projects[]      (3 properties with inventory counts)  │
│  ├── investors[]     (2 demo accounts with portfolios)     │
│  ├── leads[]         (12 leads with scores/status)         │
│  ├── resaleListings[]  (secondary market listings)         │
│  ├── rentalUnits[]     (rental properties)                 │
│  ├── supportTickets[]  (customer support queue)            │
│  └── settings{}        (demo controls: role, status, etc.) │
├─────────────────────────────────────────────────────────────┤
│  All components read from this single state                 │
│  All updates go through dispatch actions                    │
│  localStorage syncs state for persistence                   │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Initialization Confirmation

**On First Load:**
1. `DemoStateContext` initializes with data from `demo-data.ts`
2. If localStorage has saved state, it loads that instead
3. All components receive the same consistent data via React Context

**Sample Data Included:**
- 3 Projects: Bashundhara Residences, Purbachal City, Secure Green Valley
- 2 Investors: Rahman Family Trust, Karim Holdings
- 12 Leads: Mix of HOT/WARM/COLD scores
- 2 Resale Listings: Properties on secondary market
- 2 Rental Units: With tenant and rent history data
- 5 Support Tickets: Various statuses

### 3.3 Inventory Consistency

**Guarantee:** `soldUnits + bookedUnits + availableUnits = totalUnits`

| Project | Total | Sold | Booked | Available | Consistent? |
|---------|-------|------|--------|-----------|-------------|
| Bashundhara Residences | 50 | 35 | 5 | 10 | ✓ (50=35+5+10) |
| Purbachal City | 120 | 75 | 20 | 25 | ✓ (120=75+20+25) |
| Secure Green Valley | 80 | 20 | 10 | 50 | ✓ (80=20+10+50) |

**Where Inventory Appears:**
- Property listings (`/properties/`) - shows available count
- Property detail pages - shows all three counts
- Admin inventory (`/admin/inventory/`) - shows full breakdown
- Admin dashboard - shows total stats

### 3.4 Payment Consistency

**How Payments Propagate:**

When "Simulate Payment" is triggered:
1. `SIMULATE_PAYMENT` action dispatched with investorId and installmentId
2. Reducer finds the specific installment and sets `status: 'paid'`, `paidDate: today`
3. State update propagates to ALL components:
   - Investor dashboard progress bars update
   - Payments page ledger shows "Paid" status
   - Admin dashboard KPIs recalculate
   - Charts re-render with new data

**Verification Path:**
1. Go to Demo Controls → Click "Simulate Payment"
2. Check Investor Dashboard → Progress bar increases
3. Check Investor Payments → Installment shows "Paid"
4. Check Admin Dashboard → Collection metrics update

### 3.5 Lead Score Consistency

**Lead Scores Are Consistent Across:**
- Admin Leads page (`/admin/leads/`) - Full lead table
- Admin Dashboard - Lead distribution pie chart
- Admin Drip Campaigns - Lead counts by stage
- Demo Controls - Lead distribution toggle

**When Lead Distribution Toggle Changes:**
1. `SET_LEAD_DISTRIBUTION` action dispatched
2. Reducer reassigns lead scores based on distribution profile
3. All views immediately reflect new distribution

### 3.6 Reset Functionality

**What "Reset All" Does:**
1. Clears localStorage
2. Reinitializes state from `demo-data.ts` default values
3. All settings return to defaults:
   - Role: Public
   - Investor: Rahman Family Trust
   - Payment Status: Upcoming
   - Demand Level: Normal
   - Lead Distribution: Balanced
   - Demo Indicator: Visible

**Verification:** After reset, all pages show original sample data.

---

## 4. Demo-Only Scope & Limitations

### 4.1 Simulated Features (Non-Functional)

| Feature | What Appears to Work | Actual Behavior |
|---------|---------------------|-----------------|
| **Payments** | "Pay Now" button, payment modal | No real payment processing; updates local state only |
| **Document Downloads** | Download buttons on documents | No actual file download (placeholder URLs) |
| **AI Chat** | Chat widget with responses | Pre-programmed responses, no actual AI |
| **WhatsApp Support** | WhatsApp button on contact page | Would open WhatsApp on real device; demo only shows button |
| **Site Visit Scheduling** | Calendar selection in contact form | No backend to process bookings |
| **Email Notifications** | Preference toggles in profile | No actual email sending |
| **SMS Notifications** | Preference toggles in profile | No actual SMS sending |
| **Brochure Downloads** | Download buttons | Placeholder - no actual PDF |
| **KYC Document Upload** | KYC section in profile | UI only; no file upload |
| **Live Surveillance** | "LIVE" badge with image | Static image, not live feed |
| **Drone Footage** | "View Drone Footage" button | No actual video playback |

### 4.2 Placeholder Content

| Element | Description |
|---------|-------------|
| **Property Images** | Unsplash stock photos (not actual SPML properties) |
| **Map Views** | Static placeholder (no interactive map) |
| **Phone Numbers** | Sample numbers (not real contacts) |
| **Email Addresses** | Sample emails (not monitored) |
| **Document URLs** | Placeholder paths (no actual documents) |
| **Transaction IDs** | Generated sample IDs |
| **Bank Details** | Fictitious account information |

### 4.3 Demo-Only Shortcuts

1. **No Authentication:** All portals accessible without login
2. **Instant Role Switching:** No session management or permissions
3. **Immediate State Updates:** No server latency or async operations
4. **No Data Validation:** Forms accept any input without validation
5. **No Rate Limiting:** Actions can be triggered repeatedly
6. **No Audit Trail:** Actions are not logged or timestamped

### 4.4 What This Demo Does NOT Include

- Backend server or database
- User authentication system
- Real payment gateway integration
- Actual document storage
- Live data feeds
- Push notifications
- Email/SMS infrastructure
- Multi-user concurrency
- Mobile native apps
- API endpoints

---

## 5. Final Demo Readiness Summary

### 5.1 Stability Confirmation

| Aspect | Status | Notes |
|--------|--------|-------|
| **Static Build** | ✓ Verified | `output: 'export'` in next.config.ts |
| **GitHub Pages Hosting** | ✓ Deployed | Automated via GitHub Actions |
| **No Server Dependencies** | ✓ Confirmed | Pure client-side JavaScript |
| **No Environment Variables** | ✓ Confirmed | No .env files required |
| **All Routes Pre-rendered** | ✓ Configured | generateStaticParams for dynamic routes |
| **Browser Compatibility** | ✓ Standard | Modern browsers (Chrome, Firefox, Safari, Edge) |

### 5.2 Feature-to-Proposal Mapping

| Proposal Section | Demo Implementation |
|-----------------|---------------------|
| **Customer-Facing Platform** | Public website, property listings, ROI calculator, contact forms |
| **Investor Portal** | Dashboard, payments, documents, profile management |
| **Admin Panel** | KPI dashboard, inventory, leads, analytics, support |
| **Property Visualization** | Image galleries, milestone tracker, amenity lists |
| **Market Intelligence** | Demand heatmap, gap analysis, marketing analytics |
| **Lead Management** | Lead table, scoring, filtering, drip campaigns |
| **Payment Management** | Installment tracking, payment simulation, ledger |
| **Document Management** | Document vault, search, download (simulated) |
| **Resale/Secondary Market** | Listing browser, property listing capability |
| **Rental Management** | Tenant info, rent tracking, maintenance tickets |
| **AI-Powered Support** | Chat widget with contextual responses |
| **Notification System** | Toast notifications, alert banners |

### 5.3 Demo Safety Features

| Feature | Implementation |
|---------|----------------|
| **Fully Resettable** | "Reset All Data" button restores clean state |
| **No Real Transactions** | All financial actions are simulated |
| **No External Calls** | No APIs, webhooks, or third-party services |
| **Isolated State** | Uses browser localStorage only |
| **Clear Demo Indicator** | "Demo Environment" badge visible by default |
| **No Data Collection** | No analytics or tracking enabled |

### 5.4 Pre-Demo Checklist

Before each live demo:

1. [ ] Navigate to `/demo-controls/`
2. [ ] Click "Reset All Data" to start fresh
3. [ ] Verify demo indicator is visible (or hide for screenshots)
4. [ ] Test quick navigation through all portals
5. [ ] Prepare talking points for each feature
6. [ ] Have this guide available for reference

### 5.5 Recommended Demo Flow

1. **Start at Homepage** (2 min)
   - Show hero, features, stats, projects
   - Demonstrate AI chat widget

2. **Property Exploration** (3 min)
   - Filter properties by availability
   - Open property detail, show all tabs
   - Use ROI calculator

3. **Investor Portal** (3 min)
   - Show dashboard with portfolio overview
   - View payment history and upcoming
   - Browse document vault

4. **Admin Panel** (3 min)
   - Show KPI dashboard with charts
   - View lead management
   - Demonstrate inventory view

5. **Demo Controls** (2 min)
   - Show how states can be toggled
   - Simulate a payment, show propagation
   - Demonstrate reset capability

6. **Q&A** (5+ min)
   - Navigate to specific features as requested
   - Reference this guide for scope questions

### 5.6 Important Disclaimers for Stakeholders

**State Clearly During Presentation:**

> "This is a frontend demonstration prototype. All data shown is simulated for illustration purposes. The demo showcases the proposed user experience and feature set. Actual implementation would require backend development, third-party integrations, security implementations, and compliance measures not included in this demo."

> "Financial figures, property details, and investor information are fictional examples created to demonstrate system capabilities."

> "Interactive features like payments, document downloads, and AI responses are simulated to show intended behavior."

---

## Appendix: Technical Reference

### File Structure
```
spml-demo/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── (admin)/           # Admin panel routes
│   │   ├── (investor)/        # Investor portal routes
│   │   ├── properties/        # Property listing/detail
│   │   ├── demo-controls/     # Demo control panel
│   │   └── ...
│   ├── components/            # Reusable UI components
│   ├── contexts/              # React Context (state management)
│   └── lib/                   # Mock data and utilities
├── .github/workflows/         # GitHub Actions for deployment
└── next.config.ts             # Static export configuration
```

### Key Technologies
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Charts:** Recharts
- **Icons:** Lucide React
- **State:** React Context + useReducer
- **Persistence:** localStorage

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

*Document Version: 1.0*  
*Last Updated: February 2026*  
*For Internal Use During Demo Presentations*
