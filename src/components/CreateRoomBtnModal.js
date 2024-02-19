import { Icon } from "@rsuite/icons";
import { Button, Form, Modal, Notification, Schema, toaster } from "rsuite";
import { useModalState } from "../misc/custom-hooks";
import CreativeIcon from "@rsuite/icons/Creative";
import FormGroup from "rsuite/esm/FormGroup";
import FormControlLabel from "rsuite/esm/FormControlLabel";
import FormControl from "rsuite/esm/FormControl";
import { useRef, useState } from "react";
import firebase from "firebase/app";
import { database } from "../misc/firebase";

const INITIAL_FORM = {
  name: "",
  description: "",
};
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired("Chat name is required"),
  description: StringType().isRequired("Description is required"),
});

function CreateRoomBtnModal() {
  const { isOpen, open, close } = useModalState();
  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();
  const onFormChange = (value) => {
    setFormValue(value);
  };

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    } else {
      setIsLoading(true);
      const newRoomData = {
        ...formValue,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      };

      try {
        await database.ref("rooms").push(newRoomData);
        toaster.push(
          <Notification
            type="info"
            header="New chat room"
          >{`${formValue.name} has been created`}</Notification>,
          {
            duration: 4000,
          }
        );
        setIsLoading(false);
        setFormValue(INITIAL_FORM);
        close();
      } catch (error) {
        setIsLoading(false);
        toaster.push(<Notification>{error.message}</Notification>, {
          duration: 4000,
        });
      }
    }
  };

  return (
    <div className="mt-2">
      <Button block color="green" appearance="primary" onClick={open}>
        <CreativeIcon /> Create new chat room
      </Button>
      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
          <Modal.Title>New chat room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <FormControlLabel>Room name</FormControlLabel>
              <FormControl name="name" placeholder="Enter chat room name" />
            </FormGroup>
            <FormControlLabel>Description</FormControlLabel>
            <FormControl
              componentClass="textarea"
              rows={5}
              name="description"
              placeholder="Enter room description"
            />
            <FormGroup></FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Create new chat room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateRoomBtnModal;
