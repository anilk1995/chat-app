import { Button, Drawer } from "rsuite";
import { useProfile } from "../../context/profile.context";

function Dashboard({ onSignOut }) {
  const { profile } = useProfile();
  return (
    <>
      <Drawer.Header>Dashboard</Drawer.Header>
      <Drawer.Body>
        <div>
          <h2>Hey, {profile.name}</h2>
        </div>
        <Button block color="red" appearance="primary" onClick={onSignOut}>
          Sign out
        </Button>
      </Drawer.Body>
    </>
  );
}

export default Dashboard;
