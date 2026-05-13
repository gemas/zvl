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
- Creating a Dockerfile to build and host the static website.

**Out of Scope:**
- Adding new UI features or changing the visual design.
- Implementing a frontend framework like React or Vue (we will stick to vanilla HTML/JS/CSS).

### Functional Requirements
- The visual appearance and functionality (hamburger menu, carousel, cookie banner) of all pages must remain completely unchanged.
- Active link highlighting in the navigation must correctly reflect the current page.

### Non-Functional Requirements
- **Performance:** Asset consolidation means the browser only has to download `style.css` and `main.js` once, taking advantage of caching.
- **Maintainability:** Changing a nav link or footer text should require modifying only one source of truth, rather than 8 separate HTML files.
- **Hosting:** The application will be containerized using Docker, employing a multi-stage build (Node.js for Vite build, Nginx for serving static files).

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
- **Containerization:** We will use Docker with a multi-stage build. The first stage will use a Node.js image to install dependencies and run the Vite build (`npm run build`). The second stage will use a lightweight Nginx Alpine image to serve the static assets generated in the `dist` folder.

### Proposed Changes
- **File Structure:**
  - Add `style.css` and `main.js`.
  - Add `Dockerfile` and `.dockerignore` in the `website` directory.
  - Delete `index.css`, `clubinfo.css`, `contact.css`, etc.
  - Delete `index.js`, `contact.js`, `privacybeleid.js`, etc.
- **Code Optimization:**
  - Scrub `index.html` and other files of commented out sections (`#loginModal`, `#shop`, `#cookieConsent`).
  - Minification and further optimizations are handled natively by the existing `vite` configuration when the project is built.