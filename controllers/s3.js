const AWS = require('aws-sdk');
const Busboy = require('busboy');
const stream = require('stream');

AWS.config.update({
  accessKeyId: process.env.access_key,
  secretAccessKey: process.env.secret_key,
  region: 'ap-southeast-1'
});
const s3 = new AWS.S3();

exports.UploadS3 = async (req, res) => {
  const busboy = Busboy({ headers: req.headers });
  const uploadPromises = [];

  busboy.on('file', (fieldname, file, fileName, encoding, mimeType) => {
    const pass = new stream.PassThrough();
    let totalSize = 0;

    file.pipe(pass);

    const params = {
      Bucket: 'shopify-nodejs-dev',
      Key: `uploads/${fileName.filename}`,
      Body: pass,
      ContentType: fileName.mimeType
    };

    const uploadPromise = s3.upload(params).promise();
    uploadPromises.push(uploadPromise);

    file.on('data', (chunk) => {
      const uploadedBytes = chunk.length / (1024 * 1024);
      totalSize += uploadedBytes;
      console.log(`Uploaded ${totalSize} MB`);
    });
  });

  busboy.on('finish', async () => {
    try {
      await Promise.all(uploadPromises);
      res.status(200).send('Files uploaded successfully to S3');
    } catch (err) {
      console.error('Error uploading to S3:', err);
      res.status(500).send('Error uploading files to S3');
    }
  });

  req.pipe(busboy);
};
