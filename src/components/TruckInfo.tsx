import React from "react";
import { Container } from "react-bootstrap";
import useFetchTruck from "../hooks/useFetchTruck";
import LoadingSpinner from "./LoadingSpinner";

const TruckInfo = () => {
  const [currentTruck, Loading, errorMessage] = useFetchTruck();

  if (Loading) return <LoadingSpinner />;
  return <Container></Container>;
};

export default TruckInfo;
