# 🔗 URL Shortener

A full-stack URL shortening service built with Laravel, React, and Inertia.js. Users can register, log in, create shortened URLs, track clicks, and manage their links from a clean dashboard.

---

## 🚀 Live Demo

> Demo Video: https://drive.google.com/file/d/1n_4137NEPrj0P47g9e4GIs0iZtxu0Gjt/view?usp=drive_link

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend Framework | Laravel 12 |
| Frontend Framework | React 18 (via Inertia.js) |
| Styling | Tailwind CSS |
| UI Components | Ant Design |
| Database | MySQL |
| Authentication | Laravel Breeze |
| Bridge | Inertia.js |

---

## ✨ Features

### Core Features
- ✅ User Registration & Login
- ✅ Shorten any long URL into a unique short code
- ✅ Redirect short URL to original URL
- ✅ View all your shortened URLs in a dashboard
- ✅ Edit existing URLs
- ✅ Delete URLs with confirmation

### Bonus Features
- ✅ Click count tracking (auto-updates when you return to dashboard)
- ✅ Custom short codes (e.g. /my-link instead of /xK92ms)
- ✅ URL expiration dates (expired links return 410 Gone)
- ✅ Copy-to-clipboard button on every short URL
- ✅ Pagination on dashboard table

---

## 🏗️ Architecture & Design Decisions

### Repository Pattern
Data access is abstracted behind a Repository layer:
```
Controller → UrlRepositoryInterface → UrlRepository → Database
```

- **Interface** defines the contract (what methods must exist)
- **Repository** implements the actual database queries
- **Controller** depends on the Interface, not the concrete class
- **ServiceProvider** binds the Interface to the Implementation

This means the Controller never touches the database directly. If we switch from MySQL to MongoDB tomorrow, only the Repository changes.

### Inertia.js
Instead of building a separate REST API for React to consume, Inertia.js acts as the bridge between Laravel and React. Laravel controllers return Inertia responses with data, which are received as props in React components. This gives the feel of a SPA without the complexity of a separate API.

### Authentication
Laravel Breeze provides registration, login, logout, and session management out of the box. All URL management routes are protected with the `auth` and `verified` middleware.

---

## 📐 ER Diagram
```
users
─────────────────────
id              (PK)
name
email
password
created_at
updated_at

urls
─────────────────────
id              (PK)
user_id         (FK → users.id)
original_url
short_code      (unique)
custom_code     (unique, nullable)
click_count     (default: 0)
expires_at      (nullable)
created_at
updated_at
```

**Relationships:**
- A User has many URLs (one-to-many)
- A URL belongs to one User

---

## 📁 Project Structure
```
url-shortener/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       ├── UrlController.php        # CRUD for URLs
│   │       └── RedirectController.php   # Handles short URL redirects
│   ├── Models/
│   │   └── Url.php                      # URL Eloquent Model
│   ├── Repositories/
│   │   ├── Interfaces/
│   │   │   └── UrlRepositoryInterface.php  # Contract
│   │   └── UrlRepository.php               # Implementation
│   └── Providers/
│       └── RepositoryServiceProvider.php   # Binds Interface to Implementation
├── database/
│   └── migrations/
│       └── xxxx_create_urls_table.php   # URLs table schema
├── resources/
│   └── js/
│       └── Pages/
│           ├── Auth/
│           │   ├── Login.jsx            # Login page
│           │   └── Register.jsx         # Register page
│           └── Dashboard.jsx            # Main dashboard
├── routes/
│   └── web.php                          # All application routes
└── README.md
```

---

## ⚙️ Setup Instructions

### Requirements
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL
- XAMPP (or any local server)

### Step 1 — Clone the Repository
```bash
git clone [your-repo-link]
cd url-shortener
```

### Step 2 — Install PHP Dependencies
```bash
composer install
```

### Step 3 — Install Node Dependencies
```bash
npm install
```

### Step 4 — Environment Setup
```bash
cp .env.example .env
php artisan key:generate
```

### Step 5 — Configure Database

Open `.env` and update:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=url_shortener
DB_USERNAME=root
DB_PASSWORD=
APP_URL=http://127.0.0.1:8000
```

### Step 6 — Create Database

In MySQL / phpMyAdmin / SQLyog run:
```sql
CREATE DATABASE url_shortener;
```

### Step 7 — Run Migrations
```bash
php artisan migrate
```

### Step 8 — Run the Application

Open two terminals:

**Terminal 1 — Laravel server:**
```bash
php artisan serve
```

**Terminal 2 — Vite (React):**
```bash
npm run dev
```

### Step 9 — Visit the App

Open your browser and go to:
```
http://127.0.0.1:8000
```

Register a new account and start shortening URLs!

---

## 🔐 Security Practices

- All URL management routes are protected by `auth` middleware
- Users can only edit/delete their own URLs (ownership check with `abort_if`)
- Input validation on all forms (backend + frontend)
- Mass assignment protection via `$fillable` in the Url model
- CSRF protection on all POST/PUT/DELETE requests (Laravel default)
- Expired URLs return 410 Gone instead of redirecting

---

## 📌 Assumptions Made

- A user must be registered and logged in to create or manage URLs
- Short codes are automatically generated as 6 random characters
- Custom codes must be at least 3 characters, alphanumeric with dashes/underscores
- Click count increments every time the short URL is visited (including by the owner)
- Expired URLs are kept in the database but return a 410 error when visited

---

## 🧪 How to Test Features

| Feature | How to Test |
|---|---|
| Register | Go to /register, fill form |
| Login | Go to /login, use registered credentials |
| Create URL | Dashboard → Shorten New URL button |
| Custom Code | Fill in Custom Code field when creating |
| Redirect | Visit http://127.0.0.1:8000/{short-code} in new tab |
| Click Count | Visit short URL → return to dashboard → count increases |
| Copy URL | Click copy icon next to any short URL |
| Edit URL | Click Edit button in table |
| Delete URL | Click Delete → confirm |
| Expiry | Set a past date via DB to test 410 response |
| Pagination | Create more than 10 URLs to see pagination |

---

## 👨‍💻 Author

**Arham Chowdhury**
arhamchowdhury1218@gmail.com
https://github.com/arhamchowdhury1218?tab=repositories

---

## 📄 License

This project was built as a technical assessment.