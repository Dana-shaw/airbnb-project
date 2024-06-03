import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import { useEffect } from 'react';
import './LandingPage.css'

const LandingPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSpots())
    }, [])

    return (
        <div>
            <h1>Landing Page</h1>
        </div>
    )
}

export default LandingPage;