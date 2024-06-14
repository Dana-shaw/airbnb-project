import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { FaStar } from "react-icons/fa";
import "./ReviewFormModal.css";

function ReviewFormModal() {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const starsArr = [1, 2, 3, 4, 5];

  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors({});

    const payload = {
      review,
      rating,
    };
    
    
  };

  return (
    <>
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            value={review}
            placeholder="Leave your review here..."
            onChange={(e) => setReview(e.target.value)}
            minLength={10}
            required
          ></textarea>
        </div>
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
                <span className="star">
                  <FaStar />
                </span>
              </button>
            );
          })}
          <span>Stars</span>
        </div>
        <button type="submit">Submit Your Review</button>
      </form>
    </>
  );
}

export default ReviewFormModal;
