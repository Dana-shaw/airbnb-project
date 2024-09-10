import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchOwnedSpots } from "../../store/spots";
import { deleteSpot } from "../../store/spots";
import "./DeleteSpotModal.css";

function DeleteSpotModal({id}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteSpot(id))
    .then(dispatch(fetchOwnedSpots()))
    closeModal()
  };

  return (
    <>
      <h1>Confirm Delete</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit" onClick={handleSubmit}>Yes (Delete Spot)</button>
        <button type="submit" onClick={closeModal}>No (Keep Spot)</button>
      </form>
    </>
  );
}

export default DeleteSpotModal;