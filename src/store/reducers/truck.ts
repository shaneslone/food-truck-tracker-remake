import { Truck } from "../../types";
import {
  TruckDispatchTypes,
  TRUCK_FAIL,
  TRUCK_LOADING,
  TRUCK_LOADING_COMPLETE,
  TRUCK_SUCCESS,
} from "../actions/trucks";

export interface TruckState {
  allTrucks: Truck[];
  currentTruck: Truck;
  loading: boolean;
  errorMessage: string;
}

const initalState: TruckState = {
  allTrucks: [],
  currentTruck: {
    truckId: 0,
    name: "",
    imageOfTruck: "",
    cuisineType: "",
    currentLocation: "",
    departureTime: 0,
    dinerFavorites: [],
    menu: [],
    reviews: [],
    customerRatingsAvg: 0,
  },
  loading: false,
  errorMessage: "",
};

export const truckReducer = (
  state = initalState,
  action: TruckDispatchTypes
) => {
  switch (action.type) {
    case TRUCK_LOADING:
      return { ...state, loading: true };
    case TRUCK_SUCCESS:
      return { ...state, [action.field]: action.payload, errorMessage: "" };
    case TRUCK_FAIL:
      return { ...state, errorMessage: action.payload };
    case TRUCK_LOADING_COMPLETE:
      return { ...state, loading: false };
    default:
      return state;
  }
};
