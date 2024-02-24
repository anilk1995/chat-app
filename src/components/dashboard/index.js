import { Button, Divider, Drawer, Notification, toaster } from "rsuite";
import { useProfile } from "../../context/profile.context";
import EditableInput from "../EditableInput";
import { database } from "../../misc/firebase";
import ProviderBlock from "./ProviderBlock";
import AvatarUploadBtn from "./AvatarUploadBtn";
import { getUserUpdates } from "../../misc/helper";

function Dashboard({ onSignOut }) {
  const { profile } = useProfile();

  const onSave = async (newData) => {
    try {
      const updates = await getUserUpdates(
        profile.uid,
        "name",
        newData,
        database
      );

      await database.ref().update(updates);

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
        <ProviderBlock />
        <h3>Hey, {profile.name}</h3>
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />
        <AvatarUploadBtn />
        <Button block color="red" appearance="primary" onClick={onSignOut}>
          Sign out
        </Button>
      </Drawer.Body>
    </>
  );
}

export default Dashboard;
