import { User } from '../../types';
import {
  UserDispatchTypes,
  USER_FAIL,
  USER_LOADING,
  USER_SUCCESS,
} from '../actions/users';

export interface UserState {
  user: User;
  loading: boolean;
  errorMessage: string;
}

const initalState: UserState = {
  user: {
    userid: 0,
    username: '',
    email: '',
    currentLocation: '',
    roles: [],
    ownedTrucks: [],
    favoriteTrucks: [],
    truckReviews: [],
    menuItemReview: [],
  },
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
    default:
      return state;
  }
};
