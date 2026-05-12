---
sessionId: session-260512-222541-1j7r
isActive: true
---

# Requirements

### Overview & Goals
The goal of this task is to refactor the frontend codebase to eliminate duplication, clean up dead code, and consolidate static assets. This will significantly improve maintainability, reduce file sizes, and streamline future updates.

### Scope
**In Scope:**
- Cleaning up all unused/commented-out HTML and JS.
- Consolidating 8 separate CSS files into a single `style.css`.
- Consolidating multiple JS files into a single `main.js`.
- Eliminating HTML duplication for the Header, Footer, and Cookie Banner.

**Out of Scope:**
- Adding new UI features or changing the visual design.
- Implementing a frontend framework like React or Vue (we will stick to vanilla HTML/JS/CSS).

### Functional Requirements
- The visual appearance and functionality (hamburger menu, carousel, cookie banner) of all pages must remain completely unchanged.
- Active link highlighting in the navigation must correctly reflect the current page.

### Non-Functional Requirements
- **Performance:** Asset consolidation means the browser only has to download `style.css` and `main.js` once, taking advantage of caching.
- **Maintainability:** Changing a nav link or footer text should require modifying only one source of truth, rather than 8 separate HTML files.

# Technical Design

### Current Implementation
- Each of the 8 HTML pages defines its own `<header>`, `<footer>`, and `<div id="cookie-banner">`, leading to hundreds of lines of duplicated HTML.
- There are 8 separate CSS files (e.g., `index.css`, `clubinfo.css`) with significant overlap in base typography, layout, and component styling.
- There are multiple JS files (e.g., `index.js`, `contact.js`) with duplicate logic for navigation menus and active link detection.
- Commented-out dead code (like `loginModal`, `nav-extras`, and shop UI) is present in the HTML and still has unused handlers in the JavaScript.

### Key Decisions
- **Asset Consolidation:** All CSS will be merged into a single `style.css` and all JS into `main.js`. Duplicate rules will be stripped out.
- **Defensive JavaScript:** Since one `main.js` will run on all pages, we will use defensive checks (e.g. `document.querySelector(...)?.addEventListener`) so the script doesn't throw errors when specific page elements (like the carousel) are missing.
- **HTML De-duplication:** To avoid a complex build system, we will use native Web Components (Custom Elements) *without* Shadow DOM. Elements like `<site-header>` and `<site-footer>` will be registered in JS and replace the massive duplicated HTML blocks across all 8 pages. This perfectly matches the "remove duplicate code" requirement natively.

### Proposed Changes
- **File Structure:**
  - Add `style.css` and `main.js`.
  - Delete `index.css`, `clubinfo.css`, `contact.css`, etc.
  - Delete `index.js`, `contact.js`, `privacybeleid.js`, etc.
- **Code Optimization:**
  - Scrub `index.html` and other files of commented out sections (`#loginModal`, `#shop`, `#cookieConsent`).
  - Minification and further optimizations are handled natively by the existing `vite` configuration when the project is built.

# Delivery Steps

###   Step 1: Cleanup unused code and empty files
Remove all dead and commented-out code to improve maintainability.
- Search through all HTML and JS files and remove commented-out features (e.g., login modal, nav-extras, old cookie consent blocks, shop placeholders).
- Remove the associated dead JavaScript logic from `index.js` (like the `loginModal` handling).
- Delete any empty or unused files (e.g., `clubactiviteiten.js`, `clubinfo.js`).

###   Step 2: Consolidate CSS into a single style.css
Unify styling to use a single CSS file across the entire application.
- Create a global `style.css` file.
- Merge the styling rules from `index.css`, `clubinfo.css`, `contact.css`, `nieuws.css`, `privacybeleid.css`, `shop.css`, `zwemmen.css`, and `clubactiviteiten.css`.
- De-duplicate shared styles (base tags, header, footer, container layout, button classes).
- Update all 8 HTML files to reference `<link rel="stylesheet" href="style.css">`.
- Delete the old individual CSS files.

###   Step 3: Consolidate JS into a single main.js
Centralize all JavaScript functionality into one optimized file.
- Create a global `main.js`.
- Move the core logic (hamburger menu, cookie banner, carousel, and active navigation highlighting) into this file.
- Make the code defensive (using `?` optional chaining and null checks) so it runs safely on pages that lack certain DOM elements.
- Update all HTML files to reference `<script src="main.js" defer></script>`.
- Delete the remaining individual JS files.

###   Step 4: Eliminate HTML duplication for common sections
Remove duplicate HTML boilerplate across the 8 pages to heavily reduce file sizes.
- Implement native Web Components without Shadow DOM (e.g., `<site-header>`, `<site-footer>`) in JS to hold the shared HTML strings for the header, footer, and cookie banner.
- Replace the repetitive `<header>`, `<footer>`, and `<div id="cookie-banner">` blocks in all 8 HTML files with these custom tags.
- Ensure the JavaScript for navigation and cookie banner logic correctly interacts with these dynamically inserted elements.