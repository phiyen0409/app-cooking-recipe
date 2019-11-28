const express = require('express');
const router = express.Router();
const FileController=require('../controllers/file.controller');
const upload = require('../utils/upload');

router.route('/upload/imagebase64').post(FileController.uploadImageBase64);
router.route('/upload/image').post(upload.single('image'),FileController.uploadImage);

module.exports = router;