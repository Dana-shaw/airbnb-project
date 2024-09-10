import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOwnedSpots } from "../../store/spots";
import ManageSpotCard from "../../components/ManageSpotCard";
import "./ManageSpotsPage.css";

const ManageSpotsPage = () => {
  const dispatch = useDispatch();

  const manageSpots = Object.values(useSelector((state) => state.spots));
  console.log(manageSpots)

  useEffect(() => {
    dispatch(fetchOwnedSpots());
  }, []);

  return (
    <div className="card-container">
      <h2>Manage Your Spots</h2>
      {manageSpots.map((spot) => (
        <ManageSpotCard key={spot.id} spot={spot} />
      ))}
    </div>
  );
};

export default ManageSpotsPage;
