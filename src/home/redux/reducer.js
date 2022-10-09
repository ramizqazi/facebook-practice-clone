import * as constants from './constants';

const INITIAL_STATE = {
  posts: null,
  error: null,
  loading: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload, error } = action;
  
  switch (type) {
    // GET_POSTS
    case constants.GET_POSTS.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.GET_POSTS.SUCCESS:
      return {
        ...state,
        posts: payload,
      };
    case constants.GET_POSTS.FAIL:
      return {
        ...state,
        error,
      };
    case constants.GET_POSTS.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // CREATE_POST
    case constants.CREATE_POST.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.CREATE_POST.SUCCESS:
      return  {
        ...state,
        posts: [payload, ...state.posts],
      };
    case constants.CREATE_POST.FAIL:
      return {
        ...state,
        error,
      };
    case constants.CREATE_POST.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
