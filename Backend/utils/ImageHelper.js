const fs = require("fs");

const ImageHelper = {
  saveImageBase64: async (path, base64String) => {
    let arrData = base64String.replace("data:image/", "").split(";base64,");
    // Remove header
    let base64Image = arrData.pop();
    let lowerCase = arrData[0].toLowerCase();
    let extension = undefined;
    let name = path + "/" + new Date().getTime();

    if (lowerCase.indexOf("png") !== -1) extension = "png";
    else if (
      lowerCase.indexOf("jpg") !== -1 ||
      lowerCase.indexOf("jpeg") !== -1
    )
      extension = "jpg";

    if (extension !== undefined) {
      name += "." + extension;
      const file = await fs.writeFile(name, base64Image, { encoding: "base64" }, () => {
        console.log("File created");
      });
      name = name.substring(1, name.length);
      return name;
    }
  }
};
module.exports = ImageHelper;
