const express = require('express');
const router = express.Router();

const { UploadLocal } = require('../controllers/local');
const { UploadS3 } = require('../controllers/s3');
const { ProcessExcel } = require('../controllers/process-excel');
const { DownloadFileStream } = require('../controllers/download-file-stream');

router.post('/upload', UploadLocal);
router.post('/stream', UploadS3);
router.post('/process-excel', ProcessExcel);
router.get('/download-file-stream', DownloadFileStream);

module.exports = router;
