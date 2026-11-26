# Dairus

**A modern full-stack social platform built with React and FastAPI.**

Dairus is a social web application where users can create accounts, manage their profiles, and share posts through a clean and responsive interface.

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI-0.136-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/pnpm-Package_Manager-F69220?style=for-the-badge&logo=pnpm&logoColor=white" />
</p>

---

## ✨ Features

- **Authentication**
  - Email and password registration.
  - Google authentication.
  - Google reCAPTCHA v3 verification.
  - Secure cookie-based sessions.

- **User Profiles**
  - Profile viewing and management.
  - Profile information editing.
  - Profile picture uploads.

- **Social Features**
  - Post creation.
  - Optional image uploads.
  - User-generated content.

- **Backend & Infrastructure**
  - PostgreSQL database integration.
  - Automatic database table initialization.
  - Request rate limiting.
  - API request validation.
  - External service integrations.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| <img src="https://cdn.simpleicons.org/react/61DAFB" width="18"/> React | Frontend library |
| <img src="https://cdn.simpleicons.org/vite/646CFF" width="18"/> Vite | Frontend tooling |
| <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" width="18"/> Tailwind CSS | Styling |
| <img src="https://cdn.simpleicons.org/pnpm/F69220" width="18"/> pnpm | Package manager |
| <img src="https://cdn.simpleicons.org/python/3776AB" width="18"/> Python | Backend language |
| <img src="https://cdn.simpleicons.org/fastapi/009688" width="18"/> FastAPI | REST API framework |
| <img src="https://cdn.simpleicons.org/postgresql/4169E1" width="18"/> PostgreSQL | Relational database |
| <img src="https://cdn.simpleicons.org/argon2/000000" width="18"/> Argon2 | Password hashing |
| <img src="https://cdn.simpleicons.org/google/4285F4" width="18"/> Google OAuth | Authentication |
| <img src="https://cdn.simpleicons.org/google/4285F4" width="18"/> reCAPTCHA v3 | Bot protection |
| <img src="https://cdn.simpleicons.org/imgbb/000000" width="18"/> ImgBB | Image hosting |
| <img src="https://cdn.simpleicons.org/groq/000000" width="18"/> Groq | AI integration |

---

## 📁 Project Structure

```text
Dairus/
│
├── API/
│   ├── Database/
│   │   ├── Conn/             # Database connections
│   │   └── Database/         # Database operations and initialization
│   │
│   ├── Middlewares/          # Authentication and request middleware
│   ├── Routers/              # API route handlers
│   │   └── Users/
│   │
│   ├── Services/             # External service integrations
│   ├── Validation/           # Request validation
│   │
│   ├── main.py               # FastAPI entry point
│   └── requirements.txt
│
├── src/
│   ├── Components/           # Reusable UI components
│   ├── Pages/                # Application pages
│   ├── Requisitions/         # API requests
│   ├── Services/             # Frontend integrations
│   └── StylesGlobals/        # Global styles
│
├── .env.example
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Python 3.10+](https://www.python.org/)
- [PostgreSQL](https://www.postgresql.org/)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Dairus.git

cd Dairus
```

### 2. Configure environment variables

Create a `.env` file in the project root using `.env.example` as a reference.

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**Linux / macOS:**

```bash
cp .env.example .env
```

Configure the required variables:

| Variable | Description |
|---|---|
| `DB_HOST` | PostgreSQL host |
| `DB_PORT` | PostgreSQL port |
| `DB_NAME` | Database name |
| `DB_USER` | Database username |
| `DB_PASSWORD` | Database password |
| `DB_SSLMODE` | PostgreSQL SSL mode |
| `FRONTEND_URLS` | Allowed frontend origins |
| `VITE_API_URL` | Backend API base URL |
| `VITE_RECAPTCHA_SITE_KEY` | reCAPTCHA public site key |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA secret key |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_ID` | Backend Google OAuth client ID |
| `IMGBB_URL` | ImgBB API key |
| `GROQ_API_KEY` | Groq API key (optional) |

**Important:** Never expose secret keys through frontend environment variables. Variables prefixed with `VITE_` are exposed in the client-side build.

The PostgreSQL database must already exist. The API initializes the application tables when it starts.

### 3. Start the backend

Navigate to the API directory:

```bash
cd API
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it:

**Windows PowerShell:**

```powershell
.\.venv\Scripts\Activate.ps1
```

**Linux / macOS:**

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:

```text
http://localhost:8000
```

### 4. Start the frontend

Open another terminal in the project root:

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

The frontend will usually be available at:

```text
http://localhost:5173
```

---

## 📜 Available Scripts

Run these commands from the project root:

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Generate the production build |
| `pnpm preview` | Preview the production build |
| `pnpm lint` | Run Oxlint |

---

## 🔌 API Reference

The backend exposes the following main endpoints:

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| `POST` | `/createAccount` | Create an account | Public |
| `POST` | `/createAccount/googleAuth` | Register with Google | Public |
| `POST` | `/login` | Authenticate a user | Public |
| `GET` | `/checkUser` | Validate the current session | Public |
| `GET` | `/getUser` | Retrieve user information and posts | Required |
| `POST` | `/createPost` | Create a new post | Required |
| `PUT` | `/editProfile` | Update profile information | Required |

**Authentication details:**

- Sessions are managed through an HttpOnly cookie named `user_session_token`.
- Passwords are hashed using Argon2.
- Authentication endpoints require valid reCAPTCHA verification.
- Post creation and profile editing use multipart form data.

---

## 🚀 Deployment

### Backend

The API can be deployed using [Render](https://render.com/).

Recommended configuration:

| Setting | Value |
|---|---|
| Root Directory | `API` |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `uvicorn main:app --host 0.0.0.0 --port $PORT` |

Configure the required environment variables in the hosting provider dashboard.

### Frontend

The frontend can be deployed to platforms such as:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)

Build the production application:

```bash
pnpm build
```

The generated files will be available in:

```text
dist/
```

Set `VITE_API_URL` to your deployed API URL before building.

---

## 🔒 Security

Dairus implements several security measures:

- **Argon2:** Secure password hashing.
- **HttpOnly Cookies:** Protect session tokens from JavaScript access.
- **Google reCAPTCHA v3:** Automated bot detection.
- **Rate Limiting:** Helps prevent excessive API requests.
- **CORS:** Controls permitted frontend origins.
- **Environment Variables:** Keeps sensitive credentials outside the source code.

---

## 📌 Project Status

Dairus is under active development. New features, improvements, and optimizations are continuously being implemented.

---

<p align="center">
  <b>Built with ❤️ using React, FastAPI and PostgreSQL.</b>
</p>