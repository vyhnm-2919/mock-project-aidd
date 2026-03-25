<!--
Sync Impact Report
===================
- Version: 0.0.0 → 1.0.0 (MAJOR: initial constitution creation)
- Added sections: All (Preamble, 7 Principles, Tech Stack, Folder Structure, Governance)
- Templates requiring updates:
  - .momorph/specs/662-14387-Login/spec.md ✅ updated (aligned with constitution v1.0.0)
  - .momorph/specs/662-14387-Login/design-style.md ✅ updated (aligned with constitution v1.0.0)
- Follow-up TODOs: None
-->

# Project Constitution

**Project Name:** SAA 2025 - Sun Annual Awards
**Version:** 1.0.0
**Ratification Date:** 2026-03-10
**Last Amended:** 2026-03-10

---

## Preamble

This constitution defines the non-negotiable standards, conventions, and
architectural decisions for the SAA 2025 project. All code, documentation,
and tooling MUST comply with these principles. Any deviation requires an
amendment through the governance process defined below.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15.x |
| Language | TypeScript | 5.x |
| Runtime | React | 19.x |
| Styling | Tailwind CSS | 4.x |
| Authentication | Supabase Auth (Google OAuth) | @supabase/ssr 0.8.x |
| Database | Supabase (PostgreSQL 17) | @supabase/supabase-js 2.x |
| Edge Runtime | Cloudflare Workers | Wrangler 4.x |
| Deployment | OpenNext for Cloudflare | @opennextjs/cloudflare 1.x |
| Package Manager | Yarn | 1.22.22 |
| Linting | ESLint | 9.x |
| Dev Server | Next.js Turbopack | Built-in |

---

## Principles

### Principle 1: Clean Code & Simplicity

All code MUST be readable, concise, and self-documenting.

