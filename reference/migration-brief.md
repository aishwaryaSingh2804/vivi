You are a senior frontend engineer responsible for migrating an existing production-bound Vivi AI website from a single HTML/CSS/JavaScript prototype into a scalable React + TypeScript application.

I am providing the complete existing HTML file as the source of truth.

Your job is NOT to redesign the website.

Your job is to faithfully migrate the existing implementation into a maintainable React + TypeScript architecture while preserving the existing visual design, content, interactions, routes, navigation behavior, and user flows.

## PRIMARY GOAL

Convert the existing Vivi website into a production-ready React + TypeScript application.

The result must be:

- visually faithful to the source
- fully responsive
- strongly typed
- componentized
- scalable
- maintainable
- understandable to another frontend engineer
- free of broken internal links
- free of dead routes
- free of duplicated business logic where reusable abstractions are appropriate

Do not make unnecessary design changes.

The existing HTML is the source of truth for content, page structure, labels, interactions, and intended behavior.

---

# IMPORTANT: DO NOT DO EVERYTHING IN ONE GENERATION

Work in explicit phases.

Do not attempt to generate the entire application in one response.

First analyze the source and produce the architecture and migration plan.

Then implement the application in small, verifiable stages.

After each stage, clearly state:

1. What was implemented
2. What remains
3. Which source sections were migrated
4. Which routes currently work
5. Any assumptions made

Never silently omit source functionality because the context window is getting large.

---

# PHASE 1 — SOURCE AUDIT

Before writing React code, inspect the entire source file.

Create an inventory of:

### Routes/pages

Identify every page represented in the source.

Create a table:

| Source IDIntended URLPageStatus |
| ------------------------------- |

Do not assume that only navbar routes matter.

Search the entire source for:

- href
- onclick
- navigate()
- window\.location
- hash changes
- buttons that trigger navigation
- footer links
- dropdown links
- CTA buttons
- policy links
- resource links
- account links

Every navigation target must be accounted for.

---

# PHASE 2 — INTERACTION AUDIT

Identify every interactive behavior in the source.

Create an inventory for:

- navigation
- dropdowns
- notification panel
- account panel
- cookie banner
- category tabs
- billing toggle
- FAQ accordion
- prompt chips
- prompt input
- credit calculator
- model/tier selectors
- any other stateful controls
- mobile navigation if present
- Studio behavior
- external/social links

For each interaction specify:

SOURCE BEHAVIOR → REACT IMPLEMENTATION

Example:

toggleDrop() → controlled dropdown state

toggleFaq() → controlled accordion state

toggleBilling() → billingCycle state

fillPrompt() → controlled textarea state

Do not preserve imperative DOM manipulation when React state is more appropriate.

---

# PHASE 3 — ARCHITECTURE

Use a production-friendly structure similar to:

src/
app/
components/
pages/
data/
hooks/
lib/
types/
styles/
assets/

Separate:

1. page-level components
2. reusable UI components
3. content/data
4. business logic
5. routing
6. shared types
7. styling

Do not create a giant App.tsx.

Do not create a giant component containing the entire website.

Do not create one CSS file containing unrelated page-specific logic if the architecture can reasonably be improved.

However, preserve the existing visual styling and design tokens.

---

# ROUTING

Use React Router.

Replace the existing hash routing with proper routes.

The source routes should be mapped to clean URLs.

Expected route structure:

/
/kids
/history
/in
/microdrama
/community
/studio
/pricing
/resources
/resources/credits
/resources/how-to-use
/resources/blog
/resources/faq
/resources/contact
/privacy
/terms
/refund

Before implementation, verify the source file and update this list if the source contains additional routes.

Create a centralized route constants file.

Example:

ROUTES.HOME
ROUTES.KIDS
ROUTES.PRICING
etc.

Never scatter literal route strings throughout the application when a centralized route constant is appropriate.

---

# LINK SAFETY REQUIREMENT

This is critical.

Every internal link in the original source must continue to work.

Before considering the migration complete:

1. Extract every internal source link.
2. Map it to a React route.
3. Check every CTA.
4. Check every navbar item.
5. Check every dropdown item.
6. Check every footer item.
7. Check every legal link.
8. Check every "back" link.
9. Check every programmatic navigation action.

Create a final route audit table:

SOURCE LINK/ACTION | DESTINATION | REACT IMPLEMENTATION | VERIFIED

Do not leave placeholder links such as "#".

If an existing link is intentionally non-functional in the source, identify it explicitly instead of silently changing it.

External links must remain external.

---

# COMPONENT ARCHITECTURE

Identify reusable patterns from the source.

Likely shared components include:

Layout:

- MainLayout
- StudioLayout
- Header
- Footer
- CookieBanner

Navigation:

- MainNav
- NavDropdown
- NotificationPanel
- AccountPanel

Content:

- Hero
- StoryCard
- StoryGrid
- FilmCard
- FilmStack
- SectionHeader
- CategoryTabs
- FeatureCard
- PricingCard
- GalleryStrip

Resources:

- ResourceCard
- FAQAccordion
- BlogCard
- CreditCalculator

Forms:

- PromptInput
- NewsletterForm
- ContactForm

Do not create abstractions simply for the sake of abstraction.

Extract a component when:

- it is reused
- it has meaningful independent behavior
- it represents a coherent UI concept
- it makes the page easier to understand

---

# DATA ARCHITECTURE

