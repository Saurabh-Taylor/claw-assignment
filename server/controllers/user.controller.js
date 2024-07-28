import { supabase } from "../app.js";
import User from "../models/user.model.js";
import { cookieOptions, loginUser } from "../constants.js";

/* DATA we are getting from req.user
 {
  id
  email
  username 
  sessionId
   }
*/

//REGISTER
/* DATA -INPUTS
  email - unique , not null 
  password - not null
  username - unique , not null

*/
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const ipAddress = req.ip; // to get the ip from the user

    //to check whether user has filled all given input
    if (!email || !password || !name) {
      return res.status(400).json({
        message: "Please fill in all fields.",
      });
    }

    //to check whether user already exists ? so we have to query the DB again
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists.",
      });
    }

    //supabase signup
    const { data, error } = await supabase.auth.signUp({ email, password });

    //extract the token out which will be sent to client side as well
    const token = data?.session?.access_token;

    if (error) {
      return res.status(400).json({
        success: false,
        message: "some error occurred at supabase",
        error,
      });
    }
    //save the user in mongo
    const newUser = new User({
      username: name,
      email,
      supabaseId: data.user.id,
    });
    await newUser.save();

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "some error occurred",
      error,
    });
  }
};

// LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ipAddress = req.ip;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter both email and password",
      });
    }

    //get details from supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = data?.session?.access_token;

    const dbUser = await User.findOne({ email });
    if (!dbUser) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const sessionId = await loginUser(dbUser._id, ipAddress);

    await dbUser.save();
    res.cookie("token", token, cookieOptions);
    res.cookie("sessionId", sessionId, cookieOptions);
    res.status(200).json({
      success: true,
      message: "user logged in successfully",
      user: dbUser,
      token,
      sessionId,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// LOGOUT
export const logoutController = async (req, res) => {
  const { id, sessionId } = req.user;
  const user = await User.findById(id);
  await user.updateLogoutTime(sessionId);
  await user.save();
  res.clearCookie("token");
  res.clearCookie("sessionId");
  res.status(200).json({ message: "Logged out successfully" });
  try {
  } catch (error) {}
};

// SESSIONS - Array of objects --> [{} ,{} , {}]
export const getSessionsController = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    const user = await User.findOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "sessions retrieved successfully",
      sessions: user.sessions,
    });
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error: error.message });
  }
};
