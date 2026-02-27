````md
# Document Redaction Engine

A modular PII detection and redaction engine built with Next.js 14.  
Authenticated users can upload documents (PDF, DOCX, TXT) and automatically detect and redact sensitive information.

---

## Features

* Email + password authentication
* Google OAuth authentication
* Role-based access control (USER / ADMIN)
* Drag-and-drop document upload
* PDF, DOCX, and TXT support
* Modular redaction engine
  * Keyword detection
  * Email detection
  * Phone number detection
  * Credit card detection
* Automatic detection and redaction of sensitive data
* Side-by-side original vs redacted text
* Highlighted detected entities
* Download redacted text as `.txt`
* Responsive UI with Tailwind CSS
* User upload history (per account)
* Basic usage analytics (upload count)
* Admin dashboard for viewing all users and uploads
* Secure session handling with JWT

---

## Getting Started

### 1. Installation

```bash
npm install
````

---

### 2. Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

### 3. Database Setup

```bash
npx prisma migrate dev
```

---

### 4. Run the Development Server

```bash
npm run dev
```

Then open:

```
http://localhost:3000
```

---

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts   # NextAuth configuration
│   │   ├── upload/
│   │   │   └── route.ts                 # Document processing + redaction
│   │   ├── history/
│   │   │   └── route.ts                 # User upload history API
│   │   └── admin/
│   │       └── route.ts                 # Admin-only APIs
│   ├── admin/
│   │   └── page.tsx                     # Admin dashboard
│   ├── history/
│   │   └── page.tsx                     # User history view
│   ├── layout.tsx
│   └── page.tsx                         # Home page
├── components/
│   ├── FileUploader.tsx
│   ├── Layout.tsx
│   └── Navbar.tsx
├── lib/
│   ├── auth.ts                          # Auth options + role handling
│   ├── prisma.ts                        # Prisma client
│   └── redaction/
│       ├── engine.ts                    # Redaction engine core
│       ├── detectors/                   # Modular detector implementations
│       ├── normalize.ts
│       └── types.ts
├── prisma/
│   └── schema.prisma                    # User, Session, Upload models
└── package.json
```

---

## Redaction Engine Architecture

The redaction system follows a modular detector-based architecture.

Each detector:

* Implements a consistent interface
* Scans extracted document text
* Returns structured match results
* Is aggregated by the central engine

Supported detection types:

* Keywords (configurable list)
* Email addresses
* Phone numbers
* Credit card numbers

Matches are grouped and redacted deterministically.

---

## Authentication & Authorization

* NextAuth.js with JWT sessions
* Google OAuth and email/password support
* Passwords hashed with bcrypt
* Role-based access control enforced server-side
* Admin role stored in database (`role` field in User model)

---

## User History & Analytics

* Each authenticated user can view their upload history
* Upload metadata stored in PostgreSQL:

  * Filename
  * Redacted count
  * Timestamp
* Admin users can view aggregate upload data across all users

---

## Technologies Used

* Next.js 14 (App Router)
* NextAuth.js
* Prisma ORM
* PostgreSQL
* TypeScript
* Tailwind CSS
* pdf-parse
* mammoth

---

## Deployment

### Vercel (Recommended)

1. Push repository to GitHub
2. Import project into Vercel
3. Configure environment variables
4. Deploy

---

## License

MIT

```
```
