import { supabase } from "../app.js";
import User from "../models/user.model.js";
import moment from "moment-timezone";

import { cookieOptions, loginUser } from "../constants.js";


//REGISTER
export const registerController = async (req, res) => {
  try {
    const { name ,  email, password } = req.body
    const ipAddress = req.ip

    if (!email || !password || !name) {
        return res.status(400).json({
          message: "Please fill in all fields.",
        })
      }

    //supabase signup
    const {data , error} = await supabase.auth.signUp({ email, password })
    const token = data?.session?.access_token
    if (error) {
      return res.status(400).json({ 
        success:false,
        message:"some error occurred at supabase",
        error
       })
    }
    //save the user in mongo
    const newUser = new User({
      username:name,
      email,
      supabaseId: data.user.id,
    });
    await newUser.save()
    res.cookie("token", token, cookieOptions);
  
    res.status(201).json({ 
        success: true,
        message: "User created successfully",
        token
     })

  } catch (error) {
    console.error(error)
    res.status(400).json({ 
        success: false,
        message: "some error occurred",
        error
     })
  }
};

// LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const ipAddress = req.ip;


        if(!email || !password){
          return res.status(400).json({
            success: false,
            message: "Please enter both email and password",
          })
        }

        //get details from supabase 
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if(error){
          return res.status(400).json({
            success: false,
            message: "Invalid email or password",
            })
        }
        const token = data?.session?.access_token

        
        const dbUser = await User.findOne({email})
        if (!dbUser) {
          return res.status(401).json({ 
              success: false,
              message: "User not found" 
          })
      }

      const sessionId = await loginUser(dbUser._id , ipAddress)

      
        await dbUser.save()
        res.cookie("token", token, cookieOptions);
        res.cookie("sessionId", sessionId, cookieOptions);
        res.status(200).json({
          success:true , 
          message:"user logged in successfully",
          user: dbUser,
          token,
          sessionId 
          })
      } catch (error) {
        res.status(400).json({ error: error.message })
      }
};


// LOGOUT
export const logoutController = async(req,res)=>{
  const {id , sessionId} = req.user
  const user = await User.findById(id)
  await user.updateLogoutTime(sessionId);
  await user.save()
  res.clearCookie("token")
  res.clearCookie("sessionId")
  res.status(200).json({ message: 'Logged out successfully' });
  try {
    
  } catch (error) {
    
  }
}
