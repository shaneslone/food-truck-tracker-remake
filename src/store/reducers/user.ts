import { User } from '../../types';
import {
  UserDispatchTypes,
  USER_FAIL,
  USER_LOADING,
  USER_LOGOUT,
  USER_SUCCESS,
} from '../actions/users';

export interface UserState {
  user: User;
  loading: boolean;
  errorMessage: string;
}

const setInitalUser = (): User => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) return JSON.parse(storedUser);
  return {
    userid: 0,
    username: '',
    email: '',
    currentLocation: '',
    roles: [],
    ownedTrucks: [],
    favoriteTrucks: [],
    truckReviews: [],
    menuItemReviews: [],
  };
};

const initalState: UserState = {
  user: setInitalUser(),
  loading: false,
  errorMessage: '',
};

export const userReducer = (state = initalState, action: UserDispatchTypes) => {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, loading: true };
    case USER_FAIL:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case USER_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: '',
        user: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        user: setInitalUser(),
      };
    default:
      return state;
  }
};
