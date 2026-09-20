const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

const projectRoot = path.resolve(__dirname, '..');
const inputFile = path.join(projectRoot, 'cv.html');
const outputFile = path.join(projectRoot, 'CV-Jeronimo-Herdoiza_Cloud-DevOps-Infrastructure.pdf');

async function renderPdf() {
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(inputFile).href, { waitUntil: 'load' });
    await page.emulateMedia({ media: 'print' });
    await page.pdf({
      path: outputFile,
      printBackground: true,
      preferCSSPageSize: true,
    });
  } finally {
    await browser.close();
  }
}

renderPdf().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});