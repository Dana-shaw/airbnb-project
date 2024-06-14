import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { FaStar } from "react-icons/fa";
import "./DeleteSpotModal.css";

function DeleteSpotModal() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors({});

    const payload = {

    };
    
    
  };

  return (
    <>
      <h1>Confirm Delete</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">Yes (Delete Spot)</button>
        <button type="submit">No (Keep Spot)</button>
      </form>
    </>
  );
}

export default DeleteSpotModal;