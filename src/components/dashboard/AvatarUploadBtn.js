import { Button, Modal, Notification, toaster } from "rsuite";
import { useModalState } from "../../misc/custom-hooks";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { database, storage } from "../../misc/firebase";
import { useProfile } from "../../context/profile.context";
import ProfileAvatar from "../ProfileAvatar";

const fileInputTypes = ".png, .jpeg, .jpg";
const acceptedFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];

const isValidFile = (file) => acceptedFileTypes.includes(file.type);
const getBlob = (canvas) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("File process error"));
      }
    });
  });
};

function AvatarUploadBtn() {
  const { isOpen, open, close } = useModalState();
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const avatarEditorRef = useRef();
  const { profile } = useProfile();

  const onFileInputChange = (ev) => {
    const currentFiles = ev.target.files;

    if (currentFiles.length === 1) {
      const file = currentFiles[0];
      if (isValidFile(file)) {
        setImage(file);
        open();
      } else {
        toaster.push(
          <Notification type="error">{`Wrong file type ${file.type}`}</Notification>,
          {
            duration: 4000,
          }
        );
      }
    }
  };

  const onUploadClick = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();
    setIsLoading(true);
    try {
      const blob = await getBlob(canvas);
      const avatarFileRef = storage
        .ref(`/profile/${profile.uid}`)
        .child("avatar");

      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });
      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();
      const userAvatarRef = database
        .ref(`/profiles/${profile.uid}`)
        .child("avatar");
      userAvatarRef.set(downloadUrl);
      toaster.push(
        <Notification type="success" header="Operation successful">
          Avatar has been uploaded
        </Notification>,
        {
          duration: 4000,
        }
      );
      setIsLoading(false);
    } catch (error) {
      toaster.push(
        <Notification type="error" header="Operation Failed">
          {error.message}
        </Notification>,
        {
          duration: 4000,
        }
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        src={profile.avatar}
        name={profile.name}
        className="width-200 height-200 img-fullsize font-huge"
      />
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
                  ref={avatarEditorRef}
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
            <Button
              block
              appearance="ghost"
              color="blue"
              onClick={onUploadClick}
              disabled={isLoading}
            >
              Upload new avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AvatarUploadBtn;
