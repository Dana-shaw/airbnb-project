import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./ManageSpotCard.css";
import DeleteModalButton from "../DeleteModalButton"
import DeleteSpotModal from "../DeleteSpotModal/DeleteSpotModal";

const ManageSpotCard = ({ spot }) => {
  // console.log(spot);
  const navigate = useNavigate();

  const spotDetail = () => {
    const path = `/spots/${spot.id}`;
    navigate(path);
  };

  const editSpot = (e) => {
    e.stopPropagation();
    const path = `/spots/${spot.id}/edit`;
    navigate(path);
  };

  return (
    <div className="spot-card" onClick={spotDetail}>
      <div className="image-container">
        <img className="image" src={spot.previewImage} alt={spot.name} />
      </div>
      <div>
        <div className="spot-location">
          <h3>
            {spot.city}, {spot.state}
          </h3>
          <h3>
            <FaStar />
            {spot.avgRating ? spot.avgRating.toPrecision(2) : "New"}
          </h3>
        </div>
        <div className="spot-price">
          <h4>${spot.price}</h4>
          <p>night</p>
        </div>
      </div>
      <span className="button-container">
        <button onClick={editSpot} className="update-button">Update</button>
        <DeleteModalButton
          itemText="Delete"
          modalComponent={<DeleteSpotModal id={spot.id}/>}
        />
      </span>
    </div>
  );
};

export default ManageSpotCard;
