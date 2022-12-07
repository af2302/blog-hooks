import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name : 'auth',
    initialState : { 
        username : null, 
        token : null,
        email : null,
        image : null, 
        bio : null,
        passsword : null,
    },
    reducers : {
        setCredentials : (state, action) => {
            const { username , token, email, image, bio, passsword } = action.payload.user;
            state.username = username;
            state.token = token;
            state.email = email;
            state.image = image;
            state.bio = bio;
            state.passsword = passsword;
        },
        logOut : (state, _) => {
            state.username = null;
            state.token = null;
            state.email = null;
            state.image = null;
            state.bio = null;
        }
    },
})

export const {  setCredentials , logOut } = authSlice.actions;

export default authSlice.reducer;