# Auth-App

A simple Node.js + Express authentication demo using JWT access and refresh tokens, MongoDB (Mongoose), and cookie-based refresh tokens.

## 🚀 Features

- Register and login with hashed passwords (bcrypt)
- Short-lived JWT access tokens and refresh tokens stored in httpOnly cookies
- Protected routes using middleware (`verfyJWT`)
- Logout clears refresh token from DB and cookie

## 🧩 Requirements

- Node.js 18+ (or compatible)
- MongoDB (local or Atlas)



## 📦 Install & Run

Install dependencies:

```bash
npm install
```

Run in development (nodemon recommended):

```bash
npm run dev
```

Run production:

```bash
npm start
```



## 🔐 API Endpoints (examples)

- POST /register — body: `{ username, email, password }`
- POST /login — body: `{ email, password }` → returns access token and sets `jwt` cookie
- POST /logout — clears refresh token cookie and DB entry
- GET /users — protected route (requires `Authorization: Bearer <access_token>`)

Example curl login (receive access token in JSON and refresh token in cookie):

```bash
curl -X POST http://localhost:5000/login -H "Content-Type: application/json" -d '{"email":"you@example.com","password":"pass"}'
```

## 🧾 Files of Interest

- `server.js` — app entry point
- `controllers/` — auth and user controllers
- `middleWare/verfyJWT.js` — JWT verification
- `models/user.js` — Mongoose user schema



