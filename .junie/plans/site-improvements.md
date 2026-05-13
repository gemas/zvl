---
sessionId: session-260513-151453-15ij
---

# Requirements

### Overview & Goals
The primary goal is to improve the maintainability, performance, and SEO of the ZVL static website. We will ensure the site remains a pure static HTML/CSS/JS project served by Nginx, specifically avoiding the introduction of a Node.js build step in accordance with the `agents.md` guidelines.

### Scope
**In Scope**:
- Eliminating duplicated HTML (header, navigation, cookie banner, footer).
- Optimizing massive asset files for faster page loads.
- Fixing the contact form submission logic.
- Improving SEO meta tags across all pages.
- Organizing global CSS/JS files properly.

**Out of Scope**:
- Changing the visual design or branding.
- Adding a bundler/build tool like Webpack, Vite, or Eleventy.

# Technical Design

### Current Implementation
- **HTML Duplication**: The `<header>`, `<nav>`, `<div id="cookie-banner">`, and `<footer>` blocks are copy-pasted across all 7 pages (e.g., `index.html`, `clubinfo.html`, `contact.html`, etc.). Any menu change requires updating 7 files manually.
- **Asset Bloat**: Large images (e.g., `pexels-juli-ane-351889530-31049377.jpg` which is 6000x4000 resolution) and unoptimized PNG/MP4 files are severely impacting the repository size (27MB) and page load speed. Inconsistent naming (e.g., `WhatsApp Image 2025-05-08...`) makes maintenance hard.
- **Broken Form**: `contact.html` contains input fields, but the submit button fires an `onclick="window.location.href='mailto:...'"` event. This discards all the typed input data and just opens an empty email client.
- **SEO & Global Files**: Only `index.html` has a `<meta name="description">`. The CSS/JS used globally is confusingly named `index.css`/`index.js` and sometimes linked redundantly (e.g. `index.css` is linked twice in `contact.html`).

### Key Decisions
1. **Nginx SSI (Server-Side Includes)**: Since the site runs on Nginx and build tools are restricted, we will enable Nginx SSI. We will extract the header and footer into `components/header.html` and `components/footer.html`, and use `<!--# include virtual="/components/header.html" -->` in our pages. This DRYs out the code with zero JavaScript or build overhead.
2. **Formspree / Web3Forms Integration**: To make the contact form functional without a backend, we will point the form `action` to a free static form provider (like Web3Forms or Formspree). This ensures users' messages are actually emailed to `zwemlanaken@gmail.com` with all the filled-in fields.
3. **Global Asset Renaming**: Rename `index.css` to `global.css` and `index.js` to `global.js` to reflect their actual usage across the entire site.

### File Structure Changes
- Add `nginx.conf` in the project root to enable SSI in the Docker container.
- Create `website/components/header.html` and `website/components/footer.html`.
- Rename `website/index.css` -> `website/global.css`.
- Rename `website/index.js` -> `website/global.js`.

# Delivery Steps

###   Step 1: Asset Optimization & Global Refactoring
The website's static assets are optimized and global files are properly named, reducing load times and improving maintainability.

- Compress extremely large images (e.g., the 6000x4000 `pexels-juli-ane-351889530-31049377.jpg`) to web-friendly dimensions and formats.
- Standardize the names of assets currently named like `WhatsApp Image ...` or `Untitled-1 kopie.png`.
- Rename `index.css` to `global.css` and `index.js` to `global.js` to accurately reflect their usage across all pages.
- Update all HTML files to reference the newly named global files and remove redundant imports (e.g., `index.css` linked twice in `contact.html`).

###   Step 2: Enable Nginx Server-Side Includes (SSI)
The website uses Nginx Server-Side Includes (SSI) to share header and footer components, completely removing HTML duplication across the 7 pages.

- Create an `nginx.conf` that sets `ssi on;` for HTML files.
- Update the `Dockerfile` to copy this configuration into `/etc/nginx/conf.d/default.conf`.
- Extract the duplicated `<header>`, `<nav>`, cookie banner, and `<footer>` HTML from all `.html` pages into new files: `website/components/header.html` and `website/components/footer.html`.
- Replace the duplicated code in all `.html` pages with Nginx SSI tags (`<!--# include virtual="/components/header.html" -->`).

###   Step 3: Fix Contact Form
The contact form is fully functional and successfully submits user input data.

- Refactor the form in `contact.html` to use a free static form service (like Web3Forms or Formspree) by updating the `<form action="...">` attribute.
- Remove the broken `onclick="window.location.href='mailto:...'"` JavaScript hack on the submit button, which currently discards the user's typed input.
- Ensure all form inputs have the correct `name` attributes and basic HTML5 validation.

###   Step 4: SEO and Meta Tags Enhancement
All website pages have comprehensive SEO meta tags and improved semantic HTML/accessibility.

- Add missing `<meta name="description">`, Open Graph tags (`og:title`, `og:image`), and `<meta name="keywords">` to `clubinfo.html`, `zwemmen.html`, `nieuws.html`, `clubactiviteiten.html`, and `contact.html`.
- Audit and add descriptive `alt` attributes to all `<img>` tags across the site for better accessibility.
- Wrap the main content of each page in semantic `<main>` tags instead of relying purely on generic `<section>` and `<div>` tags.