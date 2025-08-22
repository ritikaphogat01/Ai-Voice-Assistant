import User from "../models/user.model.js"
import uploadOnCloudinary from "../config/cloudinary.js"
import geminiResponse from "../gemini.js"
import moment from "moment"

 export const getCurrentUser = async (req,res) => {
    try {
       const userId= req.userId
          const user= await User.findById(userId).select("-password")
   if(!user){
    return res.status(400).json({message:"user not found"})
   }
   
    return res.status(200).json(user)
     } catch (error) {
     return res.status(400).json({message:"get current user error"})
     }
        
     }

     export const updateAssistant = async (req,res) =>{
      try {
         const {assistantName, imageUrl} = req.body
         let assistantImage;
         
         if(req.file){
            assistantImage=await uploadOnCloudinary(req.file.path)
         } else{
            assistantImage=imageUrl
         }

const user = await User.findByIdAndUpdate(req.userId,{
   assistantName,assistantImage
},{new:true}).select("-password")
return res.status(200).json(user)

      } catch (error) {
          return res.status(400).json({message:" updateAssistant user error"})
     }
      }


//       export const askToAssistant = async(req,res) =>{

//          try {
//             const {command} = req.body
//            const user=await User.findById(req.userId);
//            const userName = user.name
//            const assistantImage=user.assistantImage
//            const assistantName= user.assistantName
// const result = await geminiResponse(command, assistantName,userName)

// const jsonMatch= result.match(/{[\s\S]*}/)
// if(!jsonMatch){
//    return res.status(400).json({response:"sorry, i can't understand"})

// }
//   const gemResult = json.parse(jsonMatch[0])
//  const type = gemResult.type
           
//      //    switch case:
//         switch(type){
//             case 'get-date' : 
//             return res.json({
//                 type,
//                 userInput :gemResult.userInput,
//                 response:`current date is ${moment().format("YYY-MM-DD")}`
                
//             });
//             case 'get-time' :
//                 return res.json({
//                 type,
//                 userInput :gemResult.userInput,
//                 response:`current time is ${moment().format("hh:mm A")}`
                
//             });

//              case 'get-day' :
//                 return res.json({
//                 type,
//                 userInput :gemResult.userInput,
//                 response:`today is ${moment().format("dddd")}`
                
//             });
//              case 'get-month' :
//                 return res.json({
//                 type,
//                 userInput :gemResult.userInput,
//                 response:`current time is ${moment().format("MMMM")}`
                
//             });
// case 'google-search':
// case 'youtube-search':
// case 'youtube-play':
// case 'general':
// case 'calculator-open':
// case 'instagram-open':
// case 'facebook-open':
// case 'weather-show':
// return res.json({
//     type,
//     userInput:gemResult.userInput,
//     response:gemResult.response,
// }
// );
//   default:
//     return res.status(400).json({response: "I didn't understand that command."})
// }

//          } catch (error) {
//                return res.status(500).json({response: "ask assistant error"})
//          }
//       }


export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;

    const user = await User.findById(req.userId);
    user.history.push(command)
    user.save()
    const userName = user.name;
    const assistantImage = user.assistantImage;
    const assistantName = user.assistantName;

    // ⬇️ Get Gemini result
    const result = await geminiResponse(command, assistantName, userName);

    // ⬇️ Debug: show raw Gemini result
    console.log("📩 Gemini raw result:", result);

    const jsonMatch = result.match(/{[\s\S]*}/);

    if (!jsonMatch) {
      // ⛔ Fallback if Gemini fails to return valid JSON
      return res.status(400).json({
        type: "invalid",
        userInput: command,
        response: "Sorry, I can't understand that.",
      });
    }

    // ✅ Corrected JSON.parse
    const gemResult = JSON.parse(jsonMatch[0]);

    // ⬇️ Debug: show parsed Gemini object
    console.log("✅ Parsed Gemini JSON:", gemResult);

    const type = gemResult.type;

    // ✅ Standard response object across all cases
    switch (type) {
      case "get-date":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `Current date is ${moment().format("YYYY-MM-DD")}`,
        });

      case "get-time":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `Current time is ${moment().format("hh:mm A")}`,
        });

      case "get-day":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `Today is ${moment().format("dddd")}`,
        });

      case "get-month":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `Current month is ${moment().format("MMMM")}`,
        });

      case "google-search":
      case "youtube-search":
      case "youtube-play":
      case "general":
      case "calculator-open":
      case "instagram-open":
      case "facebook-open":
      case "weather-show":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: gemResult.response,
        });

      default:
        return res.status(400).json({
          type: "unknown",
          userInput: command,
          response: "I didn't understand that command.",
        });
    }



  } catch (error) {
    console.error("❌ askToAssistant error:", error);
    return res.status(500).json({
      type: "error",
      userInput: req.body.command,
      response: "Something went wrong while processing your command.",
    });
  }
};
