import { useModal } from '../../context/Modal';
import './DeleteModalButton.css'

function DeleteModalButton({
  modalComponent, // component to render inside the modal
  itemText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = (e) => {
    e.stopPropagation()
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button onClick={onClick} className='delete-button'>{itemText}</button>;
}

export default DeleteModalButton;