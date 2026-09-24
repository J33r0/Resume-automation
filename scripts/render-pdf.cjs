const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

const projectRoot = path.resolve(__dirname, '..');
const inputFileFR = path.join(projectRoot, 'cv-fr.html');
const inputFileEN = path.join(projectRoot, 'cv-en.html');
const outputFileFR = path.join(projectRoot, 'CV-FR-Jeronimo-Herdoiza.pdf');
const outputFileEN = path.join(projectRoot, 'CV-EN-Jeronimo-Herdoiza.pdf');

const inputFile = process.argv[2] === 'en' ? inputFileEN : inputFileFR;
const outputFile = process.argv[2] === 'en' ? outputFileEN : outputFileFR;

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