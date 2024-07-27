import moment from "moment-timezone";
import mongoose, { Schema, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
    },
    supabaseId: {
      type: String,
      required: true,
      unique: true,
    },
    sessions: [
      {
        sessionId:String,
        loginTime: {
          type: Date,
        },
        logoutTime: {
          type: Date,
        },
        ipAddress: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);


// Method to add a new login session
userSchema.methods.addLoginSession = function(ipAddress) {
  // generating a unique id , so that when we implement the logout logic , we will update only that data object which was logged in
  const sessionId = uuidv4();
  // to get the time format as of India , coz my default the new Date gives UTC format 
  const loginTime = moment.tz(new Date(), "Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss');
  this.sessions.push({
    sessionId,
    loginTime,
    ipAddress,
  });
  return this.save();
};

// Method to update the logout time for the most recent session
userSchema.methods.updateLogoutTime = function(sessionId) {
  const session = this.sessions.find(s => s.sessionId === sessionId);
  let logoutTime = moment.tz(new Date(), "Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss');
  if (session) {
    session.logoutTime = logoutTime
    return this.save();
  }
  return Promise.resolve(this);
};

const User = mongoose.models.User || model("User", userSchema);

export default User;
