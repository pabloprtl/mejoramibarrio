# MejoraMiBarrio — Design System

> Reference this document every time you build or modify any UI in this project.
> All components, pages, and copy must conform to these guidelines.

---

## 1. Design Principles

Five rules that override everything else:

1. **Trust before beauty.** Users are sharing personal data. Every design decision must first ask: "Does this feel safe and official?" If beauty conflicts with trust, choose trust.
2. **One job per screen.** The petition page has one goal: get the signature. The success screen has one goal: get the share. Never compete with yourself.
3. **Social proof is the most powerful conversion tool.** The number of signatures must be visible before the form, above the fold, in large text.
4. **Warmth comes from words, not decoration.** The palette is clean and restrained. Personality lives in the microcopy — not in gradients, illustrations, or icon overload.
5. **Mobile is the only screen that matters for MVP.** Every layout decision starts at 375px width. Desktop is an enhancement, not a base.

---

## 2. Color System

### Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-brand` | `#1B3A5C` | Logo, headings, nav, links, active states |
| `--color-brand-light` | `#2E5485` | Hover states on brand elements |
| `--color-cta` | `#E8531A` | Primary CTA button ONLY. Nothing else. |
| `--color-cta-hover` | `#CF4715` | CTA button hover state |
| `--color-bg` | `#FAFAF9` | Page background (warm white, not pure white) |
| `--color-surface` | `#FFFFFF` | Cards, form background |
| `--color-text` | `#111827` | All primary body text |
| `--color-muted` | `#6B7280` | Secondary text, labels, captions |
| `--color-border` | `#E5E7EB` | All borders and dividers |
| `--color-success` | `#16A34A` | Success messages, checkmarks |
| `--color-error` | `#DC2626` | Error messages and field errors |
| `--color-progress` | `#1B3A5C` | Signature progress bar fill |

### Color Psychology

**Brand Navy `#1B3A5C`**
Used for everything that says "this is official and real." Navy is the color of municipal institutions, newspapers, and trusted services across Spain. It signals authority without coldness. Trainline uses a similar deep blue for exactly this reason. Do not use it for CTAs — it reads as "information", not "action."

**CTA Ember `#E8531A`**
Used exclusively for the primary action button. Warm orange-red creates urgency and warmth simultaneously. It is psychologically associated with taking action (traffic lights, "proceed" buttons) while still feeling human rather than alarming. It passes WCAG AA contrast with white text (≈4.7:1). Critical rule: **this color appears in one place only** — the main CTA button. Overuse destroys its power.

**Background `#FAFAF9`**
Not pure white. This warm off-white reduces eye strain for older users and gives cards (which are pure white) a subtle lift. This is the Stripe/Linear trick — the background isn't white, so white cards feel elevated.

### What NOT to do with color
- Do not use `--color-cta` on text, borders, icons, or backgrounds — only on the primary button
- Do not add a third brand color "for variety" — restraint is the design
- Do not use blue links in body text — use `--color-brand` for interactive elements, `--color-text` for static text
- Disable dark mode entirely for now (add `color-scheme: light` to html element)

---

## 3. Typography

### Font: Plus Jakarta Sans (single family)

**Why this font:**
- Modern and clean but with subtle humanist warmth — not sterile like Inter, not playful like Nunito
- Highly readable at all sizes, including for older users
- Has enough weight variety to create clear hierarchy without a second font
- Free on Google Fonts

**Import (add to `app/layout.js`):**
```js
import { Plus_Jakarta_Sans } from 'next/font/google'
const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
})
```

### Type Scale

| Name | Size (mobile) | Size (desktop) | Weight | Usage |
|---|---|---|---|---|
| Hero | 28px / 1.75rem | 36px / 2.25rem | 800 | Main petition headline |
| H2 | 22px / 1.375rem | 28px / 1.75rem | 700 | Section titles |
| H3 | 18px / 1.125rem | 22px / 1.375rem | 600 | Card titles, form headings |
| Body | 16px / 1rem | 16px / 1rem | 400 | All body text. Never go below 16px on mobile. |
| Label | 14px / 0.875rem | 14px / 0.875rem | 500 | Form field labels |
| Caption | 13px / 0.8125rem | 13px / 0.8125rem | 400 | Privacy notices, footnotes only |
| Button | 16px / 1rem | 16px / 1rem | 600 | All button text |

