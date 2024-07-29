import User from "./models/user.model.js";

export const cookieOptions = {
    maxAge:   60 * 60 * 1000, // 1 hour
    httpOnly: true,
    sameSite: 'None'
}

export async function loginUser(userId, ipAddress) {
    const user = await User.findById(userId);
    if (user) {
      const updatedUser = await user.addLoginSession(ipAddress);
      const newSession = updatedUser.sessions[updatedUser.sessions.length - 1];
      return newSession.sessionId; // Return the sessionId to be stored in the client
    }
}


