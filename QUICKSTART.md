````md
# Quick Start Guide

## Installation & Running

```bash
npm install
npm run dev
````

Visit [http://localhost:3000](http://localhost:3000)

## Authentication

1. Register using email and password(CREATE A NEW ACCOUNT IF NOT REGISTERED EARLIER) **or**
2. Sign in using Google OAuth
3. After login, you are redirected to the home page

## Upload & Censor

1. Upload a document (PDF, DOCX, or TXT)
2. Click **Upload and Censor**
3. View original and censored text side-by-side
4. Download the censored result as a `.txt` file

## Navigation

* A hamburger menu is available after login
* Menu options:

  * Upload
  * History
  * Admin (admins only)
  * Logout

## User History

* Each upload is saved to the logged-in user’s account
* History includes:

  * File name
  * Upload timestamp
* Users can view **only their own** upload history

## Admin Access

* Admin users can access the admin dashboard
* Admins can:

  * View all users
  * View all uploads
  * See basic usage analytics
* Admin access is controlled via role-based authorization

## Logout

* Logout is available directly on the home page
* Logging out clears the active session immediately

```

