import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalNumberOfPatients: 0,
    patientsPerWard: null,
    currentOccupancyRate: 0,
    averageLengthOfStay: 0,
    topPerformingWard: null
}

export const hospitalSlice = createSlice({
    name: "hospital",
    initialState,
    reducers: {
        updateHospitalStats: (state, action) => {
            const { totalNumberOfPatients, patientsPerWard, currentOccupancyRate, averageLengthOfStay } = action.payload;
            state.totalNumberOfPatients = totalNumberOfPatients;
            state.patientsPerWard = patientsPerWard;
            state.currentOccupancyRate = currentOccupancyRate;
            state.averageLengthOfStay = averageLengthOfStay;
        },
        setTopPerformingWard: (state, action) => {
            state.topPerformingWard = action.payload
        }
    }
})

export const { updateHospitalStats, setTopPerformingWard } = hospitalSlice.actions;

export default hospitalSlice.reducer;