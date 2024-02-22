import { useParams } from "react-router";
import ChatBottom from "../../components/chat-window/bottom";
import Messages from "../../components/chat-window/messages";
import ChatTop from "../../components/chat-window/top";
import { useRooms } from "../../context/roomsContext";
import { Loader } from "rsuite";
import { CurrentRoomProvider } from "../../context/currentRoomContext";
function Chat() {
  const { chatId } = useParams();
  const rooms = useRooms();

  if (!rooms)
    return <Loader vertical center size="md" content="Loading" speed="slow" />;

  const currentRoom = rooms.find((room) => room.id === chatId);
  const { name, description } = currentRoom;
  const currentRoomData = {
    name,
    description,
  };

  if (!currentRoom) {
    return <h6 className="text-center mt-page">Chat {chatId} not found</h6>;
  }
  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className="chat-top">
        <ChatTop />
      </div>
      <div className="chat-middle">
        <Messages />
      </div>
      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </CurrentRoomProvider>
  );
}

export default Chat;
