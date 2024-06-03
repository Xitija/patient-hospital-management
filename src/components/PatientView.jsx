import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PatientList from "../features/patient/PatientList";
import { fetchPatients } from "../features/patient/patientSlice";

const PatientView = () => {
    const dispatch = useDispatch();
    const patients = useSelector((state) => state.patients.patients)
    const status = useSelector((state) => state.patients.status)
    const error = useSelector((state) => state.patients.error)

    useEffect(() => {
        if(status === 'idle') {
            dispatch(fetchPatients())
        }
    }, [status,dispatch])

    console.log(patients)

    return (
        <div>
            <h1>Patient View</h1>
            {status === 'loading' && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <PatientList patients={patients} />

            <h3>
                <Link to={`/patients/add`}>Add Patient</Link>
            </h3>
        </div>
    )
}

export default PatientView;