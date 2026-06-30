# portfolio-website

Personal portfolio website hosted at [jd-chapman.dev](https://jd-chapman.dev).

Built with [Next.js](https://nextjs.org/) (static export), [Mantine](https://mantine.dev/) v9, and [Content Collections](https://www.content-collections.dev/) for content management. Deployed to GitHub Pages via GitHub Actions.

## Prerequisites

- Node.js 26.4.0 (use `nvm use` with the `.nvmrc` file)
- npm

## Development

```bash
npm ci
npm run dev
```

The dev server runs at `http://localhost:3000`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server (webpack mode) |
| `npm run build` | Production build to `out/` (static export) |
| `npm run start` | Serve the built `out/` directory locally |
| `npm run lint` | Run ESLint |
| `npm run test:playwright` | Run Playwright end-to-end tests |
| `npm run analyse` | Build with bundle analyzer enabled |

## Content

Content is managed via [Content Collections](https://www.content-collections.dev/) with MDX files and YAML frontmatter. The configuration is in `content-collections.ts`.

### Adding a project

1. Create a folder under `content/projects/<slug>/`:

```
content/projects/my-project/
├── page.mdx          # content + frontmatter
└── screenshot.png    # optional co-located assets
```

2. Add frontmatter to `page.mdx`:

```mdx
---
title: My Project
description: A short summary
thumbnail: 'https://example.com/thumbnail.png'
thumbnailAlt: Screenshot of the project
githubLink: 'https://github.com/user/repo'
hidden: false
---

# My Project

Write your project content here. Relative asset imports work:

import Diagram from './diagram.svg'

<Diagram />
```

3. Run `npm run dev` or `npm run build`. The project automatically appears on `/projects` unless `hidden: true`.

### Adding an experience

Create `content/experiences/<slug>/page.mdx`:

```mdx
---
title: Job Title
company: Company Name
startDate: '2024-01'
endDate: '2024-06'
---

# Job Title (Company)

Content here...
```

Omit `endDate` for current roles.

### Schema validation

Frontmatter is validated at build time using Zod schemas defined in `content-collections.ts`. Missing required fields or invalid values will fail the build with a clear error.

## Deployment

Pushing to `trunk` triggers the GitHub Actions workflow (`.github/workflows/deploy-prod-frontend.yml`) which:

1. Builds the static export
2. Runs Playwright tests
3. Deploys to GitHub Pages


