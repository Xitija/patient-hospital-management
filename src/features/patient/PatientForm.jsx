import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addPatientAsync, updatePatientAsync } from './patientSlice';

const PatientForm = () => {
  let { state } = useLocation();

  const patient = state ? state : null;

  const [name, setName] = useState(patient ? patient.name : '');
  const [age, setAge] = useState(patient ? patient.age : '');
  const [gender, setGender] = useState(patient ? patient.gender : '');
  const [medicalHistory, setMedicalHistory] = useState(
    patient ? patient.medicalHistory : ''
  );
  const [noOfDaysAdmitted, setNoOfDaysAdmitted] = useState(
    patient ? patient.noOfDaysAdmitted : ''
  );
  const [assignedWard, setAssignedWard] = useState(
    patient ? patient.assignedWard : ''
  );
  const [address, setAddress] = useState(
    patient ? patient.contactInformation.address : ''
  );
  const [phoneNumber, setPhoneNumber] = useState(
    patient ? patient.contactInformation.phoneNumber : ''
  );

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const newPatient = {
      name,
      age,
      assignedWard,
      medicalHistory,
      gender,
      noOfDaysAdmitted,
      contactInformation: {
        address,
        phoneNumber
      }
    };

    if (patient) {
      dispatch(
        updatePatientAsync({ id: patient._id, updatedPatient: newPatient })
      );
    } else {
      dispatch(addPatientAsync(newPatient));
    }

    setName('');
    setAge('');
    setAssignedWard('')
    setMedicalHistory('');
    setGender('');
    setNoOfDaysAdmitted('');
    setPhoneNumber('');
    setAddress('');
  };

  return (
    <div>
      <h2>{patient ? 'Edit Patient' : 'Add Patient'}</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="Assigned Ward"
        value={assignedWard}
        onChange={(e) => setAssignedWard(e.target.value)}
      />
      <div>
        <label>
          Gender
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={gender === 'Male'}
            onChange={() => setGender('Male')}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={gender === 'Female'}
            onChange={() => setGender('Female')}
          />
          Female
        </label>
        <input
          type="text"
          placeholder="No of days admitted"
          value={noOfDaysAdmitted}
          onChange={(e) => setNoOfDaysAdmitted(e.target.value)}
        />
        <input
          type="text"
          placeholder="Medical History"
          value={medicalHistory}
          onChange={(e) => setMedicalHistory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>{patient ? 'Update' : 'Add'}</button>
    </div>
  );
};

export default PatientForm;
