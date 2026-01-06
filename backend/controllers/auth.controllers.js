import genToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"


export  const signUp = async (req , res) => {
 try{
    const {name, email, password} = req.body

    const existEmail = await User.findOne({email})
 if(existEmail){
    return res.status(400).json({message: "email already exists!"})
 }
 if(password.length<6){
    return res.status(400).json({message:"password must be at least 6 characters !"})
 }

//  it added some more new things : aapniside sa kudh
 const hashedPassword = await bcrypt.hash(password,10)

//  CREATE
 const user = await User.create({
    name,password:hashedPassword, email
 })
// TOKEN: it saved id (login) if we came after in 10 days
// Cookie: Sent automatically with every request to the same domain.

const token = await genToken(user._id)
// pass in cookie
res.cookie("token" ,token,{
    httpOnly:true,
    // how much time :token can store in cookie
    // day,hrs,min,sec,millisec
    maxAge:40*24*60*60*1000,
    sameSite: "None",
    secure: true,
})
// Remove password from response
//    const { password: _, ...userData } = user._doc;

return res.status(201).json(user)

 } catch (error) {
return res.status(500).json({message:`Sign Up Error ${error}`})
 }

}

// LOGIN:

export  const Login = async (req , res) => {
 try{
    const {email, password} = req.body

    const user = await User.findOne({email})
 if(!user){
    return res.status(400).json({message: "email does not exist!"})
 }
  const isMatch  = await bcrypt.compare(password, user.password)

  if(!isMatch) {
       return res.status(400).json({message: "incorrect password"})
  }


const token = await genToken(user._id)
// pass in cookie
res.cookie("token" ,token,{
    httpOnly:true,
    // how much time :token can store in cookie
    // day,hrs,min,sec,millisec
    maxAge:40*24*60*60*1000,
    sameSite: "None",
    secure: true,
})

 // Remove password from response
   //  const { password: _, ...userData } = user._doc;

return res.status(200).json(user)

 } catch (error) {
return res.status(500).json({mesage:`Login Error ${error}`})
 }

}
export const logout = async(req, res) => {
 try {
  res.clearCookie("token")
      return res.status(200).json({message: "log out successfully"})
 } catch (error) {
  return res.status(500).json({message: `logout error ${error}`})
 }
};
