const multer = require('multer');
const path   = require('path');

/** Storage Engine */
const storageEngine = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './public/uploads')
      },
      filename(req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`)
      },
});

//init
const upload =  multer({
    storage: storageEngine,
    limits: { fileSize: 1024 * 1024 *5 },
    fileFilter: function(req, file, callback){
        validateFile(file, callback);
    }
});

const validateFile = function(file, cb ){
    let allowedFileTypes = /jpeg|jpg|png|gif/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType  = allowedFileTypes.test(file.mimetype);
    if(extension && mimeType){
        return cb(null, true);
    }else{
        cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
    }
};

module.exports = upload;