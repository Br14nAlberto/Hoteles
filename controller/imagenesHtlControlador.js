import { ImagenHtl } from "../models/ImagenesHotel.js";
import fileUpload from "express-fileupload"
import { filesPayloadExists } from "../middleware/filesPayloadExists.js";
import { fileExtLimiter } from "../middleware/fileExtLimiter.js";
import { fileSizeLimiter } from "../middleware/fileSizeLimiter.js";

const guardarIHtl = (req, res) => {
    const { myFiles } = req.body;
    console.log(myFiles + " entraaaaaa");
    
}

export { guardarIHtl } 