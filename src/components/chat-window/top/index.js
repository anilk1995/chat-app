import { memo } from "react";
import { useCurrentRoom } from "../../../context/currentRoomContext";
import ArowBackIcon from "@rsuite/icons/ArowBack";
import { Link } from "react-router-dom";
import { useMediaQuery } from "../../../misc/custom-hooks";
import { ButtonToolbar } from "rsuite";
import RoomInfoBtnModal from "./RoomInfoBtnModal";
import EditRoomBtnDrawer from "./EditRoomBtnDrawer";

function Top() {
  const name = useCurrentRoom((value) => value.name);
  const isMobile = useMediaQuery("(max-width: 992px)");
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear d-flex align-items-center">
          <Link
            to="/"
            className={
              isMobile
                ? "d-inline-block p-0 mr-2 text-blue link-unstyled"
                : "d-none"
            }
          >
            <ArowBackIcon />
          </Link>
          <span className="text-disappear">{name}</span>
        </h4>
        <ButtonToolbar className="ws-nowrap">
          <EditRoomBtnDrawer />
        </ButtonToolbar>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <span>todos</span>
        <RoomInfoBtnModal />
      </div>
    </div>
  );
}

export default memo(Top);
