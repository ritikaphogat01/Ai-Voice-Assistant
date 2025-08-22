import React from 'react'
import {Route ,Routes,Navigate } from 'react-router-dom'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import Customize from './Pages/Customize'
import { useContext } from 'react'
import { userDataContext } from './context/UserContext'
 import Customize2 from './Pages/Customize2'
 import Home from './Pages/Home'



const App = () => {
  const {userData ,setUserData} =useContext(userDataContext)
  return (
   <Routes>
 

     <Route path='/' element={(userData?.assistantImage && userData?.assistantName)?<Home/> : <Navigate to = {"/customize"}/>  } />     
<Route path='/signup' element={!userData?<SignUp/>: <Navigate to={"/"} />  } />
      <Route path='/signin' element={!userData?<SignIn/>: <Navigate to={"/"} />  } /> 
    <Route path='/customize' element={userData?<Customize />: <Navigate to={"/signup"} />  } />
    <Route path='/customize2' element={userData?<Customize2 />: <Navigate to={"/signup"} />  } />

   </Routes>
  )
}

export default App