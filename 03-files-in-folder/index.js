const fs = require('fs').promises;
const path = require('path');

const folderPath = path.join(__dirname, './secret-folder');

fs.readdir(folderPath, { withFileTypes: true })
  .then((files) => {
    files.forEach((file) => {
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        fs.stat(filePath)
          .then((stats) => {
            const fileSizeInBytes = stats.size;
            const fileSizeInKb = fileSizeInBytes / 1024;
            const fileExtension = path.extname(filePath).slice(1);

            console.log(
              `${file.name} - ${fileExtension} - ${fileSizeInKb.toFixed(3)}kb`,
            );
          })
          .catch((err) => {
            console.error(`Error reading file ${file.name}: ${err.message}`);
          });
      } else {
        console.error(`${file.name} is a directory. Skipping.`);
      }
    });
  })
  .catch((err) => {
    console.error(`Error: ${err.message}`);
  });