- Functions MUST do one thing and do it well (Single Responsibility)
- Keep files under 200 lines; extract components/utils when exceeding
- Use descriptive variable and function names — avoid abbreviations
- No dead code, commented-out code, or unused imports
- Prefer explicit over implicit: no magic numbers, no implicit type coercion
- DRY (Don't Repeat Yourself) — extract shared logic only when used 3+ times
- YAGNI (You Aren't Gonna Need It) — do not build for hypothetical futures

### Principle 2: TypeScript Strictness

TypeScript MUST be used with strict mode for all source code.

- `strict: true` in tsconfig.json (no exceptions)
- No `any` type — use `unknown` with type guards when type is uncertain
- All function parameters and return types MUST be explicitly typed
- Use discriminated unions over optional fields where applicable
- Shared types MUST live in dedicated type files (`types.ts` or `types/` folder)
- Prefer `interface` for object shapes, `type` for unions and computed types

### Principle 3: Component Architecture (Next.js App Router)

Follow Next.js App Router conventions with clear separation of concerns.

- **Server Components** by default — only add `"use client"` when required
- Client Components MUST be limited to: event handlers, hooks, browser APIs
- File naming: `kebab-case` for files, `PascalCase` for components
- Route structure: `src/app/(group)/route/page.tsx`
- Layout hierarchy: Shared UI in `layout.tsx`, page-specific in `page.tsx`
- Data fetching: Server Components fetch directly; Client Components use
  server actions or API routes
- Component file structure:
  ```
  src/
  ├── app/              # Routes, layouts, pages
  ├── components/       # Reusable UI components
  │   ├── ui/           # Base UI primitives (Button, Input, etc.)
  │   └── {feature}/    # Feature-specific components
  ├── libs/             # External service clients (Supabase, etc.)
  ├── hooks/            # Custom React hooks (client-only)
  ├── types/            # Shared TypeScript types
  └── utils/            # Pure utility functions
  ```

### Principle 4: Responsive Design

All UI MUST be responsive and compatible across mobile, tablet, and desktop.

- **Mobile-first** approach with Tailwind breakpoints:
  - Default: mobile (< 768px)
  - `md:` tablet (768px - 1023px)
  - `lg:` desktop (1024px - 1439px)
  - `xl:` large desktop (>= 1440px — matches Figma design)
- Use relative units (`rem`, `%`, `vh/vw`) over fixed `px` where possible
- Touch targets MUST be at least 44x44px on mobile
- Test all pages at: 375px, 768px, 1024px, 1440px widths
- No horizontal scrolling at any breakpoint
- Images MUST use `next/image` with responsive sizes

### Principle 5: Security (OWASP Compliance)

All code MUST follow OWASP secure coding practices.

- **Authentication:** Google OAuth via Supabase Auth only; domain restricted
  to `@sun-asterisk.com`
- **Session Management:** Supabase session tokens with httpOnly cookies;
  refresh via middleware on every request
- **Input Validation:** Validate ALL user input on the server side; never
  trust client-side validation alone
- **XSS Prevention:** Use React's built-in escaping; never use
  `dangerouslySetInnerHTML` without sanitization
- **CSRF Protection:** Supabase Auth handles CSRF tokens; custom API routes
  MUST validate origin
- **Environment Variables:** Secrets MUST use server-only env vars
  (no `NEXT_PUBLIC_` prefix for secrets); `.env` MUST be in `.gitignore`
- **Headers:** Set security headers via Cloudflare or `next.config.ts`:
  `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
  `Content-Security-Policy`
- **Dependency Security:** Run `yarn audit` before each release; no known
  critical vulnerabilities allowed
- **Error Handling:** Never expose stack traces or internal errors to users;
  log server-side, show generic messages client-side

### Principle 6: Performance & Edge Optimization

Optimize for Cloudflare Workers edge runtime constraints.

- Prefer Server Components to minimize client JS bundle
- Use `next/image` with Cloudflare Images binding for optimization
- Lazy load below-the-fold components with `dynamic()` or `React.lazy()`
- Static assets MUST have immutable cache headers (configured in
  `public/_headers`)
- Avoid Node.js-specific APIs not available in Workers runtime
- Database queries MUST be efficient: use indexes, limit rows, avoid N+1
- Bundle size budget: First Load JS < 100KB per route

### Principle 7: Code Quality & Testing

Maintain high code quality through linting, formatting, and testing.

- ESLint MUST pass with zero warnings before commit
- Follow TDD flow when applicable: write test → implement → refactor
- Test categories:
  - Unit tests for utility functions and hooks
  - Integration tests for API routes and server actions
  - E2E tests with Playwright for critical user flows
- All interactive components MUST have keyboard navigation support
- WCAG AA compliance for all user-facing pages
- Commit messages MUST follow Conventional Commits:
  `type(scope): description` (e.g., `feat(login): add Google OAuth button`)

---

## Folder Structure

```
agentic-coding-live-demo/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Auth-related routes (login, callback)
│   │   ├── (main)/             # Authenticated routes (homepage, etc.)
│   │   ├── layout.tsx          # Root layout
│   │   ├── globals.css         # Global styles + Tailwind
│   │   └── page.tsx            # Root page (redirects)
│   ├── components/             # Reusable components
│   │   ├── ui/                 # Base UI primitives
│   │   └── {feature}/          # Feature components (login/, header/)
│   ├── libs/                   # External service clients
│   │   └── supabase/           # Supabase client (browser, server, middleware)
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # Shared TypeScript types
│   └── utils/                  # Pure utility functions
├── public/                     # Static assets
├── supabase/                   # Supabase config & migrations
│   ├── config.toml
│   ├── migrations/
│   └── seeds/
├── docs/                       # Documentation
│   ├── specs/                  # Feature specifications
│   └── plans/                  # Implementation plans
├── .momorph/                   # MoMorph AI tooling
│   ├── constitution.md         # This file
│   └── specs/                  # Generated specs from Figma
└── Configuration files
    ├── tsconfig.json
    ├── next.config.ts
    ├── eslint.config.mjs
    ├── postcss.config.mjs
    ├── wrangler.jsonc
    └── package.json
```

---

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Files (components) | kebab-case | `login-button.tsx` |
| Files (utils/hooks) | kebab-case | `use-auth.ts` |
| Components | PascalCase | `LoginButton` |
| Functions | camelCase | `handleLogin` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| Types/Interfaces | PascalCase | `UserSession` |
| CSS classes | Tailwind utilities | `bg-[#00101A]` |
| Routes | kebab-case | `/auth/callback` |
| Environment vars | UPPER_SNAKE_CASE | `SUPABASE_URL` |

---

## Governance

### Amendment Process

1. Propose change with rationale in a PR description
2. All team members MUST review and approve
3. Update this document with new version number
4. Update `Last Amended` date

### Versioning Policy

- **MAJOR:** Principle removal, redefinition, or backward-incompatible change
- **MINOR:** New principle added or existing principle materially expanded
- **PATCH:** Clarification, typo fix, non-semantic refinement

### Compliance Review

- All PRs MUST be checked against these principles before merge
- AI-generated code MUST undergo the same review standards as human code
- Quarterly review of constitution relevance and accuracy
