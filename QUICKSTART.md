# Quick Start Guide

## Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. Set Up Database

```bash
npx prisma migrate dev
```

### 4. Start Development Server

```bash
npm run dev
```

Open your browser and visit:

http://localhost:3000

---

## Authentication

- Register using email and password (create a new account if not registered earlier)  
**or**
- Sign in using Google OAuth  

After successful login, you will be redirected to the home page.

---

## Upload & Redact

1. Upload a document (PDF, DOCX, or TXT)
2. Click **Upload and Redact**
3. The system will:
   - Extract text
   - Detect sensitive information
   - Apply redaction
4. View original and redacted text side-by-side
5. Download the redacted result as a `.txt` file

---

## Detection Capabilities

The redaction engine detects:

- Configurable keywords  
- Email addresses  
- Phone numbers  
- Credit card numbers  

---

## Navigation

After login, a hamburger menu becomes available.

Menu options:

- Upload  
- History  
- Analytics  
- Admin (admins only)  
- Logout  

---

## User History

- Each upload is saved to the logged-in user’s account  
- Stored metadata includes:
  - File name  
  - Redacted word count  
  - Timestamp  
- Users can view **only their own** upload history  

---

## Admin Access

Admin users can access the admin dashboard.

Admins can:

- View all users  
- View all uploads  
- See aggregate usage analytics  

Access is enforced using role-based authorization.

---

## Logout

- Logout is available via the navigation menu  
- Logging out immediately invalidates the active session  