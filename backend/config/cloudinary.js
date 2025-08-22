// Multer send file in req.file


import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

const uploadOnCloudinary = async (filePath) => {
//    configuration
 cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
 
// function for upload image
try {
     const uploadResult = await cloudinary.uploader
        .upload(filePath)
    // .upload(
    //        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
    //            public_id: 'shoes',
    //        }
    //     )
    //    deletfile fs
fs.unlinkSync(filePath)
       return uploadResult.secure_url
} catch (error) {
    fs.unlinkSync(filePath)
    return resizeBy.status(500).json({message:"cloudinary error"})
}


}

export default uploadOnCloudinary