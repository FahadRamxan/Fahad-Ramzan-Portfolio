# Fahad Ramzan — Portfolio

A modern, animated portfolio for **Fahad Ramzan**, AI Engineer. Built with React, Vite, Tailwind CSS, and Framer Motion, with a dark indigo/violet aesthetic and a **live GitHub activity** section that pulls real-time data from the GitHub API.

🔗 **Live:** https://fahadramxan.github.io/Fahad-Ramzan-Portfolio/

## ✨ Features

- **Framer Motion** throughout — scroll reveals, staggered entrances, an animated hero, filterable projects, and a detail modal.
- **Live GitHub data** — public repos, followers, total stars, most-used languages, and recent repositories pulled from the GitHub REST API at load time (cached per tab session).
- **Filterable projects** with a category filter and per-project detail modal.
- **Fully responsive** — mobile, tablet, and desktop, with an animated mobile menu.
- **Accessible & fast** — semantic HTML, keyboard-operable controls, `prefers-reduced-motion` support, and an optimized hero image (WebP, ~15 KB).
- **Content-driven** — everything lives in one file (`src/data/content.js`), sourced from the résumé.

## 🛠️ Tech Stack

| Area        | Tech                                   |
| ----------- | -------------------------------------- |
| Framework   | React 18 + Vite 6                      |
| Styling     | Tailwind CSS 3                         |
| Animation   | Framer Motion 11                       |
| Icons       | lucide-react                           |
| Deployment  | GitHub Pages (GitHub Actions)          |

## 🚀 Local Development

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## 📁 Structure

```
├── index.html                # Vite entry + meta/OG tags
├── src/
│   ├── main.jsx              # React entry
│   ├── App.jsx               # Section composition
│   ├── index.css            # Tailwind + design tokens
│   ├── data/content.js      # ← single source of truth (résumé content)
│   ├── lib/                 # motion variants, GitHub hook, helpers
│   └── components/          # Hero, About, Experience, Skills,
│       └── ui/              # Projects, GitHubActivity, Contact, …
├── public/                   # photo (webp/png), resume PDF, favicon
├── docs/                     # built site served by GitHub Pages
└── legacy-site/              # the previous vanilla HTML/CSS/JS site
```

## ✏️ Editing Content

All text — profile, experience, projects, skills, education, certifications —
lives in [`src/data/content.js`](src/data/content.js). Update that one file and
the whole site updates. No component changes needed for content edits.

To receive contact-form submissions in your inbox, paste a
[Formspree](https://formspree.io) endpoint into `FORM_ENDPOINT` in
`src/components/Contact.jsx`. Left empty, the form opens the visitor's email
client pre-filled (zero-config).

## 🌐 Deployment

The production build is committed to `docs/` and served by GitHub Pages natively
(no CI required). One-time setup: **Settings → Pages → Build and deployment →
Source → Deploy from a branch → `main` / `docs`**.

To publish an update:

```bash
npm run build                                  # outputs to docs/
git add docs && git commit -m "Deploy" && git push
```

The Vite `base` is `/Fahad-Ramzan-Portfolio/` for the project page — update it in
`vite.config.js` if you move to a custom domain or user page.

> A GitHub Actions workflow can auto-build on push instead (set Pages Source to
> "GitHub Actions"), but that requires GitHub Actions to be enabled/unblocked on
> the account.

## 📧 Contact

- **Email:** fahadramxan01@gmail.com
- **LinkedIn:** [linkedin.com/in/fahad-ramxan](https://linkedin.com/in/fahad-ramxan)
- **GitHub:** [github.com/FahadRamxan](https://github.com/FahadRamxan)

---

© 2026 Fahad Ramzan. Built with React, Framer Motion & Tailwind.
