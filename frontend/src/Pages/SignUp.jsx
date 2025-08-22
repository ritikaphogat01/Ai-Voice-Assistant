import React, { useContext, useState } from "react";
import bg from "../assets/authBg.png"
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";


function SignUp() {
const [showPassword, setShowPassword] = useState(false)
const {serverUrl, userData, setUserData} = useContext(userDataContext)
const navigate = useNavigate()
const [name,setName] =useState("")
const [email,setEmail] =useState("")
const [loading,setLoading]= useState(false);

const [password,setPassword] =useState("")
 const [err,setErr]= useState("")


// ftech api
const handleSignUp = async (e) => {
  e.preventDefault()
    setErr("")
  setLoading(true)
  // with help of axios:
  try{

    // ftech route
   let result = await axios.post(`${serverUrl}/api/auth/signup`,{
    name,password,email
   },
  //  token pass easy in cookies
   {withCredentials:true})
   setUserData(result.data)
  setLoading(false)
  navigate("/customize")

  } catch(error){
   setUserData(null)

    console.log(error)
  setLoading(false)

  setErr(error.response.data.message)


  }
}

  return (
    <div
      className="w-full h-[100vh] bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form className="w-[90%] h-[600px] max-w-[500px] bg-[#0707074e] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]" onSubmit={handleSignUp}>
        <h1 className="text-white text-[30px] font-semibold mb-[30px]">
          Register to <span className="text-blue-400"> Virtualt Assistan</span>{" "}
        </h1>

        <input
          type="text"
          placeholder="Enter your Name"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[20px] rounded-full text-[18px]"
        required onChange={(e)=> setName(e.target.value)} value={name}  />
  <input
          type="email"
          placeholder="Email"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[20px] rounded-full text-[18px]"
      required onChange={(e)=> setEmail(e.target.value)} value={email}    />

         <div className="w-full h-[60px] border-2 border-white relative bg-transparent text-white rounded-full text-[18px]">
           <input
          type={showPassword?"text":"password"}
          placeholder="Password"
          className="w-full h-[60px] outline-none  border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[20px] rounded-full text-[18px] " 
     required onChange={(e)=> setPassword(e.target.value)} value={password}  />
          {showPassword ? (
  <FaEyeSlash
    className="absolute top-[18px] right-[20px] text-white w-[25px] h-[25px] cursor-pointer"
    onClick={() => setShowPassword(false)}
  />
) : (
  <FaEye
    className="absolute top-[18px] right-[20px] text-white w-[25px] h-[25px] cursor-pointer"
    onClick={() => setShowPassword(true)}
  />
)}
         </div>
{/* password error show */}
 {err.length>0 && <p className="text-red-500 text-[17px]">
  *{err}
  </p>} 

<button className="min-w-[150px] h-[60px] mt-[30px] bg-white rounded-full text-[19px] text-black font-semibold" disabled={loading} > {loading?"Loading...":"Sign Up"}</button>
    
    <p className="text-white text-[18px] cursor-pointer" onClick={() =>navigate("/Signin")}>Already have an account? <span className="text-blue-400">Sign In</span></p>
    
      </form>
    </div>
  );
}

export default SignUp;
