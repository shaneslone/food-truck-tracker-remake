import { Truck } from "../../types";
import {
  TruckDispatchTypes,
  TRUCK_FAIL,
  TRUCK_LOADING,
  TRUCK_LOADING_COMPLETE,
  TRUCK_SUCCESS,
  UPDATE_MENU_ITEM,
  UPDATE_TRUCK,
  SET_TRUCK_TO_LOCATE,
} from "../actions/trucks";

export interface TruckState {
  allTrucks: Truck[];
  currentTruck: Truck;
  truckToLocate: Truck | null;
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
  truckToLocate: null,
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
    case UPDATE_MENU_ITEM:
      return {
        ...state,
        currentTruck: {
          ...state.currentTruck,
          menu: state.currentTruck.menu.map((menuItem) => {
            if (menuItem.menuId === action.payload.menuId) {
              return action.payload;
            } else {
              return menuItem;
            }
          }),
        },
      };
    case UPDATE_TRUCK:
      return { ...state, currentTruck: action.payload };
    case SET_TRUCK_TO_LOCATE:
      return { ...state, truckToLocate: action.payload };
    default:
      return state;
  }
};
