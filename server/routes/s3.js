const multer = require('multer');
const express = require('express');
const router = express.Router();

const protect = require('../middleware/auth');
const { uploadImage } = require('../controllers/s3');

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  },
});

var multipleUpload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
}).array('designImg', 5);

router.post('/uploadimage', protect, multipleUpload, uploadImage);

module.exports = router;
