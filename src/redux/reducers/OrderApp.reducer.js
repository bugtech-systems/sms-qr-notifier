import {
    SET_ORDERS,
    SET_UNPAID_ORDERS,
    CLEAR_ORDERS,
    SET_FILTER_TYPE,
    SET_ORDERS_COUNT
  } from '../actions/types';

  const INIT_STATE = {
        orders: [],
        unpaid_orders: [],
        count: 0,
        filterType: {
          selectedFolder: 'orders',
          selectedLabel: '',
          searchText: '',
          page: 0,
          rowsPerPage: 10
        },
  };
  
  export default (state = INIT_STATE, action) => {


 
    switch (action.type) {


      case SET_ORDERS: {
        return {
          ...state,
            orders: action.payload
        };
      }

      case SET_ORDERS_COUNT: {
        return {
          ...state,
            count: action.payload
        };
      }

      case SET_UNPAID_ORDERS: {
        return {
          ...state,
            unpaid_orders: action.payload
        };
      }

      case SET_FILTER_TYPE: {
        return {
          ...state,
          filterType: action.payload,
        };
      }

      case CLEAR_ORDERS: {
        return {
          ...state,
            orders: [],
            unpaid_orders: []
        };
      }

   
      default:
        return state;
    }
  };
  