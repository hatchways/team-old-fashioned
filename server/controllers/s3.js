const AWS = require('aws-sdk');
const asyncHandler = require('express-async-handler');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

exports.uploadImage = asyncHandler(async (req, res, next) => {
  const files = req.files;
  const urlArray = [];

  if (files) {
    const s3 = new AWS.S3();
    files.map(async (file) => {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: file.buffer,
        Key: `${req.user.id}/${file.originalname}`,
        ACL: 'public-read',
      };

      try {
        const data = await s3.upload(params).promise();
        urlArray.push(data.Location);
        if (urlArray.length === files.length) {
          res.status(200).json({
            success: {
              message: 'Your design images have been uploaded successfully',
              urlArray,
            },
          });
        }
      } catch (err) {
        res.status(400);
        throw new Error(err);
      }
    });
  }
});
