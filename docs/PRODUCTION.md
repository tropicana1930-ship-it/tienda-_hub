# Production readiness gates

This branch is an initial production-oriented foundation, **not a production release**.

## Architecture
Next.js App Router, PostgreSQL via Prisma, secure HttpOnly signed sessions, store-scoped data model, and a Mercado Pago integration planned behind server-side endpoints.

## Hard blockers before accepting money
1. Confirm Mercado Pago account country, payment product, and USD support with the provider. Do not silently convert currencies.
2. Build server-side checkout that computes prices from DB and reserves stock atomically.
3. Build payment creation using server-held access token, idempotency keys and provider response validation.
4. Implement webhook signature validation, provider-side payment retrieval, amount/currency/order reconciliation and idempotent state transitions.
5. Implement secure account verification, login rate limits, password reset, CSRF/origin checks and MFA for administrators.
6. Implement audit logs, tenant isolation tests, migrations, backups, monitoring and error alerts.
7. Complete legal/tax, refunds, payouts and subscription design. Provider marketplace/split-payments capabilities must be validated.
8. Run integration/security tests and a real low-value transaction in the supported currency before launch.

## Deployment
Set DATABASE_URL and AUTH_SECRET in the hosting secret manager. Never commit real credentials. Run migrations in a controlled deployment step. No live checkout is enabled in this branch.
