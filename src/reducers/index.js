// Set up your root reducer here...
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import dataReducer from './dataReducer';

const rootReducer = combineReducers({
  data: dataReducer,
  routing: routerReducer,
});

export default rootReducer;
