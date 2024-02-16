import { Button, Divider, Drawer, Notification, toaster } from "rsuite";
import { useProfile } from "../../context/profile.context";
import EditableInput from "../EditableInput";
import { database } from "../../misc/firebase";

function Dashboard({ onSignOut }) {
  const { profile } = useProfile();

  const onSave = async (newData) => {
    const userNickNameRef = database
      .ref(`/profiles/${profile.uid}`)
      .child("name");

    try {
      await userNickNameRef.set(newData);
      toaster.push(<Notification>Nickname has been updated</Notification>, {
        duration: 4000,
      });
    } catch (error) {
      toaster.push(<Notification>{error.message}</Notification>, {
        duration: 4000,
      });
    }
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 classname="mb-2">Nickname</h6>}
        />
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" appearance="primary" onClick={onSignOut}>
          Sign out
        </Button>
      </Drawer.Footer>
    </>
  );
}

export default Dashboard;
