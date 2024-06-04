import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import { useEffect } from 'react';
import SpotCard from '../SpotCard';
import './LandingPage.css'

const LandingPage = () => {
    const dispatch = useDispatch();

    const spots = useSelector(state => state.spots)
    // console.log(spots)

    useEffect(() => {
        dispatch(fetchSpots())
    }, [])

    return (
        <div className='card-container'>
           {Object.values(spots.spotsList).map((spot) => (
                <SpotCard key={spot.id} spot={spot} />
           ))}
        </div>
    )
}

export default LandingPage;