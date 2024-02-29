import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { auth, database } from "../../../misc/firebase";
import { transformToArrWithId } from "../../../misc/helper";
import MessageItem from "./MessageItem";
import { Notification, toaster } from "rsuite";

function Messages() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);
  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;
  console.log("messages: ", messages);
  useEffect(() => {
    const messagesRef = database.ref("/messages");
    messagesRef
      .orderByChild("roomID")
      .equalTo(chatId)
      .on("value", (snap) => {
        const data = transformToArrWithId(snap.val());
        setMessages(data);
      });

    return () => {
      messagesRef.off("value");
    };
  }, [chatId]);

  const handleAdmin = useCallback(
    async (uid) => {
      const adminsRef = database.ref(`/rooms/${chatId}/admins`);
      let alertMsg;
      await adminsRef.transaction((admins) => {
        if (admins) {
          if (admins[uid]) {
            admins[uid] = null;
            alertMsg = "Admin permission removed";
          } else {
            admins[uid] = true;
            alertMsg = "Admin permission granted";
          }
        }
        return admins;
      });

      toaster.push(
        <Notification type="info" header="Success">
          {alertMsg}
        </Notification>,
        {
          duration: 4000,
        }
      );
    },
    [chatId]
  );

  const handleLike = useCallback(async (msgId) => {
    const { uid } = auth.currentUser;
    const messageRef = database.ref(`/messages/${msgId}`);
    let alertMsg;
    await messageRef.transaction((msg) => {
      if (msg) {
        if (msg.likes && msg.likes[uid]) {
          msg.likeCount -= 1;
          msg.likes[uid] = null;
          alertMsg = "Like removed";
        } else {
          msg.likeCount += 1;

          if (!msg.likes) {
            msg.likes = {};
          }

          msg.likes[uid] = true;
          alertMsg = "Like added";
        }
      }
      return msg;
    });

    toaster.push(
      <Notification type="info" header="Success">
        {alertMsg}
      </Notification>,
      {
        duration: 4000,
      }
    );
  }, []);

  const handleDelete = useCallback(
    async (msgId) => {
      if (!window.confirm("Delete this message")) return;

      const isLast = messages[messages.length - 1].id === msgId;
      const updates = {};

      updates[`/messages/${msgId}`] = null;

      if (isLast && messages.length > 1) {
        updates[`rooms/${chatId}/lastMessage`] = {
          ...messages[messages.length - 2],
          msgId: messages[messages.length - 2].id,
        };
      }
      if (isLast && messages.length === 1) {
        updates[`rooms/${chatId}/lastMessage`] = null;
      }

      try {
        await database.ref().update(updates);
      } catch (error) {}
    },
    [chatId, messages]
  );

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No messages yet... </li>}
      {canShowMessages &&
        messages.map((msg) => (
          <MessageItem
            key={msg.id}
            message={msg}
            handleAdmin={handleAdmin}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        ))}
    </ul>
  );
}

export default Messages;
