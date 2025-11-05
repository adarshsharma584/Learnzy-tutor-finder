import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from '../../services/axiosInstance';

export const fetchAllTuitions = createAsyncThunk(
    'tuition/fetchAllTuitions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/tuitions');
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || 'Failed to fetch tuitions');
        }
    }
);

export const fetchSingleTuition = createAsyncThunk(
    'tuition/fetchSingleTuition',
    async (tuitionId, { rejectWithValue }) => { 
        try {
            const response = await axiosInstance.get(`/tuitions/${tuitionId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || 'Failed to fetch tuition details');
        }
    }
);

export const createTuition = createAsyncThunk(
    'tuition/createTuition',
    async (tuitionData, { rejectWithValue }) => {
        try {
            const authToken = localStorage.getItem('token');
            if (!authToken) {
                return rejectWithValue('No authentication token found');
            }   

            const response = await axiosInstance.post('/tuitions', tuitionData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || 'Failed to create tuition');
        }   
    }
);

export const updateTuition = createAsyncThunk(
    'tuition/updateTuition',
    async ({ tuitionId, updatedData }, { rejectWithValue }) => {
        try {
            const authToken = localStorage.getItem('token');
            if (!authToken) {
                return rejectWithValue('No authentication token found');
            }

            const response = await axiosInstance.put(`/tuitions/${tuitionId}`, updatedData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || 'Failed to update tuition');
        }
    }
);

export const deleteTuition = createAsyncThunk(
    'tuition/deleteTuition',
    async (tuitionId, { rejectWithValue }) => {
        try {
            const authToken = localStorage.getItem('token');
            if (!authToken) {
                return rejectWithValue('No authentication token found');
            }

            const response = await axiosInstance.delete(`/tuitions/${tuitionId}`);
            return response.data;
            
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || 'Failed to delete tuition');
        }
    }
);


