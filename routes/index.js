const express = require('express');
const router = express.Router();

const { UploadLocal } = require('../controllers/local');
const { UploadS3 } = require('../controllers/s3');

router.post('/upload', UploadLocal);
router.post('/stream', UploadS3);

module.exports = router;
