const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

exports.ProcessExcel = async (req, res) => {
  const filePath = path.join('', './migration_data.csv');

  fs.createReadStream(filePath)
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', function (row) {
      console.log(row);
    })
    .on('end', () => {
      return res.status(200).json({ message: 'ok' });
    });
};