Do not hardcode repeated content directly inside JSX.

Move repeated content into typed data files.

Examples:

data/
stories.ts
pricing.ts
faq.ts
blog.ts
navigation.ts
notifications.ts

Create appropriate TypeScript interfaces/types.

For example:

interface Story {
id: string;
title: string;
description: string;
duration: string;
tags: string[];
category: string;
visualStyle?: string;
}

Render repeated cards from data using map().

Do not duplicate the same StoryCard markup across multiple pages.

---

# PAGE ARCHITECTURE

Pages that share the same overall visual pattern should reuse components rather than duplicate markup.

For example, Kids, History, India and Microdrama have similar hero/content/card structures.

Reuse shared components where appropriate while allowing page-specific content and styling.

Do NOT force all pages into one generic component if that makes the code harder to understand.

---

# STATE MANAGEMENT

Use local React state for UI state unless there is a genuine reason for global state.

Examples:

dropdown state
notification panel state
account panel state
FAQ open state
active category
billing cycle
prompt text
calculator selections
cookie consent

Do not introduce Redux/Zustand/etc. unless the source actually requires application-wide state.

Keep state close to the component that owns it.

---

# TYPESCRIPT

Use strict TypeScript.

Avoid:

any
as any
@ts-ignore
@ts-expect-error

unless absolutely unavoidable.

If a type is uncertain, define a proper type.

Use discriminated unions where useful.

For example:

type BillingCycle = "monthly" | "annual";

type Panel = "notifications" | "account" | null;

---

# STYLING

Preserve the existing visual identity.

Do not redesign the page.

Centralize the existing design tokens:

colors
spacing
radii
typography
shadows
transitions

Keep CSS maintainable.

Avoid unnecessary inline styles.

If an inline style is repeated or represents a reusable visual concept, move it into a class or component.

Do not change content merely because you personally prefer different wording.

---

# RESPONSIVENESS

Inspect the existing source for responsive behavior.

If responsive behavior is missing or incomplete, implement sensible responsive behavior without changing the intended desktop design.

At minimum verify:

mobile
tablet
desktop
large desktop

Pay particular attention to:

- navigation
- hero layout
- grids
- pricing cards
- film stacks
- tables
- forms
- Studio
- footer
- resource pages

---

# ACCESSIBILITY

Preserve the visual design while improving semantic accessibility.

Use:

- semantic HTML
- button for actions
- links for navigation
- proper labels
- keyboard-accessible controls
- aria-expanded where appropriate
- aria-controls where appropriate
- meaningful alt text for actual images
- visible focus states

Do not use div onclick for actions when a button is appropriate.

---

# SEO

Each route should have appropriate:

- document title
- meta description
- canonical URL where appropriate
- semantic headings

Do not duplicate H1s unnecessarily.

---

# PERFORMANCE

Use:

- lazy loading where appropriate
- code splitting for larger routes where appropriate
- optimized assets
- stable list keys
- no unnecessary global listeners
- no unnecessary re-renders

Do not prematurely optimize tiny components.

---

# PRODUCTION SAFETY

Do not expose secrets or API keys in frontend code.

Do not invent backend endpoints.

Where the original prototype uses fake/static functionality, preserve the UI behavior but clearly isolate the mock/static data so it can later be replaced by real APIs.

Do not pretend that mock functionality is connected to a backend.

---

# ERROR HANDLING

Include sensible handling for:

- invalid routes
- missing data
- calculator edge cases
- empty states
- failed forms
- missing optional assets

Add a NotFound page.

---

# TESTING

After implementation, perform a route and interaction audit.

At minimum verify:

Every route renders.

Every internal link navigates somewhere valid.

Every CTA goes somewhere intentional.

Dropdowns open and close.

Flyouts open and close.

Clicking outside closes overlays where intended.

FAQ accordion works.

Tabs work.

Billing toggle works.

Calculator works.

Prompt chips populate the prompt.

Studio navigation works.

Cookie banner works.

Back links work.

No console errors.

No TypeScript errors.

No broken imports.

No missing assets.

---

# IMPORTANT SOURCE FIDELITY RULE

The source HTML is the source of truth.

Do not invent:

- new pages
- new content
- new pricing
- new copy
- new features
- new interactions

unless required to make the React application function correctly.

If something is ambiguous, identify it rather than silently changing it.

---

# IMPLEMENTATION ORDER

Implement in this order:

1. Project structure
2. Global styles/design tokens
3. Router
4. Shared layout
5. Navigation
6. Footer
7. Home page
8. Shared story/content components
9. Kids
10. History
11. India
12. Microdrama
13. Community
14. Studio
15. Pricing
16. Resources
17. Credit Calculator
18. How to Use
19. Blog
20. FAQ
21. Contact
22. Privacy
23. Terms
24. Refund
25. Cookie consent
26. Route audit
27. Interaction audit
28. TypeScript/build cleanup

Do not move to the next stage while the current stage contains known broken imports or broken routes.

---

# RESPONSE FORMAT DURING IMPLEMENTATION

For every implementation stage:

## Completed

List exactly what was added.

## Routes

List routes currently implemented.

## Interactions

List interactions currently working.

## Remaining

List what is still to be migrated.

## Issues / assumptions

List anything that could not be determined from the source.

Never claim the website is complete unless the route and interaction audits have been performed.

The final deliverable should be a clean React + TypeScript production-ready project, not merely a JSX conversion of the original HTML.