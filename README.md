# PDF Extractor - Frontend

## What This Does
A web app where you can upload a PDF, see all its pages, select which ones you want, and download a new PDF with only those pages.

## How It Works (User Flow)

### Step 1: Upload PDF
1. Click "Choose File" button
2. Select a PDF from your computer
3. Only PDF files are allowed
4. File uploads to the server

### Step 2: View Pages
1. After upload, all PDF pages appear as thumbnails
2. Each page shows a preview image
3. Pages are displayed in a grid (2 columns on mobile, 3-4 on desktop)

### Step 3: Select Pages
1. Click on the pages you want to keep
2. Selected pages get a blue border and checkmark
3. Click again to deselect
4. You can select as many or as few as you want

### Step 4: Extract & Download
1. Click the "Extract X Pages" button
2. Server creates a new PDF with only your selected pages
3. A download notification appears at the bottom-right
4. Click "Download extracted file" to save it

## Tech Stack
- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **react-pdf** - PDF rendering in browser
- **Axios** - API calls to backend

## Setup & Run

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
App runs on: `http://localhost:5173` (or 5174 if 5173 is busy)

### Build for Production
```bash
npm run build
```

## Components

### `Home.tsx`
Main page that manages the entire flow:
- Handles file upload
- Tracks selected pages
- Calls backend APIs
- Shows download link

### `UploadForm.tsx`
File upload component:
- File input with PDF validation
- Only accepts `.pdf` files
- Triggers upload on file selection

### `PdfPreview.tsx`
Displays all PDF pages:
- Uses `react-pdf` to render pages
- Shows thumbnails in a responsive grid
- Manages page selection state

### `PageCard.tsx`
Individual page thumbnail:
- Shows page preview
- Checkbox for selection
- Blue border when selected
- Click anywhere to toggle

## Folder Structure
```
client/
├── src/
│   ├── App.tsx             # Main app component
│   ├── App.css             # All styling
│   ├── index.css           # Global styles
│   ├── pages/
│   │   └── Home.tsx        # Main page
│   ├── components/
│   │   ├── UploadForm.tsx  # Upload UI
│   │   ├── PdfPreview.tsx  # PDF viewer
│   │   └── PageCard.tsx    # Page thumbnail
│   └── services/
│       └── api.ts          # Backend API calls
└── package.json
```

## How Frontend Talks to Backend

### 1. Upload
```javascript
POST /api/pdf/upload
→ Sends PDF file
← Gets back fileId
```

### 2. Extract
```javascript
POST /api/pdf/extract
→ Sends { fileId, pages: [1, 3, 5] }
← Gets back downloadUrl
```

### 3. Download
```javascript
GET /api/pdf/download/extracted-123.pdf
→ Direct download link
← PDF file
```

## Responsive Design
- **Mobile (< 768px)**: 2 columns
- **Tablet (768px - 1024px)**: 3 columns  
- **Desktop (> 1024px)**: 4 columns

All pages auto-adjust to screen size!

## Notes
- PDF worker loads from CDN (unpkg.com)
- Styling is done with custom CSS (no Tailwind needed)
- All state managed with React hooks
- TypeScript ensures type safety
