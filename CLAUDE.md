@AGENTS.md
@DESIGN.md
@LOGO.md

# MejoraMiBarrio — Project Brain

## What This Is
A civic petition platform starting with a single campaign: fixing potholes on Calle Ana Teresa and nearby streets (Calle Pleyades) in Aravaca, Madrid.

Long-term vision: a broader platform for local civic action and petitions across Spain.

---

## Current Phase: MVP
Single petition. One street. Live in days. Nothing more.

---

## Core Goals
- Allow users to sign a petition in under 10 seconds
- Maximize signatures (low friction UX)
- Maintain credibility for the petition to be taken seriously
- Track how users arrive (QR, WhatsApp, etc.)
- Measure conversion (visits → signatures)

---

## Tech Stack
| Layer | Tool | Notes |
|---|---|---|
| Frontend + API | Next.js | Dynamic routes, Vercel-native |
| Database | Supabase | Free tier, built-in UI for admin |
| Hosting | Vercel | Deploy from GitHub |
| Domain | mejoramibarrio.es | Purchased on dondominio.com |
| Analytics | Plausible | Privacy-friendly, no cookie banner needed |

---

## Database Schema

### petitions
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| slug | text | e.g. "baches-aravaca" |
| title | text | Petition title |
| description | text | Full petition text |
| created_at | timestamp | Auto |

### signatures
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| petition_id | uuid | Foreign key → petitions.id |
| name | text | Required |
| email | text | Optional — but at least one of email or phone required |
| phone | text | Optional — but at least one of email or phone required |
| postal_code | text | Optional |
| dni | text | Optional — collected but unverified in MVP |
| source | text | e.g. "qr", "whatsapp", "direct" |
| consent | boolean | GDPR consent checkbox — required |
| created_at | timestamp | Auto |

---

## Source Tracking
URL parameter: `?source=qr`, `?source=whatsapp`, `?source=direct`
Stored in `signatures.source` column with every submission.

---

## UX Principles
- Form fields: Name (required), Email (optional), Phone (optional), Postal code (optional), DNI/NIE (optional)
- At least one of email or phone must be provided
- Single GDPR consent checkbox (required to submit)
- Entire form completable in under 10 seconds
- Mobile-first design (most users arrive via WhatsApp/QR)
- Language: Spanish only

---

## Admin
Supabase built-in UI for viewing signatures. No custom admin dashboard in MVP.

---

## GDPR / Privacy
- Minimal privacy notice on page (3–4 sentences)
- Consent checkbox required: "Acepto que mis datos se usen para gestionar esta petición. No se compartirán con terceros."
- No data sold or shared with third parties
- Analytics are aggregated and anonymised (Plausible)
- DNI/NIE collected optionally but not verified against any registry in MVP
- Privacy notice must mention: name, email, phone, postal code, DNI/NIE (optional)

---

## Phased Roadmap

### MVP (now)
- Single petition page in Spanish
- Form with name, email, phone (optional), postal code (optional)
- Source tracking via URL parameters
- Supabase storage
- Deployed on Vercel with custom domain
- Plausible analytics

### V2 (after MVP is validated)
- Multi-petition support (architecture already supports this)
- DNI/NIE verified signatures as premium feature
- Proper legal setup for DNI (DPIA, full privacy policy, AEPD compliance)
- Custom admin dashboard

### V3 (future)
- Paid/promoted petitions
- Premium analytics dashboards
- Monetisation features

---

## Key Decisions & Reasoning
| Decision | Reasoning |
|---|---|
| No DNI in MVP | High friction, legal cost €800–3000, kills conversion. Reserved for V2 as paid feature. |
| Petitions table even with 1 petition | Zero cost now, avoids full rewrite later |
| Supabase UI for admin | Already built, zero extra code needed |
| Plausible not Google Analytics | GDPR-friendly, no cookie banner, privacy-first |
| No email verification | Prioritise conversion over perfect verification in MVP |
| No anti-spam | Not a concern at this scale |

---

## What We Are NOT Building in MVP
- Petition creation UI
- User accounts for petition creators
- Public petition listing/directory
- Payment or premium features
- Custom admin dashboard
- Email confirmation flow
- Multi-language support
- Social sharing features

---

## User Profile
- Complete beginner (no prior coding/deployment experience)
- No existing accounts (GitHub, Vercel, Supabase)
- Needs step-by-step guidance
- Must be live in days

## Behaviour Guidelines for Claude
- Always explain what each piece of code does
- Never skip steps — assume zero prior knowledge
- Challenge decisions before implementing them
- Prefer simple and extensible over clever and complex
- Ask for confirmation before moving to next step
- Mobile-first always
- Spanish language in all user-facing content
