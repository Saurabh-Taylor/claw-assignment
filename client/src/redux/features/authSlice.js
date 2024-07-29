import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: localStorage.getItem("username") || '',
    sessionId: localStorage.getItem("sessionId") || null,
    sessions: JSON.parse(localStorage.getItem("sessions")) || []
};

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { user, sessionId, token } = action.payload;
            state.username = user.username;
            state.sessions = user.sessions;
            state.sessionId = sessionId;
            localStorage.setItem("username", user.username);
            localStorage.setItem("sessionId", sessionId);
            localStorage.setItem("sessions", JSON.stringify(user.sessions));
            localStorage.setItem("token", token);
        },
        removeUser: (state) => {
            state.username = '';
            state.sessionId = null;
            state.sessions = [];
            localStorage.removeItem("username");
            localStorage.removeItem("sessionId");
            localStorage.removeItem("sessions");
            localStorage.removeItem("token");
        }
    }
});

export const { addUser, removeUser } = authReducer.actions;

export default authReducer.reducer;
