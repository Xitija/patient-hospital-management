import { Link } from "react-router-dom";
const WardList = ({wards}) => {
    return (
        <div>
            <h2>Ward List</h2>
            <ul>
                {
                    wards.map((ward) => (
                        <li key={ward._id}>
                            <Link to={`/wards/${ward._id}`}>
                                Ward No.: {ward.wardNo} 
                                Capacity: {ward.capacity}
                                Specialization: {ward.specialization}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default WardList;