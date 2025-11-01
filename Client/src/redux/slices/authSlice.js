import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    token: null,
    isError: false,
    errorMessage: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.isError = false;
            state.errorMessage = '';
        },
        signup: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token; 
            state.isAuthenticated = true;
            state.isLoading = false;
            state.isError = false;
            state.errorMessage = '';
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.isError = false;
            state.errorMessage = '';
        },
        loading: (state) => {
            state.isLoading = true;
        },
        error: (state, action) => {
            state.isError = true;
            state.errorMessage = action.payload;
            state.isLoading = false;
        },
    },
});

export const { login, signup, logout, loading, error } = authSlice.actions;
export default authSlice.reducer;