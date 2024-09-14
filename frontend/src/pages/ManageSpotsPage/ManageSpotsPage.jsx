import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchOwnedSpots } from "../../store/spots";
import ManageSpotCard from "../../components/ManageSpotCard";
import "./ManageSpotsPage.css";

const ManageSpotsPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)

  const manageSpots = Object.values(useSelector((state) => state.spots));
  console.log(manageSpots)

  useEffect(() => {
    dispatch(fetchOwnedSpots()).then(() => setIsLoading(true))
  }, [dispatch]);

  return (
    <>
    {isLoading ? 
    <div className="card-container">
      <h2>Manage Your Spots</h2>
      {manageSpots.map((spot) => (
        <ManageSpotCard key={spot.id} spot={spot} />
      ))}
    </div>
    : <div>
    Loading...
    </div>
    }
    </>
  );
};

export default ManageSpotsPage;
