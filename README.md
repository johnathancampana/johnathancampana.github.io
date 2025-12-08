# Personal Site

This repo powers a small content-focused site built with Vite + React. All of the text content lives in Markdown/JSON files so it can be updated without touching component code.

## Tech Stack

- **Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.4
- **Markdown Rendering**: react-markdown 10.1.0
- **Linting**: ESLint 9.30.1

## Development

### Setup

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:5173` (or the next available port).

### Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Production Build

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory. The build includes:
- Minified JavaScript and CSS
- Optimized assets
- Tree-shaken dependencies

### Previewing Production Build

Before deploying, preview the production build locally:

```bash
npm run build
npm run preview
```

### Deployment

The `dist/` folder contains all static files needed to serve the site. You can deploy to any static hosting service:

**Common hosting options:**
- **GitHub Pages**: Automated deployment via GitHub Actions (see below)
- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag and drop the `dist/` folder or connect via Git
- **AWS S3 + CloudFront**: Upload `dist/` to an S3 bucket and configure CloudFront
- **Any static host**: Upload contents of `dist/` to your web server

**Important deployment notes:**
- The site uses hash-based routing (`#about`, `#projects`, etc.), so no special server configuration is needed
- For Vercel/Netlify, you may need a `_redirects` or `vercel.json` file to handle client-side routing (not needed for hash-based routing)

## GitHub Pages Deployment

This site is configured for automated deployment to GitHub Pages using GitHub Actions.

### Initial Setup

1. **Enable GitHub Pages in repository settings:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Select branch: **gh-pages** and folder: **/ (root)**
   - Click **Save**
   - **Note**: The workflow will automatically create the `gh-pages` branch on first run

2. **Push to trigger deployment:**
   - The workflow (`.github/workflows/deploy.yml`) automatically runs on every push to `main` or `master` branch
   - After pushing, check the **Actions** tab to see the deployment progress
   - Once complete, your site will be available at `https://username.github.io` (or `https://username.github.io/repo-name` for project pages)

### How It Works

- **Automatic deployment**: Every push to `main`/`master` triggers a build and deployment
- **Build process**: The workflow installs dependencies, builds the site with `npm run build`, and deploys the `dist/` folder
- **Manual trigger**: You can also manually trigger deployment from the **Actions** tab using the "workflow_dispatch" option

### Troubleshooting GitHub Pages

**Site not updating / 404 errors:**
- Check the **Actions** tab for failed workflows - look for any error messages
- Ensure GitHub Pages is set to use **Deploy from a branch** with branch **gh-pages** and folder **/ (root)**
- Verify the `gh-pages` branch exists and contains the `dist/` contents (check the branch in GitHub)
- Wait a few minutes after deployment - GitHub Pages can take 1-2 minutes to update
- If you see "There isn't a GitHub Pages site here", the `gh-pages` branch may not exist yet - trigger the workflow manually from the Actions tab

**Build failures:**
- Check the workflow logs in the **Actions** tab
- Ensure `package.json` has all required dependencies
- Verify Node.js version compatibility (workflow uses Node 20)

**404 errors on content files:**
- Verify that `public/` folder contents are being copied to `dist/` during build
- Check that file paths in code match the production structure
- Ensure `.nojekyll` file exists in `public/` (prevents Jekyll processing)

## Project Structure

```
personal-site/
├── public/
│   ├── content/          # JSON data files
│   │   ├── projects.json # Project entries
│   │   └── reviews.json  # Review entries
│   ├── projects/         # Project detail pages (HTML + Markdown)
│   ├── reviews/          # Review detail pages (HTML + Markdown)
│   └── writing/          # Writing detail pages (HTML + Markdown)
├── src/
│   ├── content/          # Main content Markdown files
│   │   ├── about.md      # Bio/about section
│   │   ├── projects.md   # Projects section intro
│   │   └── writing.md    # Writing section content
│   ├── App.jsx           # Main React component
│   ├── App.css           # Component styles
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies and scripts
```

## Content Management

### Updating Bio/About Section

Edit `src/content/about.md` directly. For production builds, also ensure the file exists in `public/src/content/about.md` (files are automatically copied during setup). Changes will appear immediately in development and after rebuilding for production.

### Adding Projects

1. **Add entry to JSON**: Append a new object to `public/content/projects.json` with:
   - `title` - Project/work title
   - `slug` - URL-friendly identifier (used in filename)
   - `role` - Your role (e.g., "Tech Lead", "Product Manager")
   - `company` - Company name
   - `type` - Project type/category
   - `skills` - Array of relevant skills
   - `summary` - Short description shown on card
   - `date` - Date in YYYY-MM-DD format

2. **Create detail page**:
   - Add Markdown: `public/projects/<slug>.md`
   - Copy `public/projects/template.html` → `public/projects/<slug>.html`
   - Update the `markdownFile` variable in the HTML to point to your `.md` file

3. **Update intro** (optional): Edit `src/content/projects.md` to change the Projects section introduction. For production, ensure it's also in `public/src/content/projects.md`.

### Adding Reviews

1. **Add entry to JSON**: Append a new object to `public/content/reviews.json` with:
   - `title` - Review title
   - `type` - One of: `book`, `movie`, `article`
   - `rating` - Number 0-5 (supports decimals like 4.5)
   - `image` - URL to cover image
   - `slug` - URL-friendly identifier
   - `blurb` - Short description shown on hover
   - `dateCompleted` - Date in YYYY-MM-DD format

2. **Create detail page**:
   - Add Markdown: `public/reviews/<slug>.md`
   - Copy `public/reviews/template.html` → `public/reviews/<slug>.html`
   - Update the `markdownFile` variable in the HTML to point to your `.md` file

The Reviews tab will automatically show the new card with filters, rating stars, and hover effects.

### Adding Writing Pieces

1. **Add Markdown file**: `public/writing/<slug>.md`

2. **Create HTML page**:
   - Copy `public/writing/template.html` → `public/writing/<slug>.html`
   - Update the `markdownFile` variable to point to your new `.md` file

3. **Add link**: Edit `src/content/writing.md` and add a link to `/writing/<slug>.html`. For production, ensure it's also in `public/src/content/writing.md`.

## Maintenance

### Updating Dependencies

Periodically update dependencies to get security patches and new features:

```bash
npm outdated          # Check for outdated packages
npm update            # Update to latest versions within semver ranges
npm audit             # Check for security vulnerabilities
npm audit fix         # Automatically fix vulnerabilities
```

### Code Quality

Run the linter before committing:

```bash
npm run lint
```

### Troubleshooting

**Build fails:**
- Clear `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check Node.js version (Vite 7 requires Node 18+)

**Content not updating:**
- Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
- Clear browser cache
- Rebuild: `npm run build`

**Routing issues:**
- The site uses hash-based routing (`#about`, `#projects`), so no server configuration needed
- If deploying to a service that doesn't support SPAs, ensure hash routing is working

**Markdown not rendering:**
- Check that file paths in HTML templates are correct
- Verify Markdown files are in the correct directories
- Check browser console for 404 errors

### Performance Optimization

The production build is already optimized by Vite:
- Code splitting
- Tree shaking
- Minification
- Asset optimization

For further optimization:
- Optimize images before adding to `public/` directory
- Consider lazy loading for review images if the list grows large
- Monitor bundle size with `npm run build` and check the output

## Environment Variables

Currently, no environment variables are required. All content is static and served from the `public/` directory.

## Browser Support

The site uses modern JavaScript features. Supported browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)
