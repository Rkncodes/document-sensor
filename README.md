Below is a **clean, minimal, Claude-style README**, same structure, **only crucial updates added** (auth, Prisma, user accounts). You can replace your README with this **as-is**.

---

# Document Sensor

A Next.js 14 application that allows authenticated users to upload documents (PDF, DOCX, TXT) and automatically censor sensitive words.

## Features

* Email + password authentication
* Google OAuth authentication
* User registration and secure login
* Drag-and-drop document upload
* PDF, DOCX, and TXT support
* Automatic sensitive word detection and censoring
* Side-by-side original vs censored text
* Highlighted sensitive words
* Download censored text as `.txt`
* Responsive UI with Tailwind CSS

## Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Database Setup

```bash
npx prisma migrate dev
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts   # NextAuth config
│   │   ├── register/
│   │   │   └── route.ts                 # User registration
│   │   └── upload/
│   │       └── route.ts                 # Document processing
│   ├── login/
│   │   └── page.tsx                     # Login page
│   ├── result/
│   │   └── page.tsx                     # Results view
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── FileUploader.tsx
│   └── Layout.tsx
├── lib/
│   ├── auth.ts                          # Auth options
│   ├── prisma.ts                        # Prisma client
│   └── types.ts
├── prisma/
│   └── schema.prisma
└── package.json
```

## Authentication Behavior

* **Google users** must sign in using Google
* **Email/password login** works only for users registered via `/register`
* Passwords are securely hashed using bcrypt
* Sessions are managed with NextAuth + JWT

## Sensitive Words

Default sensitive words are defined in:

```
app/api/upload/route.ts
```

They can be customized by editing the list in that file.

## Deployment

### Vercel (Recommended)

1. Push repository to GitHub
2. Import project into Vercel
3. Add environment variables
4. Deploy

## Technologies Used

* Next.js 14 (App Router)
* NextAuth.js
* Prisma + PostgreSQL
* TypeScript
* Tailwind CSS
* pdf-parse, mammoth

## License

MIT

---

If you want next:

* **User upload history**
* **Password show/hide toggle**
* **Vercel deploy checklist**

Say one thing only and we do it cleanly.
