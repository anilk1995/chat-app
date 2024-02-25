import { useState } from "react";
import { auth } from "../../misc/firebase";
import { Button, Notification, Tag, toaster } from "rsuite";
import GoogleIcon from "@rsuite/icons/legacy/Google";
import FacebookIcon from "@rsuite/icons/legacy/Facebook";
import firebase from "firebase/app";
function ProviderBlock() {
  const [iseConnected, setIsConnected] = useState({
    "google.com": auth.currentUser?.providerData?.some(
      (data) => data.providerId === "google.com"
    ),
    "facebook.com": auth.currentUser?.providerData?.some(
      (data) => data.providerId === "facebook.com"
    ),
  });

  const updateIsConnected = (providerId, value) => {
    setIsConnected((p) => {
      return {
        ...p,
        [providerId]: value,
      };
    });
  };

  const unlink = async (providerId) => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error(`You can not disconnect from ${providerId}`);
      }

      await auth.currentUser.unlink(providerId);

      updateIsConnected(providerId, false);
      toaster.push(
        <Notification>{`Disconnectd from ${providerId}`}</Notification>,
        {
          duration: 4000,
        }
      );
    } catch (error) {
      toaster.push(<Notification>{error.message}</Notification>, {
        duration: 4000,
      });
    }
  };

  const link = (provider) => {
    try {
      auth.firebase.currentUser.linkWithPopup(provider);
      toaster.push(
        <Notification>{`Linked to ${provider.providerId}`}</Notification>,
        {
          duration: 4000,
        }
      );
      updateIsConnected(provider.providerId, true);
    } catch (error) {
      toaster.push(<Notification>{error.message}</Notification>, {
        duration: 4000,
      });
    }
  };

  const unlinkFacebook = () => {
    unlink("facebook.com");
  };

  const unlinkGoogle = () => {
    unlink("google.com");
  };

  const linkFacebook = () => {
    // link(new firebase.auth.FacebookAuthProvider());
  };

  const linkGoogle = () => {
    link(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <div>
      {iseConnected["google.com"] && (
        <Tag closable color="green" onClose={unlinkGoogle}>
          <GoogleIcon /> Connected
        </Tag>
      )}
      {iseConnected["facebook.com"] && (
        <Tag closable color="blue" onClose={unlinkFacebook}>
          <FacebookIcon /> Connected
        </Tag>
      )}

      <div className="mt-2">
        {!iseConnected["google.com"] && (
          <Button block color="green" appearance="primary" onClick={linkGoogle}>
            <GoogleIcon /> Link to Google
          </Button>
        )}
        {!iseConnected["facebook.com"] && (
          <Button
            block
            color="blue"
            appearance="primary"
            onClick={linkFacebook}
          >
            <FacebookIcon /> Link to Facebook
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProviderBlock;
