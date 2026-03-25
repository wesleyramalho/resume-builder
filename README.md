# MyPDFCV

**[mypdfcv.com](https://mypdfcv.com)** — A modern, client-side resume builder with real-time preview, AI-powered text improvement, and one-click PDF export.

<img width="1510" height="800" alt="image" src="https://github.com/user-attachments/assets/8b44654a-40ed-48a6-83a1-18a1fba25e41" />

## Features

- **Real-time preview** — See your resume update as you type
- **PDF export** — One-click, pixel-perfect PDF generation via `@react-pdf/renderer`
- **AI text improvement** — In-browser AI (runs via WebAssembly, no data sent to servers)
- **Drag-and-drop sections** — Reorder resume sections with `@dnd-kit`
- **Profile photo** — Upload and crop a profile photo
- **LinkedIn import** — Pre-fill your resume from your LinkedIn profile (optional OAuth)
- **Dark mode** — Full light/dark theme support
- **Privacy-first** — All data stored in `localStorage`. Nothing leaves your browser.

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Zustand](https://zustand-demo.pmnd.rs) — resume state management
- [react-hook-form](https://react-hook-form.com) + [Zod](https://zod.dev) — form validation
- [@react-pdf/renderer](https://react-pdf.org) — PDF generation
- [@dnd-kit](https://dndkit.com) — drag-and-drop
- [@huggingface/transformers](https://huggingface.co/docs/transformers.js) — in-browser AI
- [next-auth v5](https://authjs.dev) — LinkedIn OAuth

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## LinkedIn OAuth Setup (Optional)

To enable "Import from LinkedIn", add these to `.env.local`:

```env
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_LINKEDIN_OAUTH_ENABLED=true
AUTH_SECRET=your_auth_secret
```

LinkedIn app requirements:
- Scopes: `openid`, `profile`, `email`
- Authorized redirect URL: `http://localhost:3000/api/auth/callback/linkedin`
- Production redirect URL: `https://mypdfcv.com/api/auth/callback/linkedin`

## Deployment

The production site runs at **[mypdfcv.com](https://mypdfcv.com)**.

Recommended deployment: [Vercel](https://vercel.com) (zero-config for Next.js).

---

Created by [Wesley Ramalho](https://wesleyramalho.com)
