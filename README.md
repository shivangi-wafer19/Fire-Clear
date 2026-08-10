# Fire Clear

Marketing website for Fire Clear — fire safety management support for
smaller housing providers.

## Running locally

This site uses a small `fetch()`-based include system (`js/main.js`) to
share the header and footer across pages. Because `fetch()` is blocked
for `file://` URLs by the browser's security model, **the site must be
served over HTTP** — opening the HTML files directly will leave the
header and footer blank.

From the project root, run a simple local server, for example:

```bash
python -m http.server
```

Then open `http://localhost:8000/index.html` in a browser.

Any other static file server (e.g. `npx serve`, VS Code's Live Server
extension) will also work.

## Structure

- `index.html`, `fire-safety-management.html`, `managing-fire-safety.html`,
  `person-centred-fra.html`, `contact-us.html` — pages
- `header.html`, `footer.html` — shared components, injected via
  `data-include`
- `css/` — one shared stylesheet (`common.css`, `header-footer.css`) plus
  one stylesheet per page
- `js/` — `main.js` (includes + active nav link), `animations.js`
  (scroll/hover/slider/accordion behaviour), `navigation.js` (mobile menu)
- `images/`, `Icons/` — photography and icon assets

## Deployment notes

- Contact form functionality is currently placeholder — "Book a call"
  links point at `contact-us.html` until a real form handler exists.
- No build step is required; this is a static site.
