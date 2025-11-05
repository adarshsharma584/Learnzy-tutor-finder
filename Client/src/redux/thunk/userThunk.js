import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../services/axiosInstance';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/user/login', formData, {
                withCredentials: true,
            });
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
            const response = await axiosInstance.post('/user/register', formData, {
                withCredentials: true,
            });
            localStorage.setItem('token', response.data.token);
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