import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";

function PopUpModal({
  closePopUpModal,
  showState,
  redirectToLoginPage,
  bodyText,
  modalTitle,
}) {
  return (
    <>
      <Modal
        show={showState}
        onHide={closePopUpModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodyText}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={redirectToLoginPage}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopUpModal;
