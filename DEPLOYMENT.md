# Deployment Guide

## Backend (Render)
The backend is hosted on Render at:
```
https://api-pdfextractor.onrender.com
```

## Frontend (Netlify)

### Environment Variables
Configure the following environment variable in Netlify:

**Key:** `VITE_API_URL`  
**Value:** `https://api-pdfextractor.onrender.com/api`

### Steps to Deploy on Netlify

1. **Connect Repository**
   - Go to Netlify Dashboard
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository

2. **Build Settings**
   - **Base directory:** `client`
   - **Build command:** `npm run build`
   - **Publish directory:** `client/dist`

3. **Environment Variables**
   - Go to Site settings → Environment variables
   - Add: `VITE_API_URL` = `https://api-pdfextractor.onrender.com/api`

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy

### Local Development

For local development, create a `.env` file in the `client` directory:

```bash
VITE_API_URL=http://localhost:5000/api
```

Then run:
```bash
npm install
npm run dev
```

### Important Notes

- The `.env` file is git-ignored and should never be committed
- Use `.env.example` as a template for local setup
- The production API URL is configured in Netlify's environment variables
- Vite requires environment variables to be prefixed with `VITE_`

### Troubleshooting

**Issue:** API calls failing  
**Solution:** Verify `VITE_API_URL` is set correctly in Netlify environment variables

**Issue:** CORS errors  
**Solution:** Ensure backend CORS settings allow requests from your Netlify domain

**Issue:** Build fails  
**Solution:** Check that all dependencies are in `package.json` and build command is correct
