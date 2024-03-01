import { ReactMic } from "react-mic";
import { InputGroup, Notification, toaster } from "rsuite";
import PlayOutlineIcon from "@rsuite/icons/PlayOutline";
import { useCallback, useState } from "react";
import { storage } from "../../../misc/firebase";
import { useParams } from "react-router";

function AudioMsgBtn({ afterUpload }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { chatId } = useParams();

  const onClick = useCallback(() => {
    setIsRecording((p) => !p);
  }, []);

  const onUpload = useCallback(
    async (data) => {
      setIsUploading(true);
      try {
        const snap = await storage
          .ref(`/chat/${chatId}`)
          .child(`audio_${Date.now()}.mp3`)
          .put(data.blob, {
            cacheControl: `public, max-age=${3600 * 24 * 3}`,
          });

        const file = {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };

        afterUpload([file]);
        setIsUploading(true);
      } catch (error) {
        setIsUploading(false);
        toaster.push(
          <Notification type="error">{error.message}t</Notification>,
          {
            duration: 4000,
          }
        );
      }
    },
    [afterUpload, chatId]
  );

  return (
    <InputGroup.Button
      onClick={onClick}
      disabled={isUploading}
      className={isRecording ? "animate-blink" : ""}
    >
      <PlayOutlineIcon />
      <ReactMic
        record={isRecording}
        className="d-none"
        onStop={onUpload}
        mimeType="audio/mp3"
      />
    </InputGroup.Button>
  );
}

export default AudioMsgBtn;
