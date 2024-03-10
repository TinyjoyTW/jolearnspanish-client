import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Popup({ closePopup, isShown, onClose, bodyText, modalTitle }) {
  const onHide = () => {
    closePopup();
    onClose();
  };

  return (
    <>
      <Modal show={isShown} onHide={onHide}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodyText}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Popup;
