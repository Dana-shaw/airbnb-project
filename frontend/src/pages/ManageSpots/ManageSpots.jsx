import { useDispatch } from 'react-redux';
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
           {Object.values(spots.spotsList).map((spot) => (
                <SpotCard key={spot.id} spot={spot} />
           ))}
        </div>
    )
}

export default ManageSpots