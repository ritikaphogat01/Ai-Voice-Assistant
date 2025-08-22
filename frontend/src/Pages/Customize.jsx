
import React, { useRef, useContext } from 'react';
import Card from '../components/Card';
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import { LuImagePlus } from "react-icons/lu";
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleSharp } from "react-icons/io5";


function Customize() {
  const {
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage
  } = useContext(userDataContext);
const navigate = useNavigate()
  const inputImage = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
      setSelectedImage("input");
    }
  };

  const images = [image1, image2, image3, image4, image5, image6, image7];

  return (
    <div className='w-full min-h-screen bg-gradient-to-t from-black to-[#010199] flex flex-col items-center py-10 px-4'>
          <IoArrowBackCircleSharp className='absolute top-[30px] left-[30px] cursor-pointer text-white w-[25px] h-[25px]' onClick={() =>navigate("/") }  />
      <h1 className='text-white mb-8 text-2xl md:text-3xl text-center'>
        Select Your <span className='text-blue-400'>Assistant Image</span>
      </h1>

      {/* Conditional rendering */}
      {!selectedImage ? (
        <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-4'>
          {images.map((img, index) => (
            <Card key={index} image={img} />
          ))}

          {/* Upload Custom Image Card */}
          <div
            className='w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#03034a] border-2 border-[#020293] rounded-2xl overflow-hidden 
            hover:shadow-2xl cursor-pointer hover:border-4 hover:border-white flex items-center justify-center'
            onClick={() => inputImage.current.click()}
          >
            <LuImagePlus className='text-white w-[25px] h-[25px] lg:w-[35px] lg:h-[35px]' />
            <input
              type='file'
              accept='image/*'
              ref={inputImage}
              hidden
              onChange={handleImage}
            />
          </div>
        </div>
      ) : (
        // Show only selected image
        <div className='flex flex-col items-center'>
          <div className='w-[150px] h-[250px] sm:w-[200px] sm:h-[300px] border-4 border-white rounded-2xl overflow-hidden shadow-2xl'>
            <img
              src={selectedImage === "input" ? frontendImage : selectedImage}
              alt="Selected"
              className='w-full h-full object-cover'
            />
          </div>
        </div>
      )}

      {/* Show button only when an image is selected */}
      {selectedImage && (
        <button className="min-w-[150px] h-[50px] mt-10 px-6 bg-white cursor-pointer rounded-full text-[18px] text-black font-semibold shadow-md hover:bg-gray-200 transition"
        onClick={() => navigate("/customize2")}>
          Next
        </button>
      )}

 {selectedImage && (
   <button
      className="min-w-[150px] h-[50px] mt-10 px-6 bg-transparent border border-white cursor-pointer text-white rounded-full hover:bg-white hover:text-black transition"
      onClick={() =>{
         console.log("Back clicked");
         setSelectedImage(null)
      }}
    >
      Back
    </button>
 )}



    </div>
  );
}

export default Customize;
