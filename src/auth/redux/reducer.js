import * as constants from './constants';

const INITIAL_STATE = {
  user: null,
  profile: null,
  error: null,
  loading: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload, error } = action;
  switch (type) {
    case constants.AUTH_STATE_CHANGE:
      return {
        ...state,
        user: payload.jsonUser,
        profile: payload.userProfile,
      };
      
      // Login
      case constants.LOGIN.REQUEST:
      return {
        ...state,
        loading: true,
      };
      case constants.LOGIN.SUCCESS:
      return {
        ...state,
        profile: payload,
      };
    case constants.LOGIN.FAIL:
      return {
        ...state,
        error,
      };
    case constants.LOGIN.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // Register
    case constants.REGISTER.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.REGISTER.SUCCESS:
      return {
        ...state,
        profile: payload,
      };

    case constants.REGISTER.FAIL:
      return {
        ...state,
        error,
      };
    case constants.REGISTER.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // Logout
    case constants.LOGOUT.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.LOGOUT.SUCCESS:
      return {
        ...state,
        user: null,
        profile: null,
      };
    case constants.LOGOUT.FAIL:
      return {
        ...state,
        error,
      };
    case constants.LOGOUT.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
