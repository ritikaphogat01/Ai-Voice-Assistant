import React, { useContext, useState } from "react";
import bg from "../assets/authBg.png"
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";

function SignIn() {
const [showPassword, setShowPassword] = useState(false)
// const {serverUrl} = useContext(userDataContext)
const { serverUrl, setUserData } = useContext(userDataContext);

const navigate = useNavigate()

const [email,setEmail] =useState("")
const [loading,setLoading]= useState(false);

const [password,setPassword] =useState("")
// const [err,setErr]= useState("")


// ftech api
const handleSignIn = async (e) => {
  e.preventDefault()
  // setErr("")
  setLoading(true)
  // with help of axios:
  try{

    // ftech route
    // :- let
   let result = await axios.post(`${serverUrl}/api/auth/signin`,{
   email, password
   },
  //  token pass easy in cookies
   {withCredentials:true})
   setUserData(result.data)

   setLoading(false)
  navigate("/")

  } catch(error){
   setUserData(null)

    setLoading(false)
   console.log(error)
  //  setErr(error.response.data.message)
  //  if (error.response && error.response.data && error.response.data.message) {
  //   setErr(error.response.data.message);
  // } else if (error.request) {
  //   // Request was made but no response
  //   setErr("Server not responding. Please check your server connection.");
  // } else {
  //   // Something else happened
  //   setErr("An unexpected error occurred.");
  // }

  }
}

  return (
    <div
      className="w-full h-[100vh] bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form className="w-[90%] h-[600px] max-w-[500px] bg-[#0707074e] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]" onSubmit={handleSignIn}>
        <h1 className="text-white text-[30px] font-semibold mb-[30px]">
          Sign In to <span className="text-blue-400"> Virtualt Assistan</span>{" "}
        </h1>

      
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
{/* {err.length>0 && <p className="text-red-500 text-[17px]">
  *{err}
  </p>} */}

<button className="min-w-[150px] h-[60px] mt-[30px] bg-white rounded-full text-[19px] text-black font-semibold" disabled={loading} >{loading? "Loading..." : "Sign In"}</button>
    
    <p className="text-white text-[18px]" onClick={() =>navigate("/Signup")}>Want to create a new account? <span className="text-blue-400">Sign Up</span></p>
    
      </form>
    </div>
  );
}

export default SignIn;

