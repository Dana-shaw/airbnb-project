import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteReview } from "../../store/reviews";
import "./DeleteReviewModal.css"

function DeleteReviewModal({ id }) {
  const dispatch = useDispatch();
  // const navigate = useNavigate()
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteReview(id));
    closeModal();
  };

  return (
    <div className="delete-review-modal">
      <h1>Confirm Delete</h1>
      <p className="confirmation-text">Are you sure you want to delete this review?</p>
      <form onSubmit={handleSubmit} className="delete-review-form">
          <button type="submit" onClick={handleSubmit} className="delete-review">
            Yes (Delete Review)
          </button>
          <button type="submit" onClick={closeModal} className="keep-review">
            No (Keep Review)
          </button>
      </form>
    </div>
  );
}

export default DeleteReviewModal;
