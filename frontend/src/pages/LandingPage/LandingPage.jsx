import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSpots } from '../../store/spots';
import { useEffect } from 'react';
import SpotCard from '../../components/SpotCard';
import './LandingPage.css'

const LandingPage = () => {
    const dispatch = useDispatch();

    const spots = useSelector(state => state.spots)
    // console.log(spots)

    useEffect(() => {
        dispatch(fetchAllSpots())
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