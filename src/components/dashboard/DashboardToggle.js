import { Button, Drawer, Notification, toaster } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import { useModalState } from "../../misc/custom-hooks";
import Dashboard from ".";
import { useMediaQuery } from "rsuite/esm/useMediaQuery/useMediaQuery";
import React, { useCallback } from "react";
import { auth, database } from "../../misc/firebase";
import { isOfflineForDatabase } from "../../context/profile.context";

function DashboardToggle() {
  const { isOpen, close, open } = useModalState();
  const isMobile = useMediaQuery("(max-width: 992px)");

  const onSignOut = useCallback(() => {
    database
      .ref(`/status/${auth.currentUser.uid}`)
      .set(isOfflineForDatabase)
      .then(() => {
        auth.signOut();
        toaster.push(<Notification type="warning">Signed out</Notification>, {
          duration: 4000,
        });
        close();
      });
  }, [close]);

  return (
    <>
      <Button block appearance="primary" onClick={open}>
        <DashboardIcon /> Dashboard
      </Button>
      <Drawer
        open={isOpen}
        onClose={close}
        placement="left"
        size="sm"
        closeButton
      >
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
}

export default DashboardToggle;
