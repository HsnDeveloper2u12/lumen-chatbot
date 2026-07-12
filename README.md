# Lumen AI Chatbot

Real-time AI chatbot powered by Groq. Frontend (React + Vite) and backend (Express, talks to Groq API) live in the same repo and deploy together as **one Vercel project**.

## Local Development

**Backend:**
```bash
cd backend
npm install
cp .env.example .env   # if .env doesn't already exist, then add your GROQ_API_KEY
npm run dev
```
Runs on http://localhost:5000

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173 — API calls to `/api/*` are proxied to the backend automatically (see `vite.config.js`).

## Deploying to Vercel (single project, one domain)

1. Push this repo to GitHub.
2. On vercel.com → **Add New → Project** → import this repo.
3. **Root Directory**: leave blank / empty (do NOT set it to `backend` or `frontend`).
4. **Environment Variables**, add:
   - `GROQ_API_KEY` = your key from https://console.groq.com/keys
   - `GROQ_MODEL` = `llama-3.3-70b-versatile` (optional, this is the default)
5. Click **Deploy**.

`vercel.json` at the repo root tells Vercel to:
- build `backend/api/index.js` as a serverless function, handling all `/api/*` requests
- build the `frontend` as a static Vite site, served on every other route

Both end up on the **same domain** — no CORS setup needed, and the Groq API key never reaches the browser.

## After deploying

- Visit your Vercel URL → chatbot UI should load.
- Visit `your-url.vercel.app/api/health` → should return `{"status":"ok",...}`.

## Security note
`backend/.env` is git-ignored — never commit it. Set `GROQ_API_KEY` only through the Vercel dashboard's Environment Variables for production.
