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

## ⚙️ Environment Variables

Create a `.env` file in project root (examples):

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/auth-app
JWT_SECRET=your_access_jwt_secret
JWT_SECRET_REFRESH=your_refresh_jwt_secret
JWT_EXPIRES_IN=1d
```

Keep secrets safe and never commit `.env` to the repo.

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

## 🧪 Tests

If tests exist, run:

```bash
npm test
```

Add tests for critical flows: registration, login, token refresh, protected endpoints, and logout.

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

## 💡 Tips & Next Steps

- Add validation (e.g., Joi or express-validator) for request payloads
- Implement refresh endpoint for issuing new access tokens
- Add integration tests and a GitHub Actions CI workflow
- Add a LICENSE (MIT recommended) and `CONTRIBUTING.md`

## 🤝 Contributing

Contributions welcome — open an issue or a PR with a clear description and tests.

## 📜 License

This project is available under the MIT License. Replace with your chosen license.

---

If you want, I can:
1. Adjust the README wording and examples for your repo specifics, or
2. Add the `.env.example`, `CONTRIBUTING.md`, and `LICENSE` files now.

Tell me which you'd like me to do next.