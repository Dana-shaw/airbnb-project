import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchOwnedSpots } from '../../store/spots';
import SpotCard from '../../components/SpotCard';
import './ManageSpots.css'

const ManageSpots = () => {
    const dispatch = useDispatch();

    const ownedSpots = useSelector(state => state.spots)
    // console.log(spots)

    useEffect(() => {
        dispatch(fetchOwnedSpots())
    }, [])

    return (
        <div className='card-container'>
            <h2>Manage Your Spots</h2>
           {ownedSpots.ownedSpots.map((spot) => (
                <SpotCard key={spot.id} spot={spot} />
           ))}
        </div>
    )
}

export default ManageSpots