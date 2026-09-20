# Resume Automation

Static HTML/CSS source for Jeronimo Herdoiza's French Cloud and DevOps resume.

## Structure

```text
Resume-automation/
├── cv.html          # Resume entry point
├── css/
│   └── cv.css       # Print and screen styles
└── README.md
```

## Preview

Open `cv.html` directly in a browser. The document is also formatted for A4 printing or PDF export.

## Automatic PDF build

Every push starts the `Build CV PDF` GitHub Actions workflow. The workflow renders `cv.html` with Chromium, commits the generated `CV-Jeronimo-Herdoiza_Cloud-DevOps-Infrastructure.pdf` to the repository, and uploads it as the `cv-pdf` artifact.

To download it, open the completed workflow run on GitHub and download the artifact from the **Artifacts** section.

To render the PDF locally, install Node.js and run:

```sh
npm install --no-save --no-package-lock playwright@1.55.0
npx playwright install chromium
node scripts/render-pdf.cjs
```