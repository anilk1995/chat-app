import { Modal } from "rsuite";
import { useModalState } from "../../../misc/custom-hooks";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalBody from "rsuite/esm/Modal/ModalBody";

function ImgBtnModal({ src, fileName }) {
  const { isOpen, open, close } = useModalState();
  return (
    <>
      <input
        type="image"
        alt="file"
        src={src}
        onClick={open}
        className="mw-100 mh-100 w-auto"
      />
      <Modal open={isOpen} onClose={close}>
        <ModalHeader>
          <ModalTitle>{fileName}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <img src={src} height="100%" width="100%" alt="file" />{" "}
        </ModalBody>
        <ModalFooter>
          <a href={src} target="_blank" rel="noopener noreferrer">
            View original
          </a>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ImgBtnModal;
