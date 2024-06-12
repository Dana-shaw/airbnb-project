import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./StarRating.css";

const StarRating = () => {
  const starsArr = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      {starsArr.map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star"><FaStar /></span>
          </button>
        );
      })}
      <span>Stars</span>
    </div>
  );
};

export default StarRating;
