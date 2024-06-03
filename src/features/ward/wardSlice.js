import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const HOST_URL = `https://89b1b335-89c9-4a22-a1cd-a224e501fb1a-00-32ijzmdnyo4vx.janeway.replit.dev`;

export const fetchWards = createAsyncThunk('wards/fetchWards', async () => {
    const response = await axios.get(HOST_URL + '/wards');
    return response.data;
})

export const addWardAsync = createAsyncThunk('wards/addWardAsync', async (newWard) => {
    const response = await axios.post(HOST_URL + `/wards`, newWard)
    return response.data.newWard;
})

export const updateWardAsync = createAsyncThunk(
    'wards/updateWardAsync', async ({ id, updatedWard }) => {
        const response = await axios.put(HOST_URL + `/wards/${id}`, updatedWard);
        return response.data.updatedWard;
    }
)

export const deleteWardAsync = createAsyncThunk(
    'wards/deleteWardAsync', async (id) => {
        const response = await axios.delete(HOST_URL + `/wards/${id}`);
        return response.data;
    }
)

const initialState = {
    wards: [],
    status: 'idle',
    error: null,
}

export const wardSlice = createSlice({
    name: 'wards',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWards.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchWards.fulfilled, (state, action) => {
                state.status = 'success';
                state.wards = action.payload
            })
            .addCase(fetchWards.rejected, (state,action) => {
                state.status = 'error';
                state.error = action.error.message
            })
            .addCase(addWardAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addWardAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.wards.push(action.payload);
            })
            .addCase(addWardAsync.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
            .addCase(updateWardAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateWardAsync.fulfilled, (state, action) => {
                state.status = 'success';
                const updatedWard = action.payload;
                console.log(updatedWard,"uwd")
                const index = state.wards.findIndex((w) => w._id === updatedWard._id)
                if (index !== -1) {
                    state.wards[index] = updatedWard;
                }
            })
            .addCase(updateWardAsync.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message
            })
            .addCase(deleteWardAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteWardAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.wards = state.wards.filter((ward) => ward._id !== action.payload.deletedWard._id)
            })
            .addCase(deleteWardAsync.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
    }
})

export default wardSlice.reducer;