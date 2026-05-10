# Multimodal Product Intelligence Frontend

Next.js frontend for AI-powered product image analysis with drag-and-drop upload, real-time results, and visual search.

This is the client application for the [Multimodal Product Intelligence API](https://github.com/Abdullah-Masood-05/multimodal-product-intelligence-api).

## Features

- **Drag-and-Drop Upload**: Clean, interactive zone for uploading product images.
- **Real-time Processing**: Loading states while the backend analyzes the image.
- **Structured Results**: Elegant display of AI-generated titles, descriptions, categories, tags, and pricing estimates.
- **Responsive Design**: Built with Tailwind CSS for mobile-friendly layouts.

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

```
├── src/
│   ├── app/
│   │   ├── layout.tsx         ← Root layout with Tailwind config
│   │   ├── page.tsx           ← Main application page
│   │   └── globals.css        ← Global styles
│   ├── components/
│   │   ├── DropZone.tsx       ← Drag-and-drop image upload
│   │   └── ResultPanel.tsx    ← Display for AI analysis results
│   └── lib/
│       └── api.ts             ← Axios configuration and API calls
├── package.json
└── tailwind.config.ts
```

## License

MIT
