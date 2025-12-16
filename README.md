# Document Sensitive Word Censor

A Next.js 14 application that allows users to upload documents (PDF, DOCX, TXT) and automatically censor sensitive words.

## Features

- Drag-and-drop file upload interface
- Support for PDF, DOCX, and TXT files
- Automatic detection and censoring of sensitive words
- Side-by-side comparison of original and censored text
- Highlighted sensitive words in both views
- Download censored text as .txt file
- Responsive design with Tailwind CSS

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

### Running Locally

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Project Structure

```
├── app/
│   ├── api/
│   │   └── upload/
│   │       └── route.ts          # API endpoint for file upload
│   ├── result/
│   │   └── page.tsx               # Results page with side-by-side view
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page
├── components/
│   ├── FileUploader.tsx           # Drag-and-drop file uploader
│   └── Layout.tsx                 # Main layout wrapper
├── lib/
│   └── types.ts                   # TypeScript type definitions
├── next.config.js                 # Next.js configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Project dependencies
```

## How It Works

1. **Upload**: Users can drag-and-drop or browse for a document (PDF, DOCX, or TXT)
2. **Processing**: The API extracts text from the document and identifies sensitive words
3. **Results**: Shows original and censored text side-by-side with highlighted sensitive words
4. **Download**: Users can download the censored text as a .txt file

## Sensitive Words

The application censors the following words by default:
- confidential
- secret
- password
- ssn
- credit card
- private
- classified
- restricted
- internal
- proprietary

To modify the list, edit the `SENSITIVE_WORDS` array in `app/api/upload/route.ts`.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy your application

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **pdf-parse** - PDF text extraction
- **mammoth** - DOCX text extraction

## License

MIT
