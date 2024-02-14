import { Button, Col, Container, Grid, IconButton, Panel, Row } from "rsuite";
import GoogleCircleIcon from "@rsuite/icons/legacy/GooglePlusCircle";

function SignInPage() {
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
                <Button appearance="primary" color="green" block>
                  Sign in from google
                </Button>
                <Button appearance="primary" color="blue" block>
                  Sign in from facebook
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
