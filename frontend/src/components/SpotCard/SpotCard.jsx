import { Link } from "react-router-dom";
import { NavLink, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./SpotCard.css";

const SpotCard = ({ spot }) => {
  console.log(spot);
  return (
    <Link key={spot.id} to={`/spots/${spot.id}`}>
      <div className="spot-card">
        <div>
          <img src={spot.previewImage} alt={spot.name} />
        </div>
        <div>
          <div className="spot-location">
            <h3>
              {spot.city}, {spot.state}
            </h3>
            <h3>
              <FaStar />
              {spot.avgRating ? Math.round(spot.avgRating * 100) / 100 : "New"}
            </h3>
          </div>
          <div className="spot-price">
            <h4>${spot.price}</h4>
            <p>night</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SpotCard;
