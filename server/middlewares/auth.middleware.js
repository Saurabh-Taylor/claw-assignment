import { supabase } from "../app.js";
import User from "../models/user.model.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    //created a function to get token
    let token = getToken(req, res);
    //created a function to get token
    let sessionId = getSessionId(req, res);
    // we are using getUser() coz it verifies and validates the token
    const { data } = await supabase.auth.getUser(token);
    const dbUser = await User.findOne({ supabaseId: data.user.id });

    // making a user object 
    req.user = {
      id: dbUser._id,
      email: dbUser.email,
      username: dbUser.username,
      sessionId,
    };
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

function getToken(req, res) {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Check for token in cookies if not found in authorization header
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "User is not logged in",
    });
  }
  return token;
}

function getSessionId(req, res) {
  let sessionId;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    sessionId = req.headers.authorization.split(" ")[1];
  }

  // Check for sessionId in cookies if not found in authorization header
  if (!sessionId && req.cookies && req.cookies.sessionId) {
    sessionId = req.cookies.sessionId;
  }
  if (!sessionId) {
    return res.status(400).json({
      success: false,
      message: "User is not logged in",
    });
  }

  return sessionId;
}
