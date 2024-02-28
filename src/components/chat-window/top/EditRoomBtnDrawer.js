import { memo } from "react";
import { Button, Drawer, Input, Notification, toaster } from "rsuite";
import { useModalState } from "../../../misc/custom-hooks";
import EditableInput from "../../EditableInput";
import { useCurrentRoom } from "../../../context/currentRoomContext";
import { database } from "../../../misc/firebase";
import { useParams } from "react-router";
import { useMediaQuery } from "rsuite/esm/useMediaQuery/useMediaQuery";

function EditRoomBtnDrawer() {
  const { isOpen, open, close } = useModalState();
  const { chatId } = useParams();

  const name = useCurrentRoom((v) => v.name);
  const description = useCurrentRoom((v) => v.description);
  const isMobile = useMediaQuery("(max-width: 992px)");

  const updateData = (key, value) => {
    database
      .ref(`rooms/${chatId}`)
      .child(key)
      .set(value)
      .then(() => {
        toaster.push(
          <Notification type="success" header="success">
            Updated
          </Notification>,
          {
            duration: 4000,
          }
        );
      })
      .catch((error) => {
        toaster.push(
          <Notification type="error" header="Operation Failed">
            {error.message}
          </Notification>,
          {
            duration: 4000,
          }
        );
      });
  };

  const onNameSave = (newName) => {
    updateData("name", newName);
  };
  const onDescriptionSave = (newDesc) => {
    updateData("description", newDesc);
  };

  return (
    <div>
      <Button className="br-circle" size="sm" color="red" onClick={open}>
        A
      </Button>
      <Drawer open={isOpen} onClose={close} placement="right">
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <EditableInput
            initialValue={name}
            onSave={onNameSave}
            label={<h6 className="mb-2">Name</h6>}
            emptyMessage="Name can not be empty"
          />
          <EditableInput
            as="textarea"
            rows={5}
            initialValue={description}
            onSave={onDescriptionSave}
            emptyMessage="Description can not be empty"
            wrapperClassName="mt-3"
          />
        </Drawer.Body>
        <Button block onClick={close}>
          Close
        </Button>
      </Drawer>
    </div>
  );
}

export default memo(EditRoomBtnDrawer);
