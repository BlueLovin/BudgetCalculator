import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";

export default function Tabs({ listItems }: any) {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        {/* Hardcoded the categories in :-( ...getting them in there automatically was an enormous headache. */}
        <Col sm={6}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Deck Material</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Fencing and Privacy</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Ground Cover</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fourth">Lighting</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fifth">Structures</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="sixth">Water Features</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={5}>
          <Tab.Content>
            <Tab.Pane eventKey="first">{listItems("DECK_MATERIAL")}</Tab.Pane>
            <Tab.Pane eventKey="second">
              {listItems("FENCING_AND_PRIVACY")}
            </Tab.Pane>
            <Tab.Pane eventKey="third">{listItems("GROUND_COVER")}</Tab.Pane>
            <Tab.Pane eventKey="fourth">{listItems("LIGHTING")}</Tab.Pane>
            <Tab.Pane eventKey="fifth">{listItems("STRUCTURES")}</Tab.Pane>
            <Tab.Pane eventKey="sixth">{listItems("WATER_FEATURES")}</Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}
