# Quick Start Guide

## Installation & Running

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit http://localhost:3000

## Usage

1. Upload a document (PDF, DOCX, or TXT) by dragging it into the upload area or clicking "Browse Files"
2. Click "Upload and Censor" to process the document
3. View the results showing original and censored text side-by-side
4. Click "Download" to save the censored text as a .txt file

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or push to GitHub and connect your repository at https://vercel.com

### Other Platforms

The application works with any Next.js-compatible hosting:
- Netlify
- Railway
- Render
- AWS Amplify

## Customizing Sensitive Words

Edit `app/api/upload/route.ts` and modify the `SENSITIVE_WORDS` array:

```typescript
const SENSITIVE_WORDS = [
  'confidential',
  'secret',
  'password',
  // Add your words here
];
```

## File Format Support

- **PDF**: Extracts text using pdf-parse
- **DOCX**: Extracts text using mammoth
- **TXT**: Native text file support

Maximum file size: 10MB
