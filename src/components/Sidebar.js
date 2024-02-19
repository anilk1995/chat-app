import CreateRoomBtnModal from "./CreateRoomBtnModal";
import DashboardToggle from "./dashboard/DashboardToggle";

function Sidebar() {
  return (
    <div className="h-100 pt-2">
      <div>
        <DashboardToggle />
        <CreateRoomBtnModal />
      </div>
      bottom
    </div>
  );
}

export default Sidebar;
