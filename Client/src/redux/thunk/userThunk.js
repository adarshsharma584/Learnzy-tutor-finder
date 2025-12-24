import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../services/axiosInstance';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/login', formData, {
                withCredentials: true,
            });
            console.log("Login response data: ", response.data);
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || 'Login failed');
        }
    }
);

export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async (formData, { rejectWithValue }) => {
        try {
            const {  ...dataToSend } = formData; // Exclude confirmPassword
            const response = await axiosInstance.post('/auth/register', dataToSend, {
                withCredentials: true,
            });
            // Note: Token might be set via cookies, not in response
            if (response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken);
            }
            console.log("Signup response data: ", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || 'Signup failed');
        }
    }
);
export const fetchUserProfile = createAsyncThunk(
    'auth/fetchUserProfile',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        console.log("Token: ", token);
        if (!token) {
            return rejectWithValue('No authentication token found');
        }
        try {
            const response = await axiosInstance.get('/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            }
            );
            return response.data;

        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || 'Failed to fetch user profile');
        }
    }
);
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        console.log("Token: ", token);
        if (!token) {
            return rejectWithValue('No authentication token found');
        }
        try {
            const response = await axiosInstance.get('/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            localStorage.removeItem('token');
            console.log("Logout response data: ", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || 'Logout failed');
        }
    }
);

export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async (otp, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/verify-Otp', otp, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.log("Error while verifying OTP: ", error);
            return rejectWithValue(error?.response?.data?.message || 'OTP verification failed');
        }
    }
);


