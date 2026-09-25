# GUIITAR Council website recreation

## Scope
- Recreate the reference site's shared navigation, footer, typography, colors, spacing, imagery, and responsive behavior without redesigning it.
- Build the seven specified pages at `/`, `/about`, `/funding`, `/events`, `/partner`, `/resources`, and `/contact`.
- Preserve all supplied wording, sections, cards, controls, forms, FAQs, and interactions from the specification and live reference.

## Implementation
- Define the reference-matched design tokens and typography in the global stylesheet.
- Build reusable site-wide components for the header, footer, section titles, cards, buttons, forms, filters, tabs, accordions, and overlays.
- Implement each page as its own route with unique page metadata.
- Use locally stored project assets or stable source assets from the reference; no invented content.
- Match desktop, tablet, and mobile layouts, including the responsive navigation and interaction states.

## Validation
- Check all routes and primary controls in the running preview.
- Compare desktop and mobile screenshots against the reference.
- Confirm there are no broken links, missing images, layout overlaps, runtime errors, or build errors.
