import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addWardAsync, updateWardAsync } from './wardSlice';

const WardForm = () => {
  let { state } = useLocation();

  const ward = state ? state : null;

  const [wardNo, setWardNo] = useState(ward ? ward.wardNo : '');
  const [specialization, setSpecialization] = useState(
    ward ? ward.specialization : ''
  );
  const [capacity, setCapacity] = useState(ward ? ward.capacity : '');

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const newWard = {
      wardNo,
      specialization,
      capacity
    };

    if (ward) {
      dispatch(updateWardAsync({ id: ward._id, updatedWard: newWard }));
    } else {
      dispatch(addWardAsync(newWard));
    }

    setWardNo('');
    setSpecialization('');
    setCapacity('');
  };

  return (
    <div>
      <h2>{ward ? 'Edit Ward' : 'Add Ward'}</h2>
      <input
        type="text"
        placeholder="Ward no"
        value={wardNo}
        onChange={(e) => setWardNo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Specialization"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
      />
      <button onClick={handleSubmit}>{ward ? 'Update' : 'Add'}</button>
    </div>
  );
};

export default WardForm;
