import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSpotDetail } from "../../store/spots";
import SpotDetails from "../../components/SpotDetails";
import "./SpotDetailPage.css";

const SpotDetailPage = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)
  //   console.log(spotId)

  const spot = useSelector((state) => state.spots[spotId]);
  console.log(spot)

  useEffect(() => {
    dispatch(fetchSpotDetail(spotId))
    .then(() => setIsLoaded(true))
  }, [dispatch, spotId]);

  return isLoaded ? (
    <div>
      <SpotDetails  Owner={spot.Owner} ownerId={spot.ownerId} SpotImages={spot.SpotImages} avgStarRating={spot.avgStarRating} city={spot.city} country={spot.country} description={spot.description} name={spot.name} numReviews={spot.numReviews} price={spot.price} state={spot.state}  />
    </div>
  ) : (
    <h3>Loading...</h3>
  );
};

export default SpotDetailPage;
