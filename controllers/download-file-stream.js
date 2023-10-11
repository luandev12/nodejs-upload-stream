const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

exports.DownloadFileStream = async (req, res, next) => {
  const fileStream = fs.createReadStream(`./migration_data.csv`);

  res.attachment('migration_data.csv');

  fileStream.pipe(res);

  fileStream.on('data', (data) => {
    console.log(
      '%cdownload-file-stream.js line:13 data',
      'color: #007acc;',
      data
    );
  });

  res.on('finish', () => {
    console.log('File download successful');
  });

  fileStream.on('error', (err) => {
    next(err);
  });
};
