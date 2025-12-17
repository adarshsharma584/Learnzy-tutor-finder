import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../services/axiosInstance';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/user/login', formData, {
                withCredentials: true,
            });
            console.log("Login response data: ", response.data);
            localStorage.setItem('token', response.data.token);
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
            const { confirmPassword, ...dataToSend } = formData; // Exclude confirmPassword
            const response = await axiosInstance.post('/user/register', dataToSend, {
                withCredentials: true,
            });
            // Note: Token might be set via cookies, not in response
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
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
        if (!token) {
            return rejectWithValue('No authentication token found');
        }
        try {
            await axiosInstance.post('/user/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            localStorage.removeItem('token');
            return;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || 'Logout failed');
        }
    }
);

export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async (otpData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/user/verify', otpData, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.log("Error while verifying OTP: ", error);
            return rejectWithValue(error?.response?.data?.message || 'OTP verification failed');
        }
    }
);


