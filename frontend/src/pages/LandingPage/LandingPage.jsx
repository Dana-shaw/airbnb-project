import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSpots } from '../../store/spots';
import { useEffect } from 'react';
import SpotCard from '../../components/SpotCard';
import './LandingPage.css'

const LandingPage = () => {
    const dispatch = useDispatch();

    const spots = Object.values(useSelector(state => state.spots))
    // console.log(spots)

    useEffect(() => {
        dispatch(fetchAllSpots())
    }, [dispatch])

    return (
        <div className='card-container'>
           {spots.map((spot) => (
                <SpotCard key={spot.id} spot={spot} className="spot-card"/>
           ))}
        </div>
    )
}

export default LandingPage;