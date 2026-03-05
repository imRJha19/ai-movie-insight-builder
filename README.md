# AI Movie Insight Builder

Next.js app that fetches movie metadata from OMDb and generates a short AI sentiment summary via Groq.

## Local setup

1. Install dependencies:
```bash
npm install
```

2. Create env file:
```bash
cp .env.example .env.local
```

3. Set valid keys in `.env.local`:
- `OMDB_API_KEY`
- `GROQ_API_KEY`
- Optional: `GROQ_MODEL`

4. Run:
```bash
npm run dev
```

## Vercel deployment

Set the same environment variables in your Vercel project:
- `OMDB_API_KEY`
- `GROQ_API_KEY`
- Optional: `GROQ_MODEL`

If `GROQ_API_KEY` is invalid, the app now returns a clear configuration error message from the server action.
