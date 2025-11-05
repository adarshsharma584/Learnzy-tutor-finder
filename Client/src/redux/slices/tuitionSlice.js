import { createSlice } from "@reduxjs/toolkit";
import { fetchAllTuitions, fetchSingleTuition, createTuition, updateTuition, deleteTuition } from "../thunk/tuitionThunk";

const initialState = {
    tuitions: [],
    selectedTuition: null,
    isLoading: false,
    isError: false,
    errorMessage: '',
}

const tuitionSlice = createSlice({
    name: 'tuition',
    initialState,
    reducers:{},
    
    extraReducers: (builder) => {
        //fetch all tuitions
        builder.addCase(fetchAllTuitions.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = '';
        });
        builder.addCase(fetchAllTuitions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tuitions = action.payload;
        });
        builder.addCase(fetchAllTuitions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        });

//fetch single tuition
        builder.addCase(fetchSingleTuition.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = '';
        });
        builder.addCase(fetchSingleTuition.fulfilled, (state, action) => {
            state.isLoading = false;
            state.selectedTuition = action.payload;
        });
        builder.addCase(fetchSingleTuition.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        });

//create tuition
        builder.addCase(createTuition.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = '';
        });
        builder.addCase(createTuition.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tuitions.push(action.payload);
        });
        builder.addCase(createTuition.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        }); 

//update tuition
        builder.addCase(updateTuition.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = '';
        });
        builder.addCase(updateTuition.fulfilled, (state, action) => {
            state.isLoading = false;
            const index = state.tuitions.findIndex(tuition => tuition._id === action.payload._id);
            if (index !== -1) {
                state.tuitions[index] = action.payload;
            }   
        });
        builder.addCase(updateTuition.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        });

//delete tuition
        builder.addCase(deleteTuition.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = '';
        });
        builder.addCase(deleteTuition.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tuitions = state.tuitions.filter(tuition => tuition._id !== action.payload);
        });
        builder.addCase(deleteTuition.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        });
    }
});

export default tuitionSlice.reducer;