# Dairus

**A modern full-stack social platform built with React and FastAPI.**

Dairus is a social web application where users can create accounts, manage their profiles, and share posts through a clean and responsive interface.

<p align="center">
  <img src="https://skillicons.dev/icons?i=python,fastapi,postgres,html,css,bootstrap,js,react,vite,git,github,vscode,pnpm,vercel,render&perline=8" alt="Dairus Technologies" />
</p>

---

## ✨ Features

### Authentication
- Email and password registration.
- Google account registration.
- Google reCAPTCHA v3 verification.
- Secure cookie-based user sessions.

### User Profiles
- Profile viewing and management.
- Profile information editing.
- Profile picture uploads.

### Social Features
- Post creation.
- Optional image uploads.
- User-generated content.

### Backend & Infrastructure
- PostgreSQL database integration.
- Automatic database table initialization.
- Request rate limiting.
- API request validation.
- External service integrations.

---

## 🛠️ Tech Stack

**Frontend**

<p>
  <img src="https://skillicons.dev/icons?i=html,css,bootstrap,js,react,vite,pnpm&perline=8" alt="Frontend Technologies" />
</p>

**Backend & Database**

<p>
  <img src="https://skillicons.dev/icons?i=python,fastapi,postgres&perline=8" alt="Backend Technologies" />
</p>

**Development & Deployment**

<p>
  <img src="https://skillicons.dev/icons?i=git,github,vscode,vercel,render&perline=8" alt="Development and Deployment Technologies" />
</p>

**Additional Integrations**

- Google OAuth
- Google reCAPTCHA v3
- ImgBB
- Groq API
- Argon2

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

---

## 💻 Running Locally

### 1. Start the Backend

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

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API address:

`http://localhost:8000`

### 2. Start the Frontend

Open another terminal in the project root.

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Frontend address:

`http://localhost:5173`

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

### Authentication

- Sessions are managed through an HttpOnly cookie named `user_session_token`.
- Passwords are hashed using Argon2.
- Authentication endpoints require valid reCAPTCHA verification.
- Post creation and profile editing use multipart form data.

---

## 🚀 Deployment

Dairus uses **Vercel** for frontend hosting and **Render** for backend hosting.

### Frontend — Vercel

The React application is deployed through [Vercel](https://vercel.com/).

**Recommended configuration:**

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Root Directory | `./` |
| Build Command | `pnpm build` |
| Output Directory | `dist` |
| Install Command | `pnpm install` |

**Environment Variables:**

Configure the following variables in the Vercel dashboard:

```env
VITE_API_URL=https://your-api.onrender.com
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Deployments are automatically triggered when changes are pushed to the connected GitHub repository.

### Backend — Render

The FastAPI application is hosted on [Render](https://render.com/).

**Recommended configuration:**

| Setting | Value |
|---|---|
| Runtime | Python |
| Root Directory | `API` |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `uvicorn main:app --host 0.0.0.0 --port $PORT` |

**Environment Variables:**

Configure the backend environment variables in the Render dashboard:

- PostgreSQL connection credentials.
- `FRONTEND_URLS` — deployed Vercel frontend origin.
- `RECAPTCHA_SECRET_KEY`
- `GOOGLE_CLIENT_ID`
- `IMGBB_URL`
- `GROQ_API_KEY` (optional).

### Production Configuration

1. Deploy the frontend through Vercel.
2. Deploy the backend through Render.
3. Set `VITE_API_URL` to the deployed Render API URL.
4. Add the Vercel frontend URL to `FRONTEND_URLS` on Render.
5. Configure Google OAuth and reCAPTCHA with the production domains.
6. Ensure PostgreSQL connectivity and HTTPS cookie settings are properly configured.

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
  <img src="https://skillicons.dev/icons?i=react,python,fastapi,postgres&perline=4" alt="Dairus Stack" />
  <br />
  <b>Built with passion and modern technologies.</b>
</p>