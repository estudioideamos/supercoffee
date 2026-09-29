# Security and performance

Supercoffee is a static Next.js export hosted on GitHub Pages. There are no
accounts, database, payments, server actions or public submission API.
The contact form prepares a mailto link; it does not deliver or store messages.
Input limits are UX safeguards, not server-side validation.

## Release checks

- Node 24, lockfile installs, lint, TypeScript, dependency audit and static build.
- GitHub Actions pinned to verified commit hashes with minimum job permissions.
- Dependabot proposes weekly npm and Actions updates; review before merging.
- Every exported HTML page gets a build-specific hash-based script CSP.
  Arbitrary inline scripts, eval, embedded frames and HTTP form submissions
  are not allowed. Inline styles remain necessary for Next and GSAP.
- Images and compressed JavaScript have build-time size budgets. Images are
  local WebP, below-the-fold images lazy-load, fonts are self-hosted by Next.

Run: npm ci, npm run lint, npm run typecheck, npm run audit, npm run build.
Preview the exported output, not next dev, when checking the production CSP.
Never edit generated HTML after the CSP hashes have been calculated.

## Hosting boundary

A meta CSP cannot enforce frame-ancestors, reporting or HTTP-only headers.
GitHub Pages manages HTTPS and response headers. For custom HSTS, anti-framing,
Permissions-Policy and CSP reporting, use a host/proxy with configurable headers.
Do not add Next headers() to a static export and assume they will be served.

Require 2FA/passkeys on GitHub and protect the main branch through repository
settings. Those account/settings controls are separate from this code review.
If a real submission backend is added, review validation, rate limits, spam
protection, secrets, retention and monitoring before launch.

This is targeted hardening informed by OWASP Top 10 2025, not a penetration
test or a guarantee of zero vulnerabilities. npm audit only covers known
advisories. Performance budgets are not Lighthouse or real-user speed scores.
