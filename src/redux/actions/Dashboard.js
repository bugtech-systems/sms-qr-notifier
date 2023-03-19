//For expanding sidebar
import {
    SET_DASHBOARD_DATA, SET_LOADING, STOP_LOADING
  } from './types';
  import { fetchError, fetchStart, fetchSuccess } from './Common';
  import axios from 'axios';
  import commonData from 'utils/commonData';
  
  import { authHeader } from "../../services/auth-header";


  
  //for getting customer categories(in sidebar) count
  export const getAdminDashboard = () => {
    return dispatch => {
      dispatch({type: SET_LOADING})
      
      axios
        .get(`${commonData.apiUrl}/admin/dashboard`, {
            headers: authHeader(),
          })
        .then(({data}) => {
            dispatch({ type: SET_DASHBOARD_DATA, payload: data });
            dispatch({type: STOP_LOADING})
        })
        .catch(error => {
          dispatch({type: STOP_LOADING})
          dispatch(fetchError('Something went wrong'));
        });
    };
  };



  export const updateStoreDetails = (values) => {
    return dispatch => {
    dispatch(fetchStart())

      axios
        .put(`${commonData.apiUrl}/admin/store`, values, {
            headers: authHeader(),
          })
        .then(({data}) => {
            dispatch({ type: SET_DASHBOARD_DATA, payload: { business: data.d }});
            dispatch(fetchSuccess())
        })
        .catch(error => {
          dispatch(fetchError('Something went wrong'));
        });
    };
  };
  