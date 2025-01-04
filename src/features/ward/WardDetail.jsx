import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { deleteWardAsync } from './wardSlice';

const WardDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ward = useSelector((state) =>
    state.wards.wards.find((w) => w._id === id)
  );

  if (!ward) {
    return <div>Ward not found</div>;
  }

  const handleDelete = (id) => {
    dispatch(deleteWardAsync(id));
  };

  return (
    <div>
      <h2>Ward Detail</h2>
      <p>Ward Number: {ward.wardNo}</p>
      <p>Capacity: {ward.capacity}</p>
      <p>Specialization: {ward.specialization}</p>
      <Link to={`/wards/edit/${ward._id}`} state={ward}>
        Edit Details
      </Link>
      <button onClick={() => handleDelete(ward._id)}>Delete</button>
    </div>
  );
};

export default WardDetail;
