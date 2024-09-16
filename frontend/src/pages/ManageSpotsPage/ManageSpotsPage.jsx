import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOwnedSpots } from "../../store/spots";
import ManageSpotCard from "../../components/ManageSpotCard";
import "./ManageSpotsPage.css";

const ManageSpotsPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  
  const CreateSpotLink = () => {
    const path = "/spots/new";
    navigate(path);
  };

  const manageSpots = Object.values(useSelector((state) => state.spots));
  console.log(manageSpots)

  useEffect(() => {
    dispatch(fetchOwnedSpots()).then(() => setIsLoading(true))
  }, [dispatch]);

  return (
    <>
    {isLoading ? 
    <div className="manage-page">
      <h2 className="manage-heading">Manage Your Spots</h2>
      <div className="manage-card-container">
      {manageSpots.length === 0 ? <button className="create-spot-button" onClick={CreateSpotLink}>Create A New Spot</button> : manageSpots.map((spot) => (
        <ManageSpotCard key={spot.id} spot={spot} />
      ))}
      {/* {manageSpots.map((spot) => (
        <ManageSpotCard key={spot.id} spot={spot} />
      ))} */}
      </div>
    </div>
    : <div>
    Loading...
    </div>
    }
    </>
  );
};

export default ManageSpotsPage;
