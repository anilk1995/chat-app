import { Loader, Nav } from "rsuite";
import RoomItem from "./RoomItem";
import { useRooms } from "../../context/roomsContext";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ChatRoomList({ aboveElHeight }) {
  const rooms = useRooms();
  const location = useLocation();
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{ height: `calc(100% - ${aboveElHeight}px)` }}
      activeKey={location.pathname}
    >
      {!rooms && (
        <Loader center vertical size="md" content="Loading" speed="slow" />
      )}
      {rooms &&
        rooms.length > 0 &&
        rooms.map((room) => (
          <Nav.Item
            eventKey={`/chat/${room.id}`}
            key={room.id}
            as={Link}
            to={`/chat/${room.id}`}
          >
            <RoomItem room={room} />
          </Nav.Item>
        ))}
    </Nav>
  );
}

export default ChatRoomList;
