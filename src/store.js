import { configureStore } from "@reduxjs/toolkit";
import { patientSlice } from "./features/patient/patientSlice";
import { wardSlice } from "./features/ward/wardSlice";

export default configureStore({
    reducer: {
        patients: patientSlice.reducer,
        wards: wardSlice.reducer
    }
})