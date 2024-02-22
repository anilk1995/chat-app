import { Input, InputGroup, Notification, toaster } from "rsuite";
import SendIcon from "@rsuite/icons/Send";
import { useCallback, useState } from "react";
import firebase from "firebase/app";
import { useProfile } from "../../../context/profile.context";
import { useParams } from "react-router";
import { database } from "../../../misc/firebase";

function assembleMessage(profile, chatId) {
  return {
    roomID: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {}),
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  };
}

function Bottom() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useProfile();
  const { chatId } = useParams();

  const onInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  const onSendClick = async () => {
    if (input.trim() === "") return;
    const msgData = assembleMessage(profile, chatId);
    msgData.text = input;

    const updates = {};

    const messageId = database.ref("messages").push().key;
    updates[`/messages/${messageId}`] = msgData;
    updates[`rooms/${chatId}/lastMessage`] = {
      ...msgData,
      masgId: messageId,
    };

    setIsLoading(true);
    try {
      await database.ref().update(updates);
      setInput("");
      setIsLoading(false);
    } catch (error) {
      toaster.push(<Notification>{error.message}</Notification>, {
        duration: 4000,
      });
      setIsLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if ((e.keyCode = 13)) {
      e.preventDefault();
      onSendClick();
    }
  };

  return (
    <div>
      <InputGroup>
        <Input
          placeholder="Write a new message here..."
          value={input}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        />
        <InputGroup.Button
          appearance="primary"
          color="blue"
          onClick={onSendClick}
          disabled={isLoading}
        >
          <SendIcon />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
}

export default Bottom;
