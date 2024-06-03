import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { deletePatientAsync } from './patientSlice';

const PatientDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const patient = useSelector((state) =>
    state.patients.patients.find((s) => s._id === id)
  );

  if (!patient) {
    return <div>Patient not found</div>;
  }

  const handleDelete = (id) => {
    dispatch(deletePatientAsync(id));
  };

  return (
    <div>
      <h2>Patient Detail</h2>
      <p>Name: {patient.name}</p>
      <p>Gender: {patient.gender}</p>
      <p>Age: {patient.age}</p>
      <p>Ward: {patient.assignedWard}</p>
      <p>Days Admitted: {patient.noOfDaysAdmitted}</p>
      <p>Medical History: {patient.medicalHistory}</p>
      <p>Contact Details</p>
      <p>Phone Number: {patient.contactInformation.phoneNumber}</p>
      <p>Address: {patient.contactInformation.address}</p>
      <Link to={`/patients/edit/${patient._id}`} state={patient}>
        Edit Details
      </Link>
      <button onClick={() => handleDelete(patient._id)}>Delete</button>
    </div>
  );
};

export default PatientDetail;
