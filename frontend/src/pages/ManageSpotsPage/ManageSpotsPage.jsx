import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOwnedSpots } from "../../store/spots";
import ManageSpotCard from "../../components/ManageSpotCard";
import "./ManageSpotsPage.css";

const ManageSpotsPage = () => {
  const dispatch = useDispatch();

  const manageSpots = useSelector((state) => state.spots);
  // console.log(spots)

  useEffect(() => {
    dispatch(fetchOwnedSpots());
  }, []);

  return (
    <div className="card-container">
      <h2>Manage Your Spots</h2>
      {manageSpots.ownedSpots.map((spot) => (
        <ManageSpotCard key={spot.id} spot={spot} />
      ))}
    </div>
  );
};

export default ManageSpotsPage;
