import { Button, Drawer, Modal } from "rsuite";
import { useCurrentRoom } from "../../../context/currentRoomContext";
import { useModalState } from "../../../misc/custom-hooks";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { memo } from "react";

function RoomInfoBtnModal() {
  const { isOpen, close, open } = useModalState();
  const description = useCurrentRoom((v) => v.description);
  const name = useCurrentRoom((v) => v.name);
  return (
    <div>
      <Button appearance="link" className="px-0" onClick={open}>
        Room Information
      </Button>
      <Modal open={isOpen} onClose={close}>
        <ModalHeader>
          <ModalTitle>About {name}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <h6 className="mb-1">Description</h6>
          <p>{description}</p>
        </ModalBody>
        <ModalFooter>
          <Button block onClick={close}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default memo(RoomInfoBtnModal);
