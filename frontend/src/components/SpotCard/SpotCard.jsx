import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./SpotCard.css";

const SpotCard = ({ spot }) => {
  // console.log(spot);
  const navigate = useNavigate();
  
  const spotDetail = () => {
    const path = `/spots/${spot.id}`;
    navigate(path);
  };

  return (
      <div className="spot-card" onClick={spotDetail}>
        <div className="image-container">
          <img className="image" src={spot.previewImage} alt={spot.name} />
        </div>
        {/* <div className="details-container"> */}
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
        {/* </div> */}
      </div>
  );
};

export default SpotCard;
