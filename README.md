````md
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
* User upload history (per account)
* Basic usage analytics (uploads count)
* Admin access for viewing all users and uploads
* Hamburger menu navigation
* Logout option available on home page

## Getting Started

### Installation

```bash
npm install
````

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
│   │   ├── upload/
│   │   │   └── route.ts                 # Document processing
│   │   ├── history/
│   │   │   └── route.ts                 # User upload history API
│   │   └── admin/
│   │       └── route.ts                 # Admin-only APIs
│   ├── login/
│   │   └── page.tsx                     # Login page
│   ├── result/
│   │   └── page.tsx                     # Results view
│   ├── admin/
│   │   └── page.tsx                     # Admin dashboard
│   ├── layout.tsx
│   └── page.tsx                         # Home page with logout + menu
├── components/
│   ├── FileUploader.tsx
│   ├── Layout.tsx
│   └── HamburgerMenu.tsx
├── lib/
│   ├── auth.ts                          # Auth options + role handling
│   ├── prisma.ts                       # Prisma client
│   └── types.ts
├── prisma/
│   └── schema.prisma                   # User, Upload, Admin role models
└── package.json
```

## Authentication Behavior

* **Google users** must sign in using Google
* **Email/password login** works only for users registered via `/register`
* Passwords are securely hashed using bcrypt
* Sessions are managed with NextAuth + JWT
* Admin users are determined via role field in database

## User History & Analytics

* Each authenticated user can view their own upload history
* Upload metadata (filename, timestamp) is stored in the database
* Admin users can view aggregate upload analytics across all users

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

````