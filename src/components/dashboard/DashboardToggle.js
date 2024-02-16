import { Button, Drawer } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import { Icon } from "@rsuite/icons";
import { useModalState } from "../../misc/custom-hooks";
import Dashboard from ".";

function DashboardToggle() {
  const { isOpen, close, open } = useModalState();
  return (
    <>
      <Button block color="primary" onClick={open}>
        <DashboardIcon /> Dashboard
      </Button>
      <Drawer open={isOpen} onClose={close} placement="left">
        <Dashboard />
      </Drawer>
    </>
  );
}

export default DashboardToggle;
