// is find cookie or uss m sa token ko lega and out userId
// use JWT SEcret ko use kar k token ko verify karega

import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try{
       const token = req.cookies.token
       if(!token){
        return res.status(400).json({message:"token not found"})
        // return res.status(401).json({message:"token not found"})

       }
    //    verifytoken is variable and in this token we have have a object
const verifyToken =  jwt.verify(token,process.env.JWT_SECRET)
// which id is currently Login
req.userId = verifyToken.userId

next()

    }catch(error){
  console.log(error)
  return res.status(500).json({message:"is Auth error"})
  // return res.status(401).json({message:"is Auth error"})

    }
}

export default isAuth