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

  const spot = useSelector((state) => state.spots.currentSpot);
  console.log('spot', spot)

  useEffect(() => {
    dispatch(fetchSpot(spotId))
    .then(() => setIsLoaded(true))
  }, []);

  return isLoaded ? (
    <div>
      {console.log(spot.SpotImages)}
      <SpotDetails  Owner={spot.Owner} SpotImages={spot.SpotImages} avgStarRating={spot.avgStarRating} city={spot.city} country={spot.country} description={spot.description} name={spot.name} numReviews={spot.numReviews} price={spot.price} state={spot.state}  />
    </div>
  ) : (
    <h3>Loading...</h3>
  );
};

export default SpotDetailPage;
