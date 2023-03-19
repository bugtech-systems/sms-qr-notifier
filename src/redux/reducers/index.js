import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import Auth from './Auth';
import uiReducer from './Ui';
import dataReducer from './data.reducer';




export default history =>
  combineReducers({
    router: connectRouter(history),
    auth: Auth,
    uiReducer: uiReducer,
    dataReducer: dataReducer
  });
