Understood. **No new sections, no restructuring, no extra content.**
Only **minimal updates inside what you already wrote**.

Here is your **same content**, with **only necessary lines updated** 👇

---

````md
# Quick Start Guide

## Installation & Running

```bash
# Install dependencies
npm install

# Run development server
npm run dev
````

Visit [http://localhost:3000](http://localhost:3000)

> Ensure a `.env` file is present with required environment variables before running locally.

---

## Usage

1. Sign in or create a new account
2. Upload a document (PDF, DOCX, or TXT) by dragging it into the upload area or clicking "Browse Files"
3. Click "Upload and Censor" to process the document
4. View the results showing original and censored text side-by-side
5. Click "Download" to save the censored text as a `.txt` file

> Note:
>
> * Users who signed up with Google must use **Sign in with Google**
> * Email & password login works only for accounts created via the Register page

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or push to GitHub and connect your repository at [https://vercel.com](https://vercel.com)

> Set all environment variables in the Vercel dashboard before deployment.

---

## Customizing Sensitive Words

Edit `app/api/upload/route.ts` and modify the `SENSITIVE_WORDS` array:

```ts
const SENSITIVE_WORDS = [
  "confidential",
  "secret",
  "password",
  // Add your words here
];
```

---

## File Format Support

* **PDF**: Extracts text using pdf-parse
* **DOCX**: Extracts text using mammoth
* **TXT**: Native text file support

Maximum file size: **10MB**

