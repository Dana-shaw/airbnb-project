import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import StarRating from "../StarRating";
import "./ReviewFormModal.css";

function ReviewFormModal() {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(null);
  // const [hover, setHover] = useState(null);
  // const [totalStars, setTotalStars] = useState(5);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // [...Array(totalStars)].map((star, index) => {
  //   const currentRating = index + 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch()
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
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
        <div>
          <StarRating />
        </div>
        <button type="submit">Submit Your Review</button>
      </form>
    </>
  );
}

export default ReviewFormModal;