**Line heights:**
- Headlines: `1.2` (tight — creates impact)
- Body: `1.65` (loose — improves readability for older users)
- Buttons: `1` (vertically centered)

**Rules:**
- Never use font sizes below 13px anywhere
- Never use font weight below 400
- Use 800 weight only for the hero headline — sparingly creates impact

---

## 4. Spacing & Layout

### Spacing Scale (8px base)
```
4px   — micro gaps (icon-to-label, inline spacing)
8px   — tight spacing (within components)
12px  — small spacing
16px  — base unit (padding within cards, gap between fields)
24px  — medium spacing (section internal padding)
32px  — large spacing (between sections)
48px  — xlarge spacing (major section breaks)
64px  — page-level spacing
```

### Layout

**Max content width:** `640px` (max-w-2xl in Tailwind)
- Petition page: single column, centered, max 640px
- Landing page: cards grid, max 960px (max-w-4xl)

**Mobile padding:** `16px` horizontal (`px-4`)
**Desktop padding:** `24px` horizontal (`px-6`)

**Touch targets:** Minimum `44px` height for all interactive elements (buttons, inputs, checkboxes). Use `48px` for primary CTA.

### Page structure philosophy
On mobile (375px), the viewport is roughly 667px tall (iPhone SE — assume worst case). Everything critical for conversion must be visible in **400px** (accounting for browser chrome). That means:
- Nav: 56px
- Hero text: ~80px
- Signature count: ~40px
- CTA button: 52px
- Breathing room: ~60px
- **Total: ~288px** ✓ fits above fold with room to spare

---

## 5. Components

### 5.1 Primary CTA Button
```
Background: --color-cta (#E8531A)
Text: white, 16px, weight 600
Height: 52px (large touch target)
Width: 100% on mobile, auto (min 200px) on desktop
Border radius: 10px
Border: none
Padding: 0 24px
Transition: background-color 150ms ease
Hover: --color-cta-hover (#CF4715)
Disabled: opacity-50, cursor-not-allowed
```
**Conversion note:** Full-width buttons on mobile convert significantly better than centered or auto-width. Don't change this to look more "designed."

**Copy rules:**
- Always describe the action: "Firmar la petición" not "Enviar"
- Never: "Submit", "OK", "Aceptar", "Continuar"

### 5.2 Secondary Button
```
Background: white
Text: --color-brand, 14px, weight 600
Height: 44px
Border: 1.5px solid --color-border
Border radius: 10px
Hover: border-color --color-brand
```
Used for: share links, secondary actions. Never used as the primary CTA on any screen.

### 5.3 Signature Form
- Single column on mobile always (never 2-column on mobile)
- Labels sit ABOVE inputs, never inside (placeholder-only labels destroy older-user usability)
- Input height: `48px` (touch-friendly)
- Input focus ring: `2px solid --color-brand` (clear and accessible)
- Required marker: red asterisk `*` next to label, with explanation line at top: "Los campos marcados con * son obligatorios"
- Error messages: inline, below the affected field, in `--color-error`, 13px
- The "at least email OR phone" soft requirement: show as helper text below both fields, not as an error until submit

### 5.4 Progress Bar
```
Container height: 8px
Border radius: 9999px (fully rounded ends)
Background: --color-border (#E5E7EB)
Fill: --color-brand (#1B3A5C)
Transition: width 600ms ease
```
**IMPORTANT — always show a goal:**
Display as: `"247 de 500 firmas"` — not just `"247 firmas"`

Why: A progress bar without a goal is decoration. A progress bar toward a goal creates urgency and social proof simultaneously. "247 de 500" means someone already believes in this enough to set a target. "73% del camino" creates momentum. This is one of the highest-ROI conversion features you can add — do not skip it.

Set the goal in the `petitions` table (add a `goal_signatures` column, default 500).

### 5.5 Trust Indicators
These must appear near the form, not buried at the bottom of the page.

Three trust signals, in order of importance:
1. **Signature count**: "247 vecinos ya han firmado" — large, near the top
2. **Privacy assurance**: Small lock icon + "Datos protegidos según el RGPD" — near the form submit button
3. **Location credibility**: "Aravaca, Madrid" label on the petition — signals this is real and local

