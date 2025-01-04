import { Link } from "react-router-dom";
const PatientList = ({patients}) => {
    return (
        <div>
            <h2>Patient List</h2>
            <ul>
                {
                    patients.map((patient) => (
                        <li key={patient._id}>
                            <Link to={`/patients/${patient._id}`}>
                                <p>{patient.name}</p>
                                Age: {patient.age} - 
                                Gender: {patient.gender}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default PatientList;