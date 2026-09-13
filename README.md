# Evan Falconer — Engineering Portfolio

A lightweight, responsive portfolio built for GitHub Pages. No build tools or dependencies are required.

## Preview locally

Run a local server from this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a new public GitHub repository (for example, `portfolio`).
2. Add these files to the repository and push them to the `main` branch.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose the `main` branch and `/ (root)` folder, then save.

GitHub will provide the public website address after deployment finishes.

## Update the portfolio

- Main content: `index.html`
- Colors, layout, and responsive design: `styles.css`
- Navigation and reveal effects: `script.js`
- Résumé: `assets/Evan-Falconer-Resume.pdf`
- Future project photos: place them in `assets/images/`, then replace each project card's placeholder artwork with an `<img>` element.

## Privacy note

The public page intentionally omits a phone number and street address. Review all content before publishing, especially descriptions of employer projects.
