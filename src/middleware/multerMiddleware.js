import multer from 'multer';
import {CloudinaryStorage} from 'multer-storage-cloudinary';

import cloudinary from '../configs/cloudinaryConfig.js';


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'imageGram',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    resource_type: 'image',
  }
})

const uploader = multer({storage: storage});

export default uploader;