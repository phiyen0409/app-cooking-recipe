const ImageHelper = require("../utils/ImageHelper");

const dotenv = require("dotenv");
dotenv.config();
const APP_URL = process.env.APP_URL;

module.exports = {
  uploadImageBase64: async (req, res) => {
    try {
      //console.log(req);
      if (req.body.image === undefined) {
        res.status(400).json({
          message: "No file received!"
        });
      } else {
        let fileName = await ImageHelper.saveImageBase64(
          "./public/uploads",
          req.body.image
        );
        res.status(201).json({
          message: "Image is uploaded successfully!",
          image: fileName
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "Image is uploaded fail!",
      });
    }
  },
  uploadImage: async (req, res) => {
    if (req.file === undefined) {
      return res.status(400).json({ message: "No file received" });
    } else {
      let image = APP_URL + "/public/uploads/" + req.file.filename;
      res.status(201).json({
        message: "Image is uploaded successfully!",
        image: image
      });
    }
  }
};
