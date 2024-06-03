import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateHospitalStats,
  setTopPerformingWard
} from '../features/hospital/hospitalSlice';

const HospitalView = () => {
  const hospitalStats = useSelector((state) => state.hospital);
  const patients = useSelector((state) => state.patients.patients);
  const wards = useSelector((state) => state.wards.wards);

  const dispatch = useDispatch();

  useEffect(() => {
    const totalNumberOfPatients = patients.length;
    const totalCapacity = wards.reduce(
      (totalCapacity, { capacity }) => totalCapacity + capacity,
      0
    );
    const currentOccupancyRate = totalNumberOfPatients / totalCapacity;

    const totalLengthOfStay = patients.reduce(
      (totalStay, { noOfDaysAdmitted }) => totalStay + noOfDaysAdmitted,
      0
    );

    const averageLengthOfStay = totalLengthOfStay / totalNumberOfPatients;

    const patientsPerWard = patients.reduce((wardCount, { assignedWard }) => {
      wardCount[`${assignedWard}`]
        ? (wardCount[`${assignedWard}`] += 1)
        : (wardCount[`${assignedWard}`] = 1);
      return wardCount;
    }, {});

    const lengthOfStayPerWard = patients.reduce(
      (wardCount, { assignedWard, noOfDaysAdmitted }) => {
        wardCount[`${assignedWard}`]
          ? (wardCount[`${assignedWard}`] += noOfDaysAdmitted)
          : (wardCount[`${assignedWard}`] = noOfDaysAdmitted);
        return wardCount;
      },
      {}
    );

    // console.log(lengthOfStayPerWard, 'lengthOfStayPerWard');

    const topPerformingWard = (wardList) =>
      Object.keys(wardList).reduce((prev, current) => {
        const acc = wardList[current] > wardList[prev] ? current : prev;
        return acc;
      });

    dispatch(
      updateHospitalStats({
        totalNumberOfPatients,
        patientsPerWard,
        currentOccupancyRate,
        averageLengthOfStay
      })
    );

    dispatch(
      setTopPerformingWard({
        byHighestPatients: topPerformingWard(patientsPerWard),
        byLengthOfStay: topPerformingWard(lengthOfStayPerWard)
      })
    );
  }, [wards, patients, dispatch]);

  return (
    <div>
      <h1>Hospital View</h1>
      <h3>Total No of Patients: {hospitalStats.totalNumberOfPatients}</h3>
      <h3>
        Current Occupancy Rate:{' '}
        {Math.floor(hospitalStats.currentOccupancyRate * 100)}%
      </h3>
      <h3>Average Length Of Stay: {hospitalStats.averageLengthOfStay}</h3>
      <h3>Top Performing Ward</h3>
      <p>
        Based on Highest Number of Patients is Ward{' '}
        {hospitalStats.topPerformingWard.byHighestPatients}
      </p>
      <p>
        Based on Maximum Length of Stay is Ward{' '}
        {hospitalStats.topPerformingWard.byLengthOfStay}
      </p>
      <h3>Ward Wise Patients</h3>
      Ward Number - Patients Per Ward
      {hospitalStats.patientsPerWard &&
        Object.keys(hospitalStats.patientsPerWard).map((ward) => (
          <li>
            {ward} - {hospitalStats.patientsPerWard[ward]}
          </li>
        ))}
    </div>
  );
};

export default HospitalView;
