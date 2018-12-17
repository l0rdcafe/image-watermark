const fs = require("fs");
const gm = require("gm");
const chalk = require("chalk");

function watermarkImg(path) {
  return new Promise((resolve, reject) => {
    const now = new Date();
    const timestamp = `${now.toLocaleDateString()} – ${now.toLocaleTimeString()}`;
    gm(path)
      .stroke("#000")
      .font("Helvetica.ttf", 48)
      .drawText(40, 100, timestamp)
      .write(`new-${path}`, err => {
        if (err) {
          reject(err);
        }
        resolve(`new-${path}`);
      });
  });
}

async function main() {
  if (process.argv.length < 3) {
    console.log(chalk.cyan("Please provide a path to an image file to watermark."));
    process.exit(1);
  }
  try {
    const img = process.argv[2];
    const newImg = await watermarkImg(img);
    console.log(`Image timestamp added and new file ${chalk.green(newImg)} was written.`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

main();