### 5.6 Success State (post-signing)
```
Large checkmark (emoji ✅ or SVG — keep it simple)
"¡Gracias por firmar!" — H2, brand color
"Tu firma ha sido registrada." — body text
```
Then immediately: **share prompt** (while emotion is highest)
```
"Comparte con tus vecinos — cada firma cuenta:"
[WhatsApp] button — green (#25D366), full width
[Copiar enlace] button — secondary style
```
Then (if shown): donation prompt, subtly below

**Do not** show the donation prompt on the same visual level as the share buttons. It should feel secondary — a "by the way" not a "now do this."

### 5.7 WhatsApp Share Button
```
Background: #25D366 (official WhatsApp green)
Text: white, 16px, weight 600
Height: 52px
Icon: WhatsApp SVG icon (inline, 20px)
Full width on mobile
```
WhatsApp-first is not just UX preference — it is your primary acquisition channel. Give it a prominent green button. The "Copiar enlace" option is for QR users.

Pre-filled WhatsApp message:
```
"He firmado la petición para arreglar los baches de Calle Ana Teresa en Aravaca.
¡Tú también puedes firmar aquí: https://mejoramibarrio.es/baches-aravaca"
```

### 5.8 Petition Card (landing page)
```
Background: white
Border: 1px solid --color-border
Border radius: 12px
Padding: 20px
Shadow: 0 1px 3px rgba(0,0,0,0.08) — subtle, not dramatic
Hover: shadow increases slightly (0 4px 12px rgba(0,0,0,0.12))
```
Contents (in order):
1. Location label — small, brand color, semibold (`"Aravaca, Madrid"`)
2. Title — H3, text-primary, 3 lines max
3. Description — body, muted, 3 lines max, truncated
4. Divider line
5. Signature count left + "Firmar →" right (both small, semibold)

---

## 6. Page Layouts

### 6.1 Petition Page (`/[slug]`)

**Mobile layout (top to bottom):**
```
┌─────────────────────────────┐
│  [Logo]              [Menu?] │  ← Nav, 56px, white, shadow-sm
├─────────────────────────────┤
│                             │
│  Aravaca, Madrid            │  ← location label, brand color, 13px semibold
│  Baches en Calle Ana        │  ← H1 hero, 28px, weight 800
│  Teresa y alrededores       │
│                             │
│  ████████████░░░░ 49%       │  ← progress bar
│  247 de 500 firmas          │  ← caption below bar
│                             │
│  [  Firmar la petición →  ] │  ← CTA button, full width, ember
│                             │
└─────────────────────────────┘  ← fold (everything above this is visible without scrolling)
│                             │
│  Por qué importa            │  ← H2
│  [2-3 sentence description] │  ← keep it SHORT
│                             │
├─────────────────────────────┤
│  Firma esta petición        │  ← form card
│  ┌─────────────────────┐   │
│  │ Nombre *            │   │
│  └─────────────────────┘   │
│  ┌──────────┐ ┌──────────┐ │
│  │ Email    │ │ Teléfono │ │  ← 2-col only on mobile if screen ≥ 400px
│  └──────────┘ └──────────┘ │
│  [2 opcional fields]        │
│  [☐ consent checkbox]       │
│  [  Firmar la petición →  ] │
│                             │
│  🔒 Datos protegidos (RGPD) │  ← trust signal, right below button
│                             │
├─────────────────────────────┤
│  Privacy notice (tiny)      │
└─────────────────────────────┘
```

**What MUST be above the fold:**
- Headline (the problem + location)
- Progress bar + signature count
- CTA button

**What must NOT be above the fold:**
- The form itself — the CTA button scrolls down to it. A visible form before commitment creates anxiety. Let users decide first (CTA click = micro-commitment), then show the form.
- Long description text
- Any legal/privacy text

### 6.2 Landing Page (`/`)

**Purpose:** Show all petitions as scannable cards. Fast, clean, no friction. Users coming from QR or links likely go directly to `/[slug]` — this page is for people who want to explore.

**Layout:**
```
Nav with logo
Hero: "Peticiones ciudadanas en tu barrio" — H1
Subline: "Firma, comparte, y presiona a tu ayuntamiento."
---
[Card] [Card] [Card]   ← 1 col mobile, 2 col tablet, 3 col desktop
```

---

## 7. UX Mistakes to Avoid

These are the mistakes that kill conversion on petition sites. Ordered by impact.

