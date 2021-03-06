import { Dispatch } from 'react';
import { Truck, MenuItem } from '../../types';
import axiosWithAuth from '../../utils/axoisWithAuth';

export const TRUCK_LOADING = 'TRUCK_LOADING';
export const TRUCK_FAIL = 'TRUCK_FAIL';
export const TRUCK_SUCCESS = 'TRUCK_SUCCESS';
export const TRUCK_LOADING_COMPLETE = 'TRUCK_LOADING_COMPLETE';
export const UPDATE_MENU_ITEM = 'UPDATE_MENU_ITEM';
export const UPDATE_TRUCK = 'UPDATE_TRUCK';
export const SET_TRUCK_TO_LOCATE = 'SET_TRUCK_TO_LOCATE';
export const CURRENT_TRUCK = 'currentTruck';
export const TRUCK_TO_LOCATE = 'truckToLocate';
export const TRUCK_TO_EDIT = 'truckToEdit';

export interface TruckLoading {
  type: typeof TRUCK_LOADING;
}

export interface TruckFail {
  type: typeof TRUCK_FAIL;
  payload: string;
}

export interface TruckSuccess {
  type: typeof TRUCK_SUCCESS;
  field: string;
  payload: Truck[];
}

export interface UpdateMenuItem {
  type: typeof UPDATE_MENU_ITEM;
  payload: MenuItem;
}

export interface UpdateTruck {
  type: typeof UPDATE_TRUCK;
  field: typeof CURRENT_TRUCK | typeof TRUCK_TO_LOCATE | typeof TRUCK_TO_EDIT;
  payload: Truck | null;
}

export interface TruckLoadingComplete {
  type: typeof TRUCK_LOADING_COMPLETE;
}

export type TruckDispatchTypes =
  | TruckLoading
  | TruckFail
  | TruckSuccess
  | TruckLoadingComplete
  | UpdateMenuItem
  | UpdateTruck;

export const fetchTrucks =
  () => async (dispatch: Dispatch<TruckDispatchTypes>) => {
    try {
      dispatch({
        type: TRUCK_LOADING,
      });

      const res = await axiosWithAuth().get('/trucks/trucks');

      dispatch({
        type: TRUCK_SUCCESS,
        field: 'allTrucks',
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: TRUCK_FAIL,
        payload: 'Failed to load trucks.',
      });
    } finally {
      dispatch({
        type: TRUCK_LOADING_COMPLETE,
      });
    }
  };

export const fetchTrucksByCuisine =
  (cuisineType: string) => async (dispatch: Dispatch<TruckDispatchTypes>) => {
    try {
      dispatch({
        type: TRUCK_LOADING,
      });

      const res = await axiosWithAuth().get(
        `/trucks/trucks/cuisinetype/${cuisineType}`
      );

      dispatch({
        type: TRUCK_SUCCESS,
        field: 'allTrucks',
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: TRUCK_FAIL,
        payload: 'Failed to load trucks',
      });
    } finally {
      dispatch({
        type: TRUCK_LOADING_COMPLETE,
      });
    }
  };

export const fetchCurrentTruck =
  (truckId: string) => async (dispatch: Dispatch<TruckDispatchTypes>) => {
    try {
      dispatch({
        type: TRUCK_LOADING,
      });

      const res = await axiosWithAuth().get(`/trucks/truck/${truckId}`);

      dispatch({
        type: TRUCK_SUCCESS,
        field: 'currentTruck',
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: TRUCK_FAIL,
        payload: 'Failed to load truck',
      });
    } finally {
      dispatch({
        type: TRUCK_LOADING_COMPLETE,
      });
    }
  };

export const addTruckRating =
  (truckId: number, rating: number) =>
  async (dispatch: Dispatch<TruckDispatchTypes>) => {
    try {
      const res = await axiosWithAuth().post<Truck>(
        `/trucks/truck/${truckId}/rating/${rating / 20}`
      );

      dispatch({
        type: UPDATE_TRUCK,
        field: CURRENT_TRUCK,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: TRUCK_FAIL,
        payload: 'Failed to add rating',
      });
    }
  };

export const fetchTrucksByRating =
  (rating: string) => async (dispatch: Dispatch<TruckDispatchTypes>) => {
    try {
      dispatch({
        type: TRUCK_LOADING,
      });

      const res = await axiosWithAuth().get(`/trucks/trucks/rating/${rating}`);

      dispatch({
        type: TRUCK_SUCCESS,
        field: 'allTrucks',
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: TRUCK_FAIL,
        payload: 'Failed to load trucks.',
      });
    } finally {
      dispatch({
        type: TRUCK_LOADING_COMPLETE,
      });
    }
  };

export const addMenuItemRating =
  (menuItemId: number, rating: number) =>
  async (dispatch: Dispatch<TruckDispatchTypes>) => {
    try {
      const res = await axiosWithAuth().post<MenuItem>(
        `/menuitems/menuitem/${menuItemId}/rating/${rating / 20}`
      );

      dispatch({
        type: UPDATE_MENU_ITEM,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: TRUCK_FAIL,
        payload: 'Failed to add Menu Item rating',
      });
    }
  };

export const locateTruck =
  (truck: Truck | null) => (dispatch: Dispatch<TruckDispatchTypes>) =>
    dispatch({
      type: UPDATE_TRUCK,
      field: TRUCK_TO_LOCATE,
      payload: truck,
    });

export const setTruckToEdit =
  (truck: Truck | null) => (dispatch: Dispatch<TruckDispatchTypes>) => {
    dispatch({
      type: UPDATE_TRUCK,
      field: TRUCK_TO_EDIT,
      payload: truck,
    });
  };
