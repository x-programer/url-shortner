const express = require('express');
const {handleShortUrl} = require('../controllers/url')
const router = express.Router();

router.post("/" , handleShortUrl);

module.exports = router;
