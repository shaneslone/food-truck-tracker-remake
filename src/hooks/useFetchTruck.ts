import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCurrentTruck } from "../store/actions/trucks";
import { RootState, Truck } from "../types";

export default function useFetchTruck() {
  const { truckId } = useParams();

  const currentTruck = useSelector<RootState, Truck>(
    (state) => state.trucks.currentTruck
  );

  useEffect(() => {
    if (truckId) fetchCurrentTruck(truckId);
  }, []);

  return currentTruck;
}
