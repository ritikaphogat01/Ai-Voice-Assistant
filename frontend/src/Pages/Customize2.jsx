// import Name
import React, {useContext, useState} from 'react'
import { userDataContext } from '../context/UserContext'
import axios from 'axios';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


function Customize2() {
  const {userData,backendImage,selectedImage, serverUrl,setUserData} = useContext(userDataContext)
  const [assistantname,setAssistantName] = useState(userData?.Assistantname || "")
  const [loading,setLoading] = useState(false)
  const navigate= useNavigate()

//  fetch image url from backend with the help of axios
 
const handleUpdateAssistant = async() => {
  setLoading(true)
  try {
    // covert image in formdata

    let formData = new FormData()
    formData.append("assistantName", assistantname)
   if(backendImage){
    formData.append("assistantImage", backendImage)
   }else{
    formData.append("imageUrl", selectedImage)
   }

    const result = await axios.post(`${serverUrl}/api/user/update`, formData,{withCredentials:true})
    setLoading(false)
    console.log(result.data)
    setUserData(result.data)
    navigate("/")
  } catch (error) {
    setLoading(false)
    console.log(error)
  }
}

  return (
    <div className='w-full min-h-screen bg-gradient-to-t from-black to-[#010199] flex flex-col justify-center items-center py-10 px-4 relative'>
      <IoArrowBackCircleSharp className='absolute top-[30px] left-[30px] cursor-pointer text-white w-[25px] h-[25px]' onClick={() =>navigate("/customize") }  />
      
      <h1 className='text-white mb-8 text-2xl md:text-3xl text-center '>
        Enter Your <span className='text-blue-400'>Assistant Name</span>
      </h1>
  
  <input
          type="text"
          placeholder="Enter Your Name"
          className="w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[20px] rounded-full text-[18px]"
      required onChange={(e) => setAssistantName(e.target.value)} value={assistantname}    />

{assistantname &&  <button className="min-w-[250px] h-[50px] mt-10 px-6 bg-white cursor-pointer rounded-full text-[18px] text-black font-semibold shadow-md hover:bg-gray-200 transition"
    disabled={loading}    onClick={() => {
          handleUpdateAssistant()
        }}>
          {!loading?"Create Your Assistant":"Loading..."}
        </button>
}

    </div>
  )
}

export default Customize2

