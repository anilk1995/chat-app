import {
  Button,
  Col,
  Container,
  Grid,
  Panel,
  Row,
  Notification,
  Message,
  toaster,
} from "rsuite";

import GoogleIcon from "@rsuite/icons/legacy/Google";
import FacebookIcon from "@rsuite/icons/legacy/Facebook";
import { auth, database } from "../misc/firebase";
import firebase from "firebase/app";

function SignInPage() {
  const signINWithProvider = async (provider) => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }

      toaster.push(<Notification type="success">Signed in</Notification>, {
        duration: 4000,
      });
    } catch (error) {
      <Message closable type="info">
        <strong>Info!</strong> {error.message}
      </Message>;
    }
  };

  const onFaceBookSignIn = () => {
    // signINWithProvider(new firebase.auth.FacebookAuthProvider());
  };

  const onGoogleSignIn = () => {
    signINWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to Chat App</h2>
                <p>Progressive Chat platform for nephotytes</p>
              </div>
              <div className="mt-3">
                <Button
                  appearance="primary"
                  color="green"
                  block
                  onClick={onGoogleSignIn}
                >
                  <GoogleIcon /> Sign in from google
                </Button>
                <Button
                  appearance="primary"
                  color="blue"
                  block
                  onClick={onFaceBookSignIn}
                >
                  <FacebookIcon /> Sign in from facebook
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
}

export default SignInPage;
