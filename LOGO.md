# MejoraMiBarrio — Logo & Brand Mark

---

## MVP Recommendation: Wordmark Only

For launch, use the text wordmark only. No icon needed.

```
MejoraMiBarrio
```

- Font: **Plus Jakarta Sans, weight 800**
- Color: `#1B3A5C` (brand navy)
- Size in nav: ~22px on mobile, ~24px on desktop

**Optional styling split:**
You can give "Mi" a lighter weight or color to create a subtle rhythm:
- "Mejora" → weight 800, `#1B3A5C`
- "Mi" → weight 600, `#6B7280`
- "Barrio" → weight 800, `#1B3A5C`

This is subtle, adds warmth, and doesn't require any image assets.

---

## V2 Icon Concept (for when it's worth investing time)

### Concept A — Street + Check
A simple road/street symbol (two parallel horizontal lines) with a checkmark or star above it. Metaphor: "the street, fixed." Clean, literal, recognizable.

```
    ✓
  ──────
  ──────
```

### Concept B — House + Neighborhood
A minimal house silhouette combined with a small community circle or people symbol. Metaphor: "your home, your neighborhood, improved." Warmer, less literal.

### Concept C — Letter M as a road
The letter "M" styled as a top-down view of a road with two lanes. Brand initial + product metaphor in one mark. This is the strongest option for a scalable brand mark.

### Concept D — Pin/location mark
A map pin with the city hall building or a house inside. Simple, universal, Spanish municipal feeling.

---

## Recommended Path

1. **Launch with wordmark only** — no icon needed, clean and fast
2. **After first 500 signatures**, invest time in Concept C (M-as-road) or hire a designer for a few hours
3. Use the icon at 32px in the nav, 64px on the landing page hero, and as the favicon

---

## Favicon

For MVP: use a simple text favicon.

In `app/layout.js`, export metadata with emoji favicon as a quick solution:
```js
export const metadata = {
  title: 'MejoraMiBarrio',
  description: 'Peticiones ciudadanas para mejorar nuestros barrios.',
  icons: {
    icon: '/favicon.ico',  // replace with actual icon in V2
  },
}
```

Or use the 🏘️ or 📍 emoji as a temporary favicon using a `data:` URI — acceptable for MVP.

---

## Brand Colors for Logo Use

| Context | Color |
|---|---|
| On white background | `#1B3A5C` (brand navy) |
| On brand navy background | `#FFFFFF` (white) |
| On colored background | `#FFFFFF` or `#1B3A5C` depending on contrast |

Never use the CTA ember color `#E8531A` for the logo. That color is reserved for action buttons only.
