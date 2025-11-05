import { createSlice } from '@reduxjs/toolkit';
import { loginUser, signupUser, fetchUserProfile, logoutUser } from '../thunk/userThunk.js';
const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    token:localStorage.getItem('token') || null,
    isError: false,
    errorMessage: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        //sigup user
        builder.addCase(signupUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = '';
        });
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        });
        builder.addCase(signupUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        });

        //login user
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = '';
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        });

        //fetch user profile
        builder.addCase(fetchUserProfile.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = '';
        });
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        });
        builder.addCase(fetchUserProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        }); 

        //logout user
        builder.addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = '';
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        });
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        });
    }
    
});


export default authSlice.reducer;