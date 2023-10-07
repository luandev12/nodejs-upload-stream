require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const router = require('./routes');

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
