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

    return (
        <div>
            <h1>Patient View</h1>
            {status === 'loading' && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <PatientList patients={patients} />

            <h3>
                <Link to={`/patients/add`}>Add Patient</Link>
            </h3>
            {error && (
        <div>
          <h2>Server Not Active 😨</h2>
          <h3>
            <a
              href="https://drive.google.com/file/d/1N8tG1VmqCCBUCNQu9sqTpbz-jFMIG-6l/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click here to view video
            </a>
          </h3>
        </div>
      )}
        </div>
    )
}

export default PatientView;