import AttachmentIcon from "@rsuite/icons/Attachment";
import {
  Button,
  InputGroup,
  Modal,
  Notification,
  Uploader,
  toaster,
} from "rsuite";
import { useModalState } from "../../../misc/custom-hooks";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import { useState } from "react";
import { storage } from "../../../misc/firebase";
import { useParams } from "react-router";

const MAX_FILE_SIZE = 1000 * 1024 * 5;

function AttachmentBtnModal({ afterUpload }) {
  const { chatId } = useParams();
  const { isOpen, open, close } = useModalState();

  const [fileList, setFileList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const onChange = (fileArr) => {
    const fileterd = fileArr
      .filter((el) => el.blobFile.size <= MAX_FILE_SIZE)
      .slice(0, 5);

    setFileList(fileterd);
  };

  const onUpload = async () => {
    try {
      const uploadPromises = fileList.map((f) => {
        return storage
          .ref(`/chat/${chatId}`)
          .child(Date.now() + f.name)
          .put(f.blobFile, {
            cacheControl: `public, max-age=${3600 * 24 * 3}`,
          });
      });

      const uploadSnapshots = await Promise.all(uploadPromises);
      const shapePromises = uploadSnapshots.map(async (snap) => {
        return {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };
      });

      const files = await Promise.all(shapePromises);
      await afterUpload(files);
      setIsLoading(false);
      close();
    } catch (error) {
      setIsLoading(false);
      toaster.push(<Notification type="error">{error.message}t</Notification>, {
        duration: 4000,
      });
    }
  };

  return (
    <div>
      <InputGroup.Button>
        <AttachmentIcon onClick={open} />
      </InputGroup.Button>
      <Modal open={isOpen} onClose={close}>
        <ModalHeader>
          <ModalTitle>Upload files</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Uploader
            className="w-100"
            disabled={isLoading}
            autoUpload={false}
            action=""
            fileList={fileList}
            onChange={onChange}
            multiple
            listType="picture-text"
          >
            <Button>Upload</Button>
          </Uploader>
        </ModalBody>
        <ModalFooter>
          <Button block disabled={isLoading} onClick={onUpload}>
            Send to chat
          </Button>
          <div className="text-right mt-2">
            <small>* only files less than 5 mb are allowed</small>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AttachmentBtnModal;
