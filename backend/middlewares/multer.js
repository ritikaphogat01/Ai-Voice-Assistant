import multer from "multer";

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        // error,folder to store file
        cb(null,"./public")
    },
filename:(req,file,cb) => {
    // error, file name
    cb(null,file.originalname)
}

})

const upload = multer({storage})
export default upload