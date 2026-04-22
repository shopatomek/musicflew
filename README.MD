# 🎵 Musicflew

A full-stack music streaming web application built with React, Node.js, MongoDB, Firebase Authentication, and Cloudinary.

[![Stack](https://img.shields.io/badge/stack-React%20%7C%20Node.js%20%7C%20MongoDB-blue)](/)
[![Auth](https://img.shields.io/badge/Auth-Firebase-orange)](/)
[![Storage](https://img.shields.io/badge/Storage-Cloudinary-lihgtblue)](/)
[![Hosting](https://img.shields.io/badge/Hosting-Vercel%20%7C%20Render-black)](/)

> **Live demo:** [musicflew.vercel.app](https://musicflew.vercel.app) &nbsp;·&nbsp; **Source:** [github.com/shopatomek/musicflew](https://github.com/shopatomek/musicflew)

---

<p align="center">
  <img src="assets/musicflew_asset.gif" alt="Musicflew Preview" width="100%">
</p>

---

## ✨ Features

... (reszta Twojego opisu)

## ✨ Features

- **Google Sign-In** via Firebase Authentication
- **Role-based access control** — Member / Admin roles with admin dashboard
- **Music player** — full playback controls, track navigation, album art with logo fallback
- **File uploads** — audio and cover images stored in Cloudinary (unsigned upload preset)
- **CRUD operations** — create, edit, delete songs / artists / albums
- **Filtering** — filter songs by language, artist, album, category
- **Persistent sidebar** — live song library visible across all dashboard views
- **Global search** — search bar in nav filters the sidebar song list in real time
- **Toast notifications** — inline validation feedback on form errors
- **Animated UI** — smooth page transitions with Framer Motion

---

## 🛠️ Tech Stack

| Layer    | Technology                                             |
| -------- | ------------------------------------------------------ |
| Frontend | React 18, React Router v6, Tailwind CSS, Framer Motion |
| Backend  | Node.js, Express                                       |
| Database | MongoDB Atlas (Mongoose ODM)                           |
| Auth     | Firebase Authentication (Google Sign-In)               |
| Storage  | Cloudinary                                             |
| Hosting  | Vercel (frontend) + Render (backend)                   |

---

## 🏗️ Architecture

```mermaid
flowchart LR

    subgraph Frontend["Frontend (Vercel)"]
        R[React App]
        FA[Firebase Auth]
        CL[Cloudinary Upload]
        R --> FA
        R --> CL
    end

    subgraph Backend["Backend (Render)"]
        E[Express Server]
        U["/api/users/"]
        S["/api/songs/"]
        AR["/api/artist/"]
        AL["/api/albums/"]
        E --> U
        E --> S
        E --> AR
        E --> AL
    end

    subgraph Database["Database"]
        M[(MongoDB Atlas)]
    end

    Frontend <-->|HTTP API| Backend
    Backend <-->|MongoDB Driver| Database
```

---

## 🚀 Running Locally

To run this project locally you will need accounts and credentials for three external services: **MongoDB Atlas**, **Firebase**, and **Cloudinary**. Steps 1–3 below walk you through each one.

### 1. MongoDB Atlas

1. Create a free account at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a new **free cluster** (M0)
3. Under **Database Access** add a user with read/write permissions
4. Under **Network Access** add `0.0.0.0/0` to allow connections from anywhere
5. Click **Connect → Drivers** and copy the connection string — it looks like:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/musicflew?retryWrites=true&w=majority
   ```
   > ⚠️ **Windows / Node.js v18+ note:** If you get a `querySrv ECONNREFUSED` error locally, use the direct connection string instead (available under Connect → Shell, then switch to the Compass format). It looks like:
   >
   > ```
   > mongodb://<user>:<pass>@cluster0-shard-00-00.xxx.mongodb.net:27017,cluster0-shard-00-01.xxx.mongodb.net:27017,cluster0-shard-00-02.xxx.mongodb.net:27017/musicflew?authSource=admin&retryWrites=true&w=majority&tls=true
   > ```

### 2. Firebase

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and create a new project
2. Enable **Google Sign-In** under Authentication → Sign-in method
3. Add `localhost` to **Authorized domains** under Authentication → Settings
4. Register a **Web app** and copy the config values (used in `client/.env`)
5. Go to **Project Settings → Service Accounts → Generate new private key** and download the JSON (used in `server/.env`)

### 3. Cloudinary

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Go to **Settings → Upload → Upload Presets → Add upload preset**
3. Set signing mode to **Unsigned** and note the preset name
4. Copy your **Cloud name** from the dashboard

### 4. Clone & configure

```bash
git clone https://github.com/shopatomek/musicflew.git
cd musicflew
```

Copy the example env files:

```bash
cp .env.example client/.env
cp .env.example server/.env
```

Fill in `client/.env`:

```env
REACT_APP_API_URL=http://localhost:4000/
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_name
```

Fill in `server/.env`:

```env
DB_STRING=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/musicflew?retryWrites=true&w=majority
CORS_ORIGIN=http://localhost:3000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your_project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/...
```

### 5. Install & run

```bash
# Terminal 1 — backend
cd server && npm install && npm run dev

# Terminal 2 — frontend
cd client && npm install && npm start
```

App available at `http://localhost:3000`

---

## 🔒 Environment Variables Reference

### Client (`client/.env`)

| Variable                             | Where to find it                                        |
| ------------------------------------ | ------------------------------------------------------- |
| `REACT_APP_API_URL`                  | `http://localhost:4000/` for local, Render URL for prod |
| `REACT_APP_FIREBASE_API_KEY`         | Firebase Console → Project Settings → Web app config    |
| `REACT_APP_FIREBASE_AUTH_DOMAIN`     | Firebase Console → Project Settings → Web app config    |
| `REACT_APP_CLOUDINARY_CLOUD_NAME`    | Cloudinary Dashboard                                    |
| `REACT_APP_CLOUDINARY_UPLOAD_PRESET` | Cloudinary → Settings → Upload Presets                  |

### Server (`server/.env`)

| Variable                   | Where to find it                                              |
| -------------------------- | ------------------------------------------------------------- |
| `DB_STRING`                | MongoDB Atlas → Connect → Drivers                             |
| `CORS_ORIGIN`              | Your frontend URL (`http://localhost:3000` or Vercel URL)     |
| `FIREBASE_PROJECT_ID`      | Firebase Console → Project Settings → Service Accounts → JSON |
| `FIREBASE_PRIVATE_KEY_ID`  | Firebase service account JSON                                 |
| `FIREBASE_PRIVATE_KEY`     | Firebase service account JSON (keep the `\n` newlines)        |
| `FIREBASE_CLIENT_EMAIL`    | Firebase service account JSON                                 |
| `FIREBASE_CLIENT_ID`       | Firebase service account JSON                                 |
| `FIREBASE_CLIENT_CERT_URL` | Firebase service account JSON                                 |

---

## 📁 Project Structure

```
musicflew/
├── client/                   # React frontend
│   ├── src/
│   │   ├── api/              # Axios API calls
│   │   ├── assets/img/       # Static assets (logo, favicon)
│   │   ├── components/       # React components
│   │   ├── config/           # Firebase client config (Auth only)
│   │   ├── context/          # Global state (useReducer)
│   │   └── utils/            # Helper functions
│   └── vercel.json           # Vercel SPA routing config
└── server/                   # Express backend
    ├── config/               # Firebase Admin SDK config
    ├── models/               # Mongoose schemas
    └── routes/               # REST API routes
```

---

## 🎨 UI Overview

- **Login page** — glassmorphism Google sign-in button on full-screen background
- **Dashboard nav** — persistent top bar with Create dropdown (Song / Artist / Album), global search, and page links
- **Sidebar** — always-visible song library that filters in real time with the search bar
- **Create page (`/newSongs`)** — tabbed form (Song / Artist / Album) with Cloudinary upload and progress bar; image fields are optional, audio file is required to save a song
- **Song cards** — display cover art with logo fallback when no image is set

---

## 👤 Author

**Tomasz Szopa**
&nbsp;·&nbsp; [shopa.tomek@gmail.com](mailto:shopa.tomek@gmail.com)
&nbsp;·&nbsp; [GitHub](https://github.com/shopatomek)
