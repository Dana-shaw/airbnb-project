import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./ManageSpotCard.css";

const ManageSpotCard = ({ spot }) => {

  console.log(spot);
  return (
    <Link key={spot.id} to={`/spots/${spot.id}`}>
      <div className="spot-card">
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
        <span className="button-container"><button>Update</button><button>Delete</button></span>
      </div>
    </Link>
  );
};

export default ManageSpotCard;
