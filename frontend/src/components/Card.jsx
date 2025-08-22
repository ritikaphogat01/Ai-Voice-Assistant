import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext'

function Card({image}) {
  const { serverUrl,
      userData,
      setUserData,
      frontendImage,
      setFrontendImage,
      backendImage,
      setBackendImage,
      selectedImage,
      setSelectedImage} = useContext(userDataContext)
  return (
    <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#03034a] border-2 border-[#020293] rounded-2xl overflow-hidden 
    hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white 
    ${selectedImage == image?"border-4 border-white shadow-2xl shadow-blue-950": null}  `}
     onClick={() =>
{setSelectedImage(image)
  // if we click on image then othe front and backend image are null
  // bcoz if we send data so these images are nor present only selected image data will send
  setBackendImage(null)
  setFrontendImage(null)

}
    }>
<img src={image} className='h-full object-cover' />
    </div>
  )


}

export default Card 