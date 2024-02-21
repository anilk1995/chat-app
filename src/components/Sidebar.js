import { Divider } from "rsuite";
import CreateRoomBtnModal from "./CreateRoomBtnModal";
import DashboardToggle from "./dashboard/DashboardToggle";
import ChatRoomList from "./rooms/ChatRoomList";
import { useEffect, useRef, useState } from "react";

function Sidebar() {
  const topSidebarRef = useRef();
  const [height, setHeight] = useState(null);

  useEffect(
    function () {
      if (topSidebarRef.current) {
        setHeight(topSidebarRef.current.scrollHeight);
      }
    },
    [topSidebarRef]
  );

  return (
    <div className="h-100 pt-2">
      <div ref={topSidebarRef}>
        <DashboardToggle />
        <CreateRoomBtnModal />
        <Divider>Join Conversation</Divider>
      </div>
      <ChatRoomList aboveElHeight={height} />
    </div>
  );
}

export default Sidebar;
