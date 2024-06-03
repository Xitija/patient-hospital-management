import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WardList from "../features/ward/WardList";
import { fetchWards } from "../features/ward/wardSlice";

const WardView = () => {
    const dispatch = useDispatch();
    const wards = useSelector((state) => state.wards.wards)
    const status = useSelector((state) => state.wards.status)
    const error = useSelector((state) => state.wards.error)

    useEffect(() => {
        if(status === 'idle') {
            dispatch(fetchWards())
        }
    }, [status,dispatch])

    console.log(wards)

    return (
        <div>
            <h1>Ward View</h1>
            {status === 'loading' && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <WardList wards={wards} />

            <h3>
                <Link to={`/wards/add`}>Add Ward</Link>
            </h3>
        </div>
    )
}

export default WardView;