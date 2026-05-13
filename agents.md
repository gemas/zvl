# Agent Instructions for zvl Project

## Project Overview
This project is a static website served via an Nginx Docker container.

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Infrastructure: Docker, Nginx (Alpine)

## Project Structure
- `website/`: Contains all the static website files.
  - `website/Assets/`: Contains large static assets (images, fonts, etc.).
- `Dockerfile`: Optimized multi-stage build configured to cache the `Assets` folder separately for faster image builds.

## Guidelines for AI Agents
1. **Docker Modifications**: The `Dockerfile` has been structured to separate the `website/Assets/` folder from the rest of the site content to optimize Docker layer caching. When modifying the `Dockerfile`, preserve this multi-stage separation.
2. **Asset Management**: Place all large static assets (images, videos, fonts) into the `website/Assets/` folder to take advantage of the caching strategy.
3. **Static Site Updates**: Place all HTML, CSS, and JS files directly in the `website/` directory (or appropriate subdirectories outside of `Assets/`).
4. **No Build Step**: The site currently consists of vanilla HTML/CSS/JS without a Node.js build step (e.g., Webpack/Vite). Do not introduce build tools unless explicitly requested.
