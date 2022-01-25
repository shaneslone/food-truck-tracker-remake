import { TruckMin } from "../types";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ChangeEvent, useState } from "react";

const AddTruck = () => {
  const dispatch = useDispatch();

  const initalValues: TruckMin = {
    name: "",
    imageOfTruck: "",
    cuisineType: "",
    currentLocation: "",
    depatureTime: "",
  };

  const [truckInfo, setTruckInfo] = useState<TruckMin>(initalValues);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTruckInfo((truckInfo) => ({
      ...truckInfo,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setTruckInfo(initalValues);
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Row className="d-flex justify-content-center">
          <Col md={4}>
            <Form.Group>
              <FloatingLabel label="name">
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  value={truckInfo.name}
                  onChange={onChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center">
          <Col md={4}>
            <Form.Group>
              <FloatingLabel label="Truck Image">
                <Form.Control
                  type="text"
                  placeholder="Truck Image URL"
                  name="imageOfTruck"
                  value={truckInfo.imageOfTruck}
                  onChange={onChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
