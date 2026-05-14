# Multimodal Product Intelligence Frontend

The official Next.js client for the **Autonomous Multi-Agent Product Intelligence API**. This UI is designed to showcase the capabilities of a 5-agent AI pipeline in a clean, professional, and visually stunning interface.

## Features

This application features 5 distinct modules accessible via a top-level tab navigation, each corresponding to an AI Agent:

- 🔍 **Product Analysis (Agent 1)**: Drag-and-drop image upload that instantly returns structured JSON metadata (titles, descriptions, tags) and flags visual duplicates in real-time using vector similarity.
- 📊 **Market Researcher (Agent 2)**: Scans a target product against a Qdrant vector database of competitors, returning Market Positioning, Average Market Price, and individual competitor Threat Levels.
- 🤖 **Twin Simulator (Agent 3)**: The ultimate "recruiter bait". Upload a product and the AI generates synthetic shopper personas (twins), simulates their emotional reactions, and calculates their purchase probability.
- 💰 **Pricing Strategist (Agent 4)**: A calculator interface that ingests Market Data and Customer Twin Data to determine the mathematically ideal Price Point and Margin Risk.
- 📢 **Ad Campaign Builder (Agent 5)**: Enter a budget and target audience, and the backend uses concurrent threading to instantly write 5 bespoke marketing campaigns (Facebook, Instagram, Google Shopping, WhatsApp, Email).

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Upload**: React Dropzone
- **HTTP Client**: Axios

## Quick Start

### Prerequisites
- Node.js 18+
- The Backend API running locally at `http://localhost:8000`

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Run the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```text
├── src/
│   ├── app/
│   │   ├── layout.tsx             ← Root layout with Tailwind config
│   │   ├── page.tsx               ← Main application holding the 5 Tab views
│   │   └── globals.css            ← Global styles
│   ├── components/
│   │   ├── DropZone.tsx           ← Agent 1 Upload
│   │   ├── ResultPanel.tsx        ← Agent 1 Results
│   │   ├── MarketResearcher.tsx   ← Agent 2 Upload
│   │   ├── MarketResults.tsx      ← Agent 2 Results
│   │   ├── TwinSimulator.tsx      ← Agent 3 Upload
│   │   ├── TwinResults.tsx        ← Agent 3 Results
│   │   ├── PricingStrategist.tsx  ← Agent 4 Upload
│   │   ├── PricingResults.tsx     ← Agent 4 Results
│   │   ├── CampaignBuilder.tsx    ← Agent 5 Upload
│   │   └── CampaignResults.tsx    ← Agent 5 Results
│   └── lib/
│       └── api.ts                 ← Axios API configuration & endpoints
├── package.json
└── tailwind.config.ts
```

## License

MIT
