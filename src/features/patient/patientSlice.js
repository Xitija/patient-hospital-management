import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const HOST_URL = `https://89b1b335-89c9-4a22-a1cd-a224e501fb1a-00-32ijzmdnyo4vx.janeway.replit.dev`;

export const fetchPatients = createAsyncThunk('patients/fetchPatients', async () => {
    const response = await axios.get(HOST_URL + '/patients');
    return response.data;
})

export const addPatientAsync = createAsyncThunk('patients/addPatientAsync', async (newPatient) => {
    const response = await axios.post(HOST_URL + `/patients`, newPatient)
    return response.data.patient;
})

export const updatePatientAsync = createAsyncThunk(
    'patients/updatePatientAsync', async ({ id, updatedPatient }) => {
        const response = await axios.put(HOST_URL + `/patients/${id}`, updatedPatient);
        return response.data.updatedPatient;
    }
)

export const deletePatientAsync = createAsyncThunk(
    'patients/deletePatientAsync', async (id) => {
        const response = await axios.delete(HOST_URL + `/patients/${id}`);
        return response.data;
    }
)

const initialState = {
    patients: [],
    status: 'idle',
    error: null,
}

export const patientSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatients.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPatients.fulfilled, (state, action) => {
                state.status = 'success';
                state.patients = action.payload
            })
            .addCase(fetchPatients.rejected, (state,action) => {
                state.status = 'error';
                state.error = action.error.message
            })
            .addCase(addPatientAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addPatientAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.patients.push(action.payload);
            })
            .addCase(addPatientAsync.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
            .addCase(updatePatientAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updatePatientAsync.fulfilled, (state, action) => {
                state.status = 'success';
                const updatedPatient = action.payload;
                const index = state.patients.findIndex((s) => s._id === updatedPatient._id)
                if (index !== -1) {
                    state.patients[index] = updatedPatient;
                }
            })
            .addCase(updatePatientAsync.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message
            })
            .addCase(deletePatientAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deletePatientAsync.fulfilled, (state, action) => {
                state.status = 'success';
                console.log(action,"action")
                state.patients = state.patients.filter((patient) => patient._id !== action.payload.deletedPatient._id)
            })
            .addCase(deletePatientAsync.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
    }
})

export default patientSlice.reducer;