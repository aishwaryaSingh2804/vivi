# Vivi Route & Interaction Audit

## Routes

| Source target | React route | Status |
|---|---|---|
| `#page-home` | `/` | Implemented |
| `#page-kids` | `/kids` | Implemented |
| `#page-history` | `/history` | Implemented |
| `#page-india` | `/in` | Implemented |
| `#page-microdrama` | `/microdrama` | Implemented |
| `#page-community` | `/community` | Implemented |
| `#page-studio` | `/studio` | Implemented |
| `#page-pricing` | `/pricing` | Implemented |
| `#page-resources` | `/resources` | Implemented |
| `#page-credits` | `/resources/credits` | Implemented |
| `#page-how-to-use` | `/resources/how-to-use` | Implemented |
| `#page-blog` | `/resources/blog` | Implemented |
| `#page-faq` | `/resources/faq` | Implemented |
| `#page-contact` | `/resources/contact` | Implemented |
| `#page-privacy` | `/privacy` | Implemented |
| `#page-terms` | `/terms` | Implemented |
| `#page-refund` | `/refund` | Implemented |

## Source navigation actions

- `navigate('community')` → `/community`
- `navigate('contact')` → `/resources/contact`
- `navigate('pricing')` → `/pricing`
- `navigate('studio')` → `/studio`

## Interactions migrated

- Header dropdowns
- Notification flyout and mark-read behavior
- Account flyout
- Studio account flyout
- Internal route links
- Home prompt chips
- Home category tabs
- History tabs
- Pricing monthly/annual toggle
- FAQ accordion
- Credit calculator
- Simple credit calculator
- Cookie consent persistence
- Responsive layout overrides

## Source placeholders preserved

Links in the original prototype that are `href="#"` remain intentionally non-navigating rather than being assigned invented destinations.

## Migration boundary

The original HTML markup is retained in `src/content/*.html` and rendered through one isolated `LegacyPage` boundary. Routing, calculator logic, consent persistence, navigation handling, and responsive behavior are owned by React/TypeScript. This allows page fragments to be converted to native React components incrementally without changing the source-facing content or routes.
