import { Col, Grid, Row } from "rsuite";
import Sidebar from "../components/Sidebar";

function HomePage() {
  return (
    <Grid fluid className="h-100">
      <Row>
        <Col xs={24} md={8}>
          <Sidebar />
        </Col>
      </Row>
    </Grid>
  );
}

export default HomePage;
