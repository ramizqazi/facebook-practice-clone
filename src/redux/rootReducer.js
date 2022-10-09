import { combineReducers } from 'redux';

import AuthReducer from '../auth/redux/reducer';
import HomeReducer from '../home/redux/reducer';
import EntitiesReducer from '../entities/redux/reducer';

const rootReducer = combineReducers({
  Auth: AuthReducer,
  Home: HomeReducer,
  Entities: EntitiesReducer,
});

export default rootReducer;
