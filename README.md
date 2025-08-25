# Blink Landing Page

A small static landing page using Vite + Alpine.js with Supabase for email signups.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create an environment file (do not commit):

- For local dev, create a file named `.env.local` in the project root with:

```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_PUBLIC_KEY
```

- Optionally, copy from `./.env.example` if present.

3. Start the dev server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Preview the production build locally:

```bash
npm run preview
```

## Deployment

- Set env vars in your host (Vercel/Netlify/Render), using the same names:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

Note: Only use the Supabase anon key on the client. Never expose the service role key in frontend code.
