import { SET_ORDERS, SET_UNPAID_ORDERS, CLEAR_ORDERS, UPDATE_CART, SET_FILTER_TYPE, SET_ORDERS_COUNT, SET_CART_SUCCESS, SET_ACTION } from './types';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import { authHeader } from '../../services/auth-header';

import commonData from '../../utils/commonData';
import axios from 'axios';

import { getAdminDashboard } from './Dashboard';
import { getProductsList } from './ProductApp';



//For setting Filtertype
export const setFilterType = filterType => {
  return {
    type: SET_FILTER_TYPE,
    payload: filterType,
  };
};

export const getOrders = params => {
    return dispatch => {
        dispatch(fetchStart());
        dispatch({type: CLEAR_ORDERS});
        return axios
          .get(`${commonData.apiUrl}/orders`, {params}, { headers: authHeader() })
          .then(({data}) => {
            dispatch({ type: SET_ORDERS, payload:  data.rows });
            dispatch({ type: SET_ORDERS_COUNT, payload:  data.count });

            dispatch(fetchSuccess());

            // dispatch({type: SET_ORDERS, payload: data.orders})
            // dispatch({type: SET_UNPAID_ORDERS, payload: data.unpaid_orders})
            return data.rows
          }).catch(err => {
            console.log(err)
            // return null;
            dispatch(fetchError('Something went wrong!'));

          });
    };
  };


  export const getCartOrderById = (id) => dispatch => {
    return axios
      .get(`${commonData.apiUrl}/orders/${id}`, { headers: authHeader() })
      .then(({data}) => {
        dispatch({type: UPDATE_CART, payload: data})
        return data
      })
      .catch(err => {
        console.log(err)
        throw err;
      });
};


  export const getOrderById = (id) => dispatch => {
        return axios
          .get(`${commonData.apiUrl}/orders/${id}`, { headers: authHeader() })
          .catch(err => {
            console.log(err)
            throw err;
          });
    };

    export const voidOrderId = (id) => dispatch => {
      return axios
        .post(`${commonData.apiUrl}/order/void/${id}`,  {}, { headers: authHeader() })
        .catch(err => {
          console.log(err.response)
          throw err;
        });
  };



  export const payOrder = (data) => dispatch => {
      dispatch(fetchStart());
      return axios
        .post(`${commonData.apiUrl}/payments`, data, { headers: authHeader() })
        .then((res) => {
          let { message, data } = res.data;
        dispatch(getOrders());
        dispatch(getCartOrderById(data.id));
        dispatch(fetchSuccess(message));
        localStorage.removeItem('cart')
        // dispatch({type: SET_CART_SUCCESS, payload: data.id});
        // dispatch({type: SET_ACTION, payload: 'success'})


          dispatch(getAdminDashboard())
          dispatch(getProductsList());
          return res.data
        })
        .catch(err => {
          console.log(err)
          throw err;
        });
  };


  export const generateNumber = () => {
        return axios
          .get(`${commonData.apiUrl}/generateNumber`, { headers: authHeader() })
          .then(({data}) => {
            return data
          }).catch(err => {
            console.log(err)
            return null;
          });
    };
