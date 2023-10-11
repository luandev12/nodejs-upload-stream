const Busboy = require('busboy');
const path = require('path');
const fs = require('fs');

exports.UploadLocal = async (req, res) => {
  const busboy = Busboy({ headers: req.headers });
  const uploadPromises = [];
  let totalSize = 0;

  busboy.on('file', (fieldname, file, fileName, encoding, mimeType) => {
    const uploadDirectory = path.join('uploads');
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: false });
    }

    const filePath = path.join(uploadDirectory, fileName.filename);

    const writeStream = fs.createWriteStream(filePath);

    file.pipe(writeStream);

    const uploadPromise = new Promise((resolve, reject) => {
      file.on('data', (chunk) => {
        const uploadedBytes = chunk.length / (1024 * 1024);
        totalSize += uploadedBytes;
        console.log(`Uploaded ${totalSize} MB`);
      });

      file.on('end', () => {
        resolve(filePath);
      });

      writeStream.on('error', (error) => {
        reject(error);
      });
    });

    uploadPromises.push(uploadPromise);
  });

  busboy.on('finish', async () => {
    try {
      await Promise.all(uploadPromises);
      res.status(200).send('Files uploaded successfully to Local');
    } catch (err) {
      console.error('Error uploading to Local:', err);
      res.status(500).send('Error uploading files to Local');
    }
  });

  req.pipe(busboy);
};
