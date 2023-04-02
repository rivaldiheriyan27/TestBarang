const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const FormData = require('form-data');
const axios = require('axios');
const privateKey = process.env.imagekit_api_key;

const imageUploadMiddleware = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    const fileType = req.file.mimetype.split('/');
    if (fileType[0] !== 'profilepicture' && fileType[0] !== 'image') {
      throw { name: 'File needs to be an image' };
    }

    const form = new FormData();
    form.append('file', req.file.buffer.toString('base64'));
    form.append('fileName', req.file.originalname);

    const response = await axios({
      url: 'https://upload.imagekit.io/api/v1/files/upload',
      method: 'post',
      data: form,
      headers: form.getHeaders(),
      auth: {
        username: privateKey,
      },
    });

    req.photoItem = response.data.url;
    next();
  } catch (err) {
    console.log(err, 'ini error');
    next(err);
  }
};

module.exports = imageUploadMiddleware;

