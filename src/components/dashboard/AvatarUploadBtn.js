import { Button, Modal, Notification, toaster } from "rsuite";
import { useModalState } from "../../misc/custom-hooks";
import { useState } from "react";
import AvatarEditor from "react-avatar-editor";

const fileInputTypes = ".png, .jpeg, .jpg";
const acceptedFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];
const isValidFile = (file) => acceptedFileTypes.includes(file.type);
function AvatarUploadBtn() {
  const { isOpen, open, close } = useModalState();
  const [image, setImage] = useState(null);
  const onFileInputChange = (ev) => {
    const currentFiles = ev.target.files;

    if (currentFiles.length === 1) {
      const file = currentFiles[0];
      if (isValidFile(file)) {
        setImage(file);
        open();
      } else {
        toaster.push(
          <Notification>{`Wrong file type ${file.type}`}</Notification>,
          {
            duration: 4000,
          }
        );
      }
    }
  };
  return (
    <div className="mt-3 text-center">
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Selet new Avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none cursor-pointer padded"
            accept={fileInputTypes}
            onChange={onFileInputChange}
          />
        </label>
        <Modal open={isOpen} onClose={close}>
          <Modal.Header>
            <Modal.Title>Adjust and upload new avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center h-100">
              {image && (
                <AvatarEditor
                  image={image}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button block appearance="ghost" color="blue">
              Upload new avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AvatarUploadBtn;
