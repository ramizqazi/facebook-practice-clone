//  Get user
export const getUser = (state) => state.Auth.user;

//  Get profile
export const getProfile = (state) => state.Auth.profile;

//  Get error

export const getError = (state) => state.Auth.error;

//  Get loading

export const getLoading = (state) => state.Auth.loading;

//  Get Authenticated

export const getAuthenticated = (state) => !!getUser(state);
