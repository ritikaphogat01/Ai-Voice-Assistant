import React, { useContext, useEffect, useState, useRef } from 'react';
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import aiImg from "../assets/Voice.gif"
import userImg from "../assets/GOOD GIF.gif"
import { BiFoodMenu } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";


function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext);
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
const [userText,setUserText]=useState("")
const [aiText,setAiText]=useState("")

  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);

  const voicesLoadedRef = useRef(false);
  const isRecognizingRef = useRef(false) ;
const [ham,setHam] =useState(false)
  const synth = window.speechSynthesis;

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      navigate('/signin');
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };







// working
// useEffect(() => {
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   if (!SpeechRecognition) {
//     alert("Your browser doesn't support Speech Recognition.");
//     return;
//   }

//   const recognition = new SpeechRecognition();
//   recognition.continuous = true;
//   recognition.lang = "en-US";

//   // ✅ SPEAK FUNCTION
//   const speak = (text) => {
//     if (!text) return;

//     window.speechSynthesis.cancel(); // Clear queued speech
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = 'en-US';

//     utterance.onstart = () => {
//       console.log("🔊 Speaking...");
//     };

//     utterance.onend = () => {
//       console.log("✅ Done speaking. Restarting mic...");
//       recognition.start(); // Restart mic after speaking
//     };

//     window.speechSynthesis.speak(utterance);
//   };

//   // ✅ HANDLE SPEECH RESULT
//   recognition.onresult = async (event) => {
//     const transcript = event.results[event.results.length - 1][0].transcript.trim();
//     console.log("🎤 You said:", transcript);
//     recognition.stop(); // Stop while processing

//     const lowerTranscript = transcript.toLowerCase();

//     // 🎯 COMMAND HANDLER
//     if (lowerTranscript.includes("open youtube")) {
//       speak("Opening YouTube");
//       window.open("https://www.youtube.com", "_blank");
//       return;
//     }

//     if (lowerTranscript.includes("open google")) {
//       speak("Opening Google");
//       window.open("https://www.google.com", "_blank");
//       return;
//     }

//     if (lowerTranscript.includes("open calculator")) {
//       speak("Opening Calculator");
//       // Windows only: This will work in Electron, not in browser
//       // speak("Sorry, I can’t open calculator in the browser.");
//       return;
//     }

//     if (lowerTranscript.includes("who are you") || lowerTranscript.includes("what is your name")) {
//       const msg = `I am ${userData?.assistantName || "your assistant"}, created by ${userData?.name || "you"}.`;
//       speak(msg);
//       return;
//     }

//     // 🤖 Use Gemini API for unknown prompts
//     try {
//       const data = await getGeminiResponse(transcript, userData?.assistantName, userData?.name);
//       const response = data?.response || "Sorry, I didn't understand that.";
//       console.log("🤖 Gemini:", response);
//       speak(response);
//     } catch (error) {
//       console.error("Gemini API Error:", error);
//       speak("There was an error talking to Gemini.");
//     }
//   };

//   // ✅ ERROR HANDLER
//   recognition.onerror = (e) => {
//     console.error("🎙️ Speech recognition error:", e.error);
//     recognition.stop();
//   };

//   recognition.onend = () => {
//     if (!window.speechSynthesis.speaking) {
//       console.log("🎙️ Mic restarted");
//       recognition.start();
//     }
//   };

//   recognition.start();

//   return () => {
//     recognition.stop();
//     window.speechSynthesis.cancel();
//   };
// }, []);


// useEffect(() => {
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   if (!SpeechRecognition) {
//     alert("Your browser doesn't support Speech Recognition.");
//     return;
//   }

//   const recognition = new SpeechRecognition();
//   recognition.continuous = true;
//   recognition.lang = "en-US";

//    let isRecognizing = false;

//   const startRecognition = () => {
//     if (!isRecognizing) {
//       recognition.start();
//       isRecognizing = true;
//       console.log("🎙️ Mic started");
//     }
//   };

//   const stopRecognition = () => {
//     if (isRecognizing) {
//       recognition.stop();
//       isRecognizing = false;
//       console.log("🛑 Mic stopped");
//     }
//   };

//   const speak = (text) => {
//     if (!text) return;

//     window.speechSynthesis.cancel();
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = "en-US";

//     utterance.onstart = () => {
//       console.log("🔊 Speaking...");
//       stopRecognition();
//     };

//     utterance.onend = () => {
//       setAiText("")
//       console.log("✅ Done speaking. Restarting mic...");
//       startRecognition();
//     };

//     window.speechSynthesis.speak(utterance);
//   };

//   recognition.onresult = async (event) => {
//     const transcript = event.results[event.results.length - 1][0].transcript.trim();
//     console.log("🎤 You said:", transcript);
//     stopRecognition();

//     const lowerTranscript = transcript.toLowerCase();
//     // setAiText("")
//     setUserText(transcript);

//     // 📌 OPEN YOUTUBE
//     if (lowerTranscript.includes("open youtube")) {
//       speak("Opening YouTube");
//       window.open("https://www.youtube.com", "_blank");
//       return;
//     }

//     // 📌 OPEN GOOGLE
//     if (lowerTranscript.includes("open google")) {
//       speak("Opening Google");
//       window.open("https://www.google.com", "_blank");
//       return;
//     }

//     // 📌 SHOW WEATHER
//     if (lowerTranscript.includes("show weather") || lowerTranscript.includes("what's the weather")) {
//       speak("Opening weather information");
//       window.open("https://www.weather.com", "_blank");
//       return;
//     }

//     // 📌 WHO ARE YOU
//     if (lowerTranscript.includes("who are you") || lowerTranscript.includes("what is your name")) {
//       const msg = `I am ${userData?.assistantName || "your assistant"}, created by ${userData?.name || "you"}.`;
//       speak(msg);
//       return;
//     }

//     // 🤖 GEMINI RESPONSE
//     try {
//       const data = await getGeminiResponse(transcript, userData?.assistantName, userData?.name);
//       const response = data?.response || "Sorry, I didn't understand that.";
    
//       console.log("🤖 Gemini:", response);
//       setAiText(response);
//         setUserText("");
//       speak(response);
//     } catch (error) {
//       console.error("Gemini API Error:", error);
//       speak("There was an error talking to Gemini.");
//     }
//   };

//   recognition.onerror = (e) => {
//     console.error("🎙️ Speech recognition error:", e.error);
//     stopRecognition();
//   };

//   recognition.onend = () => {
//     if (!window.speechSynthesis.speaking) {
//       console.log("🔁 Restarting mic...");
//       startRecognition();
//     } else {
//       isRecognizing = false;
//     }
//   };

//   startRecognition();

//   return () => {
//     stopRecognition();
//     window.speechSynthesis.cancel();
//   };
// }, []);


//   useEffect(() => {
//   if (userData?.name) {
//     const greeting = new SpeechSynthesisUtterance(
//       `Hello ${userData.name}, What can I help you with?`
//     );
//     greeting.lang = "hi-IN";
//     window.speechSynthesis.speak(greeting);
//   }
// }, []);

useEffect(() => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Your browser doesn't support Speech Recognition.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "en-US";

  let isRecognizing = false;

  const startRecognition = () => {
    if (!isRecognizing) {
      recognition.start();
      isRecognizing = true;
      console.log("🎙️ Mic started");
    }
  };

  const stopRecognition = () => {
    if (isRecognizing) {
      recognition.stop();
      isRecognizing = false;
      console.log("🛑 Mic stopped");
    }
  };

  const speak = (text, lang = "en-US") => {
    if (!text) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;

    utterance.onstart = () => {
      console.log("🔊 Speaking...");
      stopRecognition();
    };

    utterance.onend = () => {
      setAiText("");
      console.log("✅ Done speaking. Restarting mic...");
      startRecognition();
    };

    window.speechSynthesis.speak(utterance);
  };

  recognition.onresult = async (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.trim();
    console.log("🎤 You said:", transcript);
    stopRecognition();

    const lowerTranscript = transcript.toLowerCase();
    setUserText(transcript);

    if (lowerTranscript.includes("open youtube")) {
      speak("Opening YouTube");
      window.open("https://www.youtube.com", "_blank");
      return;
    }

    if (lowerTranscript.includes("open google")) {
      speak("Opening Google");
      window.open("https://www.google.com", "_blank");
      return;
    }

    if (lowerTranscript.includes("show weather") || lowerTranscript.includes("what's the weather")) {
      speak("Opening weather information");
      window.open("https://www.weather.com", "_blank");
      return;
    }

    if (lowerTranscript.includes("who are you") || lowerTranscript.includes("what is your name")) {
      const msg = `I am ${userData?.assistantName || "your assistant"}, created by ${userData?.name || "you"}.`;
      speak(msg);
      return;
    }

    try {
      const data = await getGeminiResponse(transcript, userData?.assistantName, userData?.name);
      const response = data?.response || "Sorry, I didn't understand that.";

      console.log("🤖 Gemini:", response);
      setAiText(response);
      setUserText("");
      speak(response);
    } catch (error) {
      console.error("Gemini API Error:", error);
      speak("There was an error talking to Gemini.");
    }
  };

  recognition.onerror = (e) => {
    console.error("🎙️ Speech recognition error:", e.error);
    stopRecognition();
  };

  recognition.onend = () => {
    if (!window.speechSynthesis.speaking) {
      console.log("🔁 Restarting mic...");
      startRecognition();
    } else {
      isRecognizing = false;
    }
  };

  // ✅ Start mic first
  startRecognition();

  // ✅ Speak greeting once userData.name is ready
  if (userData?.name) {
    setTimeout(() => {
      speak(`Hello ${userData.name}, what can I help you with?`, "en-US"); // change to "hi-IN" for Hindi
    }, 500); // short delay to avoid autoplay block
  }

  return () => {
    stopRecognition();
    window.speechSynthesis.cancel();
  };
}, [userData?.name]); // <-- will rerun when name changes



  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#01016e] flex justify-center items-center flex-col gap-[17px] overflow-hidden">
     <BiFoodMenu className='lg:hidden text-white absolute top-[20px]
     right-[20px] w-[28px] h-[28px]' onClick={() =>setHam(true)} />
<div className={`absolute lg:hidden top-0 w-full h-full bg-[#00000053]
backdrop-blur-lg p-[20px] flex flex-col gap-[20px] items-start  ${ham?"translate-x-0": "-translate-x-full"} transition-transform`}>
<RxCross2  className='text-white absolute top-[20px]
     right-[20px] w-[28px] h-[28px]'  onClick={() =>setHam(false)} />
        <button
        className="min-w-[150px] h-[60px] cursor-pointer mt-[30px] bg-white rounded-full text-[19px] text-black font-semibold   "
        onClick={handleLogOut}>
        Log Out
      </button>

      <button
        className="min-w-[150px] h-[60px] mt-[30px] cursor-pointer bg-white rounded-full text-[19px] text-black font-semibold  px-[20px] py-[10px]    "
        onClick={() => navigate('/customize')}
      >
        Customize your Assistant
      </button>

<div className='w-full h-[2px] bg-gray-300'></div>
<h1 className='text-white font-semibold text-[18px]'>History</h1>

<div className='w-full h-[60%] overflow-y-auto flex flex-col mt-[20px]'>
  {userData.history?userData.history.map((his) =>(
<span  className=" w-full text-gray-200 text-[15px] ">
  {his}
</span>

  )):null }
</div>





</div>

      <button
        className="min-w-[150px] h-[60px] cursor-pointer mt-[30px] bg-white rounded-full text-[19px] text-black font-semibold absolute  hidden lg:block  top-[20px] right-[20px]"
        onClick={handleLogOut}>
        Log Out
      </button>

      <button
        className="min-w-[150px] h-[60px] mt-[30px] cursor-pointer bg-white rounded-full text-[19px] text-black font-semibold absolute top-[100px] right-[20px] px-[20px] py-[10px]  hidden lg:block  "
        onClick={() => navigate('/customize')}
      >
        Customize your Assistant
      </button>

      <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
        <img src={userData?.assistantImage} alt="" className="h-full object-cover" />
      </div>
      <h1 className="text-white text-[20px] font-semibold">I'm {userData?.assistantName}</h1>
    
   
{!aiText && <img src={userImg} alt="" className='w-[200px]' />}
{aiText && <img src={aiImg} alt="" className='w-[200px]' />}
<h1 className='text-white font-semibold text-[20px]'>
  {userText ? userText : aiText ? aiText : null}
</h1>



    </div>
  );
}

export default Home;




