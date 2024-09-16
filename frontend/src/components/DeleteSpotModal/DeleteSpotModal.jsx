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
    <div className="delete-modal">
      <h1>Confirm Delete</h1>
      <p className="confirmation-text">Are you sure you want to remove this spot from the listings?</p>
      <form onSubmit={handleSubmit} className="delete-form">
        <button type="submit" onClick={handleSubmit} className="delete-spot">Yes (Delete Spot)</button>
        <button type="submit" onClick={closeModal} className="keep-spot">No (Keep Spot)</button>
      </form>
    </div>
  );
}

export default DeleteSpotModal;