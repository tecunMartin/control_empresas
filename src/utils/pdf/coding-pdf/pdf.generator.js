const puppeteer = require('puppeteer');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const pug = require('pug');

const compile = async function (templateName, data, completeFile) {
  const filepath = path.join(process.cwd(), './src/utils/pdf/coding-pdf/', `${templateName}.pug`);
  const html = await fs.readFile(filepath, 'utf-8');
  const newData = { empleados: data, empresa: [completeFile] };
  return pug.compile(html)(newData);
};

async function pdf(dataEmpresa, objectEmpresa) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = await compile('pdf.template', dataEmpresa, objectEmpresa);

    await page.setContent(content);
    await page.emulateMediaType('screen');
    await page.pdf({
      path: `./src/utils/pdf/generatorPdf/${objectEmpresa.name}.pdf`,
      format: 'letter',
      printBackground: true,
      margin: {
        top: '20px',
        bottom: '40px',
        left: '20px',
        right: '20px',
      },
    });

    console.log(chalk.greenBright('DONE PDF'));
    await browser.close();
  } catch (e) {
    return console.log('Our error', e);
  }
}

module.exports = {
  pdf,
};
