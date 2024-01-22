const fs = require('fs').promises;
const path = require('path');

const sourceFolder = path.join(__dirname, 'files');
const destinationFolder = path.join(__dirname, 'files-copy');

async function copyDir(source, destination) {
  try {
    await fs.mkdir(destination, { recursive: true });
    const files = await fs.readdir(source);

    for (const file of files) {
      const sourcePath = path.join(source, file);
      const destinationPath = path.join(destination, file);

      await fs.copyFile(sourcePath, destinationPath);
      console.log(`Copied: ${file}`);
    }

    console.log('Directory copied!');
  } catch (err) {
    console.error(`Error copying directory: ${err.message}`);
  }
}

copyDir(sourceFolder, destinationFolder);
