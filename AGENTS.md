# CommitCraft AI — Project Guide

## What This Is

CommitCraft AI is a VS Code extension that generates professional git commit messages, PR descriptions, and changelog entries from staged diffs using Codex AI. It has a free tier (20 generations/month) and a Pro tier ($4.99/month, unlimited).

## Monorepo Structure

```
freedom/
├── backend/    # Next.js API server (Vercel)
├── extension/  # VS Code extension (.vsix)
└── landing/    # Marketing website (Vercel)
```

---

## Backend (`/backend`)

**Purpose:** API server that handles AI generation, auth, and usage tracking.

**Tech:** Next.js 14, TypeScript, Anthropic Codex Haiku, Supabase, Resend, Dodo (payments)

**Run:**
```bash
cd backend && npm run dev   # http://localhost:3001
```

**Key files:**
- `src/app/api/generate/route.ts` — POST /api/generate (main AI generation)
- `src/app/api/auth/verify/route.ts` — GET /api/auth/verify
- `src/app/api/auth/register/route.ts` — POST /api/auth/register
- `src/lib/auth.ts` — API key validation, quota checking, usage logging
- `src/lib/supabase.ts` — Supabase admin client
- `src/lib/email.ts` — Resend email sending

**Required env vars (`.env`):**
```
ANTHROPIC_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=https://commitcraft.ai
DODO_WEBHOOK_SECRET=
DODO_API_KEY=
DODO_PRODUCT_ID=
```

**API endpoints:**
- `POST /api/auth/register` — body: `{ email }` → creates user, emails API key
- `GET /api/auth/verify` — header: `Authorization: Bearer cc_live_xxx` → returns quota info
- `POST /api/generate` — header: `Authorization: Bearer cc_live_xxx`, body: `{ diff, style, branchName, type }` → returns `{ title, body, bullets, generationsRemaining }`

---

## Extension (`/extension`)

**Purpose:** VS Code extension published to Marketplace.

**Tech:** TypeScript 5.3, esbuild, VS Code Extension API (min version 1.85.0)

**Run (development):**
```bash
cd extension && npm run watch   # continuous build
# Then press F5 in VS Code to launch debug extension host
```

**Build/publish:**
```bash
npm run build    # outputs dist/extension.js
vsce package     # creates .vsix
vsce publish     # publishes to marketplace
```

**Key files:**
- `src/extension.ts` — activation/deactivation
- `src/commands/generateCommit.ts` — main generate command
- `src/commands/generatePR.ts` — PR description command
- `src/commands/generateChangelog.ts` — changelog command
- `src/commands/login.ts` — email login flow
- `src/auth/authService.ts` — API key storage (VS Code Secret Storage)
- `src/api/backendClient.ts` — HTTP client for backend
- `src/git/gitService.ts` — git diff via VS Code Git API
- `src/config/constants.ts` — backend URL, upgrade URL

**No .env needed.** User config via VS Code settings:
- `commitcraft.backendUrl` (default: `https://commitcraft-backend.vercel.app`)
- `commitcraft.commitStyle` — `conventional` | `gitmoji` | `simple`
- `commitcraft.includeBody` — boolean

**Marketplace:** `CommitCraftAI.commitcraft-ai`
**GitHub:** https://github.com/Mohammad2460/commitcraft-vscode

---

## Landing (`/landing`)

**Purpose:** Marketing website — home, pricing, blog, dashboard, upgrade.

**Tech:** Next.js 14, TypeScript, Supabase, Vercel Analytics

**Run:**
```bash
cd landing && npm run dev   # http://localhost:3000
```

**Key pages:**
- `src/app/page.tsx` — homepage (hero, features, pricing, FAQ)
- `src/app/dashboard/page.tsx` — user usage stats
- `src/app/upgrade/page.tsx` — checkout/upgrade page
- `src/app/blog/` — blog listing + posts

**Required env vars:**
```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
DODO_API_KEY=
DODO_PRODUCT_ID=
NEXT_PUBLIC_SITE_URL=https://commitcraft.ai
```

**Live site:** https://commitcraft.ai

---

## How Everything Connects

**Auth flow:**
1. User clicks "Sign In" in extension → enters email
2. Extension calls `POST /api/auth/register` → backend creates user + emails API key via Resend
3. User pastes API key (`cc_live_xxx`) into extension → stored in VS Code Secret Storage
4. On startup, extension calls `GET /api/auth/verify` to validate key + get quota

**Generation flow:**
1. User stages git changes, clicks ✨ in Source Control
2. Extension reads staged diff via VS Code Git API
3. Extension calls `POST /api/generate` with diff + style + Authorization header
4. Backend validates key, checks quota, calls Codex Haiku
5. Returns structured response (title, bullets, remaining count)
6. Extension populates VS Code commit message input

**Quota:**
- Free: 20 generations/month (tracked in `usage_logs` table)
- Pro: Unlimited (Dodo webhook updates `users.tier = 'pro'`)
- Resets monthly from the 1st

---

## Database (Supabase)

**`users` table:** `id, email, api_key, tier (free|pro), is_active, created_at`

**`usage_logs` table:** `id, user_id, type (commit|pr|changelog), tokens_used, created_at`

---

## Deployments

| Service | Platform | URL |
|---------|----------|-----|
| Backend | Vercel | https://commitcraft-backend.vercel.app |
| Landing | Vercel | https://commitcraft.ai |
| Extension | VS Code Marketplace | `CommitCraftAI.commitcraft-ai` |
| Database | Supabase | — |
| Email | Resend | — |
| Payments | Dodo + Gumroad | — |

---

## Important Notes

- Max diff size in prompts: 8KB (50KB accepted, truncated before sending to Codex)
- Branch name sanitized (removes backticks/newlines) to prevent prompt injection
- CORS enabled on `/api/auth/verify` for cross-origin requests
- API keys prefixed `cc_live_` — stored encrypted via OS keychain in extension
- Only diffs are sent to the backend — no full source code
- Codex model in use: `Codex-haiku-4-5-20251001`
- currently payment method is using gumroad and its connected already and not using dodo payemnt for now 

#test it 