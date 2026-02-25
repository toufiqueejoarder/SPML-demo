# SPML Demo - Secure Property Management Limited

A fully functional demo website for SPML's Next-Gen Real Estate Digital Ecosystem.

## Features

### Public Website
- Modern landing page with hero, features, and testimonials
- Property listings with filters, search, and grid/list views
- Property detail pages with ROI calculator and milestone tracker
- Contact page with inquiry form
- About page with company information

### Investor Portal
- Dashboard with investment summary and appreciation tracking
- Document vault for secure document access
- Payments & financial ledger with installment tracking
- Profile & KYC verification management
- Resale marketplace access
- Rental management for property owners

### Admin Panel
- KPI dashboard with charts and statistics
- Marketing analytics with traffic and conversion data
- Inventory management with real-time tracking
- Lead management with AI-powered scoring
- Demand heatmap visualization
- Availability gap analysis
- Drip campaign management
- User management with KYC verification
- Support ticket system

### Demo Control Panel
Access via `/demo-controls` or by clicking the settings icon on the Demo Environment indicator.

- **Role Switching**: Toggle between Public, Investor, and Admin views
- **Investor Selection**: Switch between different investor accounts
- **State Toggles**: Control payment status, demand levels, and lead distribution
- **Event Triggers**: Simulate payments, mark overdue, add leads, advance milestones
- **Data Reset**: Restore all data to initial state

### Interactive Elements
- AI-powered chat widget (simulated responses)
- Toast notifications for actions
- Payment modal with multiple options
- Real-time data consistency across all pages

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Context + localStorage
- **Date Handling**: date-fns

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── (admin)/admin/      # Admin panel pages
│   ├── (investor)/investor/ # Investor portal pages
│   ├── properties/          # Property pages
│   ├── contact/             # Contact page
│   ├── about/               # About page
│   ├── demo-controls/       # Demo control panel
│   └── page.tsx             # Landing page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── demo/                # Demo-specific components
│   └── shared/              # Shared components
├── contexts/
│   └── DemoStateContext.tsx # Centralized state management
├── lib/
│   ├── demo-data.ts         # Mock data
│   └── utils.ts             # Utility functions
└── styles/
    └── globals.css          # Global styles
```

## Demo Data

The demo includes realistic mock data for:
- 3 property projects (Bashundhara, Purbachal, Secure Green)
- 3 investor accounts with different KYC statuses
- 30 leads with various scores (HOT/WARM/COLD)
- Resale listings and rental units
- Support tickets and analytics data

## Key URLs

| Page | URL |
|------|-----|
| Landing Page | `/` |
| Properties | `/properties` |
| Property Detail | `/properties/[id]` |
| Contact | `/contact` |
| About | `/about` |
| Investor Dashboard | `/investor/dashboard` |
| Admin Dashboard | `/admin/dashboard` |
| Demo Controls | `/demo-controls` |

## Notes

- All data is stored in localStorage and persists between sessions
- Use the Demo Control Panel to reset data or simulate scenarios
- The "Demo Environment" indicator reminds users that all data is simulated
- The AI chat widget provides simulated responses for common questions

## License

Private - For demonstration purposes only.
