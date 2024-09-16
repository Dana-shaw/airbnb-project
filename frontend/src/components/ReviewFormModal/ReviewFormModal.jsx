import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { FaStar } from "react-icons/fa";
import "./ReviewFormModal.css";

function ReviewFormModal({ spotId }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const starsArr = [1, 2, 3, 4, 5];

  console.log(review.length);
  const spotReviews = Object.values(useSelector((state) => state.reviews));
  const sessionUser = useSelector((state) => state.session.user);
  // const userReviews = useSelector((state) => state.reviews.userReviews);
  // console.log(spotReviews.Reviews)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      review,
      stars,
    };

    console.log(payload);

    const newReview = await dispatch(
      reviewActions.createReview(spotId, payload)
    )
      .then(closeModal())
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
    console.log(newReview);
  };

  useEffect(() => {
    const errors = {};

    const reviewExists = spotReviews.find(
      (review) => review.userId === sessionUser.id
    );

    if (review.length < 10) {
      errors.review = "Must be at least 10 characters";
    }

    if (reviewExists) {
      errors.review = "Review already exists for this spot";
    }

    if (!stars) {
      errors.stars = "Must select star rating";
    }

    setErrors(errors);
  }, [review, stars, sessionUser.id, spotReviews]);

  return (
    <div className="review-modal">
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="review-text-container">
          <textarea
            value={review}
            placeholder="Leave your review here..."
            onChange={(e) => setReview(e.target.value)}
            minLength={10}
            className="text-area"
            required
          ></textarea>
        </div>
        <div className="star-rating">
          {starsArr.map((rating, index) => {
            const currentRating = index + 1;

            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onChange={() => setStars(currentRating)}
                />
                <span
                  className="star"
                  style={{
                    color:
                      currentRating <= (hover || stars) ? "#000000" : "#e4e5e9",
                  }}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                >
                  <FaStar />
                </span>
              </label>
            );
          })}
          <span>Stars</span>
        </div>
        <button disabled={Object.values(errors).length} type="submit" className="review-submit-button">
          Submit Your Review
        </button>
      </form>
    </div>
  );
}

export default ReviewFormModal;
