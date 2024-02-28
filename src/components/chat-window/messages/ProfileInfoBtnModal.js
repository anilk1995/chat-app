import { Button, Modal } from "rsuite";
import { useModalState } from "../../../misc/custom-hooks";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ProfileAvatar from "../../ProfileAvatar";

function ProfileInfoBtnModal({ profile, children, ...btnProps }) {
  const { isOpen, open, close } = useModalState();
  const memberSince = new Date(profile.createdAt).toLocaleDateString();

  const shortName = profile.name.split(" ")[0];
  return (
    <>
      <Button {...btnProps} onClick={open}>
        {shortName}
      </Button>

      <Modal open={isOpen} onClose={close}>
        <ModalHeader>
          <ModalTitle>{shortName}</ModalTitle>
        </ModalHeader>
        <ModalBody className="text-center">
          <ProfileAvatar
            src={profile.avatar}
            name={profile.name}
            className="width-200 height-200 img-fullsize font-huge"
          />
          <h4 className="mt-2">{profile.name}</h4>
          <p>Member siince {memberSince}</p>
        </ModalBody>
        <ModalFooter>
          {children}
          <Button block onClick={close}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ProfileInfoBtnModal;
