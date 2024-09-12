import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import {deleteReview} from "../../store/reviews"


function DeleteReviewModal({ id }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteReview(id));
    closeModal();
  };

  return (
    <>
      <h1>Confirm Delete</h1>
      <form onSubmit={handleSubmit}>
        <p>Are you sure you want to delete this review?</p>
        <div>
          <button type="submit" onClick={handleSubmit}>
            Yes (Delete Review)
          </button>
          <button type="submit" onClick={closeModal}>
            No (Keep Review)
          </button>
        </div>
      </form>
    </>
  );
}

export default DeleteReviewModal;