### 7.1 Putting the form above the fold (CRITICAL)
**Wrong:** Show the form immediately when the page loads.
**Why it's wrong:** A form before social proof and context creates anxiety. Users wonder "what am I signing?", "is this trustworthy?", "how many others have done this?" Answer those questions first, then ask for the signature.
**Correct:** Show headline + signature count + CTA button above the fold. CTA scrolls to the form.

### 7.2 Not showing a goal (HIGH IMPACT)
**Wrong:** Just show "247 firmas."
**Why it's wrong:** A static number means nothing without context. Is 247 a lot? A little? Did it stall?
**Correct:** "247 de 500 firmas — ¡ayúdanos a llegar a 500!" with a progress bar. This creates urgency, shows momentum, and gives users a reason to share.

### 7.3 Weak or generic CTA copy (HIGH IMPACT)
**Wrong:** "Enviar", "Registrar", "Aceptar"
**Correct:** "Firmar la petición" — says exactly what happens, which is what users want to do.

### 7.4 Making email mandatory
You considered this — correctly rejected it. Email-only forms lose 30-40% of mobile users who don't know their email off the top of their head in public. Keep email OR phone.

### 7.5 Burying the share prompt
The moment after signing is the highest-emotion point. Users are motivated, proud, and want to do more. If you wait 3 scrolls to show the WhatsApp share button, you lose 80% of potential shares. Show it IMMEDIATELY after the success message.

### 7.6 Dark mode
Do not support dark mode in MVP. Your users are 50+ year olds in a WhatsApp group. Dark mode adds design complexity and is not relevant to this audience. Add `color-scheme: light only` to the HTML element.

### 7.7 Too many "optional" fields visible at once
Your form currently shows Name, Email, Phone, Postal code, DNI/NIE — all at once. This is 5 fields. Research consistently shows every additional visible field reduces conversion. Consider hiding Postal code and DNI/NIE behind a "Añadir datos adicionales (opcional)" toggle. The data is still there for those who want to provide it, but the initial form feels lighter.

### 7.8 Animations and loading states
Do not add page transitions, skeleton screens, or complex animations. Your users are on slow mobile connections, many on older phones. Snappy and plain beats slow and beautiful every time.

### 7.9 Social sharing everywhere
No Twitter/X button. No Facebook. No Instagram. Your audience is in WhatsApp groups. One big WhatsApp button > five small social media icons.

### 7.10 Multiple CTAs on one screen
Never show two call-to-action buttons at the same level. If you're showing the signature form, the only action is "Firmar." If you're showing the success state, the only action is "Compartir." One screen, one goal.

---

## 8. Implementation (Tailwind v4)

This project uses **Tailwind CSS v4**, which has no `tailwind.config.js`. All design tokens are defined in `app/globals.css` using the `@theme` block.

### `app/globals.css`
```css
@import "tailwindcss";

@theme {
  /* ─── Colors ─── */
  --color-brand:        #1B3A5C;
  --color-brand-light:  #2E5485;
  --color-cta:          #E8531A;
  --color-cta-hover:    #CF4715;
  --color-bg:           #FAFAF9;
  --color-surface:      #FFFFFF;
  --color-text:         #111827;
  --color-muted:        #6B7280;
  --color-border:       #E5E7EB;
  --color-success:      #16A34A;
  --color-error:        #DC2626;

  /* ─── Typography ─── */
  --font-sans: "Plus Jakarta Sans", system-ui, sans-serif;

  /* ─── Border radius ─── */
  --radius-btn: 10px;
  --radius-card: 12px;
  --radius-input: 8px;
}

/* Force light mode — no dark mode support in MVP */
html {
  color-scheme: light;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}
```

### Token usage in Tailwind classes
Once defined in `@theme`, tokens become Tailwind utilities automatically:
- `bg-brand` → `background-color: #1B3A5C`
- `text-cta` → `color: #E8531A`
- `bg-cta` → `background-color: #E8531A`
- `border-border` → `border-color: #E5E7EB`
- `text-muted` → `color: #6B7280`
- `bg-bg` → `background-color: #FAFAF9`
- `bg-surface` → `background-color: #FFFFFF`
- `text-success` → `color: #16A34A`
- `text-error` → `color: #DC2626`

### Font loading (`app/layout.js`)
```js
import { Plus_Jakarta_Sans } from 'next/font/google'

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={font.variable}>
      <body>{children}</body>
    </html>
  )
}
```

