//For expanding sidebar
import {
    SET_NOTIFICATIONS
} from './types';
  import { fetchError, fetchStart, fetchSuccess } from './Common';
  import axios from 'axios';
  import commonData from 'utils/commonData';
  
  import { authHeader } from '../../services/auth-header';

  
  export const readNotification = val => {
    return dispatch => {
      axios
        .put(`${commonData.apiUrl}/notification/:id`, { headers: authHeader() })
        .then(({ data }) => {
          dispatch(getAllNotifications());
          // dispatch(fetchSuccess(data.message));
        })
        .catch(error => {
          console.log(error);
          dispatch(fetchError('Something went wrong'));
        });
    };
  };
  
  export const getAllNotifications = () => dispatch => {
    return  axios
        .get(`${commonData.apiUrl}/notifications`, { headers: authHeader() })
        .then(({ data }) => {
          dispatch({ type: SET_NOTIFICATIONS, payload: {notifications: data }});
          // dispatch(getProductsList());
          // dispatch(fetchSuccess(data.message));
          return data;
        })
        .catch(error => {
          console.log(error);
        //   dispatch(fetchError('Something went wrong'));
        throw error;
        });
  };
  