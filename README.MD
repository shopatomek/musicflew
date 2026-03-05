# 🎵 Musicflew

A full-stack music streaming web application built with React, Node.js, MongoDB, and Firebase Authentication.

> **Live demo:** [musicflew.vercel.app](https://musicflew.vercel.app) · **Backend:** [Render](https://musicflew.onrender.com)

---

## ✨ Features

- **Google Sign-In** via Firebase Authentication
- **Role-based access control** — Member / Admin roles
- **Admin dashboard** — manage songs, artists, albums, and users
- **Music player** — play songs with full controls (react-h5-audio-player)
- **File uploads** — audio and images stored in Firebase Storage
- **CRUD operations** — create, edit, delete songs / artists / albums
- **Filtering** — filter songs by language, artist, album, category
- **Animated UI** — smooth transitions with Framer Motion

---

## 🛠️ Tech Stack

| Layer    | Technology                                             |
| -------- | ------------------------------------------------------ |
| Frontend | React 18, React Router v6, Tailwind CSS, Framer Motion |
| Backend  | Node.js, Express                                       |
| Database | MongoDB Atlas (Mongoose)                               |
| Auth     | Firebase Authentication (Google Sign-In)               |
| Storage  | Firebase Storage                                       |
| Hosting  | Vercel (frontend) + Render (backend)                   |

---

## 🏗️ Architecture

```
┌─────────────────┐        ┌────────────────────┐        ┌──────────────┐
│  React (Vercel) │◄──────►│ Express (Railway)  │◄──────►│ MongoDB Atlas│
│                 │        │   REST API         │        └──────────────┘
│  Firebase Auth  │        │   /api/users       │
│  Firebase Store │        │   /api/songs       │
└─────────────────┘        │   /api/artist      │
                           │   /api/albums      │
                           └────────────────────┘
```

**Auth flow:** User signs in with Google → Firebase issues JWT token → Frontend sends token as `Authorization: Bearer` header → Backend verifies token via Firebase Admin SDK → MongoDB stores user data.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- MongoDB Atlas account
- Firebase project (Auth + Storage enabled)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/musicflew.git
cd musicflew
```

### 2. Configure environment variables

```bash
# Client
cp .env.example client/.env

# Server
cp .env.example server/.env
```

Edit both `.env` files with your credentials (see `.env.example` for all required keys).

### 3. Install dependencies

```bash
# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### 4. Run locally

```bash
# Terminal 1 — start the backend
cd server && npm run dev

# Terminal 2 — start the frontend
cd client && npm start
```

App is available at `http://localhost:3000`

---

## ☁️ Deployment

### Backend → Railway

1. Create a new project at [railway.app](https://railway.app)
2. Connect your GitHub repo and select the `/server` folder
3. Add all environment variables from `server/.env` in the Railway dashboard
4. Railway will auto-deploy on every push

### Frontend → Vercel

1. Import your repository at [vercel.com](https://vercel.com)
2. Set **Root Directory** to `client`
3. Add `REACT_APP_API_URL` = your Railway backend URL (e.g. `https://musicflew.up.railway.app/`)
4. Deploy

---

## 🔒 Environment Variables

### Client (`client/.env`)

| Variable            | Description                 |
| ------------------- | --------------------------- |
| `REACT_APP_API_URL` | URL of the deployed backend |

### Server (`server/.env`)

| Variable                   | Description                     |
| -------------------------- | ------------------------------- |
| `DB_STRING`                | MongoDB Atlas connection string |
| `CORS_ORIGIN`              | Frontend URL (for CORS)         |
| `FIREBASE_PROJECT_ID`      | Firebase project ID             |
| `FIREBASE_PRIVATE_KEY`     | Firebase Admin private key      |
| `FIREBASE_CLIENT_EMAIL`    | Firebase Admin client email     |
| `FIREBASE_PRIVATE_KEY_ID`  | Firebase private key ID         |
| `FIREBASE_CLIENT_ID`       | Firebase client ID              |
| `FIREBASE_CLIENT_CERT_URL` | Firebase cert URL               |

---

## 📁 Project Structure

```
musicflew/
├── client/                   # React frontend
│   ├── src/
│   │   ├── api/              # Axios API calls
│   │   ├── components/       # React components
│   │   ├── config/           # Firebase client config
│   │   ├── context/          # Global state (useReducer)
│   │   └── utils/            # Helper functions
│   └── vercel.json           # Vercel SPA routing config
└── server/                   # Express backend
    ├── config/               # Firebase Admin config
    ├── models/               # Mongoose schemas (User, Song, Artist, Album)
    ├── routes/               # REST API routes
    └── railway.toml          # Railway deployment config
```

---

## 👤 Author

**Tomasz Szopa**  
📧 [shopa.tomek@gmail.com](mailto:shopa.tomek@gmail.com)  
🔗 [GitLab Projects](https://gitlab.com/shopa.tomek)
