import { User } from '../../types';
import {
  UserDispatchTypes,
  USER_FAIL,
  USER_LOADING,
  USER_SUCCESS,
} from '../actions/users';

export interface IState {
  user: User;
  loading: boolean;
  errorMessage: string;
}

const initalState: IState = {
  user: {
    userid: 0,
    username: '',
    email: '',
    currentLocation: '',
    roles: [],
    ownedTrucks: [],
    truckReviews: [],
    menuItemReview: [],
  },
  loading: false,
  errorMessage: '',
};

export const reducer = (state = initalState, action: UserDispatchTypes) => {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, loading: true };
    case USER_FAIL:
      return {
        ...state,
        loading: false,
        errorMessage: 'Failed to load user information!',
      };
    case USER_SUCCESS:
      return { ...state, loading: false, errorMessage: '' };
    default:
      return state;
  }
};
