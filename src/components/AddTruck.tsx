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

  return <Container></Container>;
};
