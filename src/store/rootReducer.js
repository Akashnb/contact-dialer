import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { reducer as contactReducer } from '../modules/dashboard';

const appReducer = combineReducers({
  form: formReducer,
  contact: contactReducer,
});

export default appReducer;