### Reference classes for common patterns
```
Page background:     bg-bg
Cards/forms:         bg-surface rounded-[12px] border border-border
Primary button:      bg-cta hover:bg-cta-hover text-white font-semibold rounded-[10px] h-[52px] w-full
Secondary button:    bg-surface border border-border text-brand font-semibold rounded-[10px] h-[44px]
Input field:         border border-border rounded-[8px] px-3 h-12 text-base focus:outline-none focus:ring-2 focus:ring-brand
Section heading:     text-2xl font-bold text-brand
Body text:           text-base text-text leading-relaxed
Muted text:          text-sm text-muted
Location label:      text-xs font-semibold text-brand uppercase tracking-wide
```

---

## 9. Copywriting & Microcopy

### Brand Personality
**"Vecino-driven, sin rodeos, con ganas."**
MejoraMiBarrio speaks like the most competent, friendly neighbor you know — the one who actually gets things done. Not a government form, not an NGO newsletter. Direct, warm, action-oriented, local.

### Tone Rules
- Address users as "tú" (never "usted" — that's bureaucratic)
- Be specific: "Calle Ana Teresa" not "tu barrio"
- Lead with the problem, end with the action
- Short sentences. Rarely more than 20 words.
- No marketing fluff ("únete a la revolución", "¡transforma tu ciudad!")

### CTA Copy
| Context | Use |
|---|---|
| Signature button | "Firmar la petición" |
| Pending state | "Enviando..." |
| WhatsApp share | "Compartir por WhatsApp" |
| Copy link | "Copiar enlace" |
| Donation €1 | "€1" |
| Donation €5 | "€5" |
| Donation €20 | "€20" |
| Donation €100 | "€100" |

### Success Messages
| State | Message |
|---|---|
| Form submitted | "¡Gracias por firmar!" / "Tu firma ha sido registrada." |
| Donation complete | "¡Gracias por tu apoyo!" / "Tu donación nos ayudará a llegar más lejos." |
| Link copied | "¡Enlace copiado!" |

### Error Messages
| Error | Message |
|---|---|
| Name missing | "El nombre es obligatorio." |
| No contact | "Indica al menos un email o teléfono." |
| No consent | "Debes aceptar el aviso de privacidad para continuar." |
| Generic server error | "Algo ha ido mal. Por favor, inténtalo de nuevo." |
| Petition not found | "Esta petición no existe o ha sido eliminada." |

### Social Proof Copy
| Count | Message |
|---|---|
| 0 | "Sé el primero en firmar" |
| 1 | "1 vecino ha firmado" |
| 2–99 | "{n} vecinos han firmado" |
| 100+ | "{n} vecinos ya han firmado — ¡ayúdanos a llegar a {goal}!" |

### Donation Prompt (post-signing)
```
Headline:     "¿Quieres ir más lejos?"
Subline:      "Tu donación se usará para llegar a más vecinos y
               presionar al Ayuntamiento con más fuerza."
Amounts:      €1  €5  €20  €100
```
Keep this section visually lighter than the share section. Share = primary. Donation = secondary.

### WhatsApp Pre-filled Message
```
He firmado la petición para arreglar los baches de Calle Ana Teresa en Aravaca.
Tú también puedes firmar aquí 👇
https://mejoramibarrio.es/baches-aravaca
```
Note: encode the URL and linebreaks properly in the WhatsApp share link:
`https://wa.me/?text=...`

---

## 10. Logo

See [LOGO.md](LOGO.md) for logo concepts and specifications.

**For MVP:** Use the wordmark only — "MejoraMiBarrio" in Plus Jakarta Sans 800, color `#1B3A5C`. No icon needed to launch.

The wordmark can be styled with a subtle color split:
- "Mejora" in `#1B3A5C` (brand navy)
- "Mi" in `#6B7280` (muted gray)
- "Barrio" in `#1B3A5C` (brand navy)

Or simply the full name in brand navy, no split. Keep it simple.

---

## 11. What NOT to Build in MVP (Design Edition)

- Photo or map of the street — nice to have, not needed to launch
- Animated signature counter — static fetch is fine
- Custom illustration or icons pack — use emoji sparingly, or simple Heroicons
- Complex header/footer — a simple nav with logo and nothing else
- "About us" or "How it works" sections — your users know what a petition is
- Multiple languages — Spanish only
- Cookie banner — Plausible doesn't need one
- A loading skeleton — a brief loading state is fine
