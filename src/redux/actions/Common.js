import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS } from '../../@jumbo/constants/ActionTypes';
import { SET_LOADING, STOP_LOADING } from './types';

export const fetchSuccess = message => {
  return dispatch => {
    dispatch({
      type: FETCH_SUCCESS,
      payload: message || '',
    });
    dispatch({
      type: STOP_LOADING,
    });
  };
};
export const fetchError = error => {
  return dispatch => {
    dispatch({
      type: FETCH_ERROR,
      payload: error,
    });
    dispatch({
      type: STOP_LOADING,
    });
  };
};

export const fetchStart = () => {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
    });
  };
};
