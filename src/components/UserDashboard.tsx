import { Container, Row, Col, Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState, User } from "../types";

import TruckCard from "./TruckCard";

const UserDashboard = () => {
  const user = useSelector<RootState, User>((state) => state.user.user);

  return (
    <Container fluid>
      <Row className="d-flex align-items-center">
        <Col md="auto">My Favorite Trucks</Col>
      </Row>
      <Row>
        <Accordion>
          {user.favoriteTrucks.map((truck) => {
            return (
              <Accordion.Item
                eventKey={truck.truck.name}
                key={truck.truck.truckId}
              >
                <Accordion.Header>{truck.truck.name}</Accordion.Header>
                <Accordion.Body>
                  <TruckCard truck={truck.truck} />
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </Row>
    </Container>
  );
};

export default UserDashboard;
