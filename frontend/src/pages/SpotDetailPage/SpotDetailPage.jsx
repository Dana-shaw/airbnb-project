import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSpot } from "../../store/spots";
import SpotDetails from "../../components/SpotDetails";
import "./SpotDetailPage.css";

const SpotDetailPage = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)
  //   console.log(spotId)

  const spot = useSelector((state) => state.spots);
//   console.log('spot', spot.currentSpot[spotId])

  useEffect(() => {
    dispatch(fetchSpot(spotId))
    .then(() => setIsLoaded(true))
  }, []);

  return isLoaded ? (
    <div>
      <SpotDetails spot={spot.currentSpot[spotId]} />
    </div>
  ) : (
    <h3>Loading...</h3>
  );
};

export default SpotDetailPage;
