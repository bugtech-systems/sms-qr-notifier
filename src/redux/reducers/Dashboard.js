import {
  CLEAR_DASHBOARD_DATA,
  SET_DASHBOARD_DATA, SET_TODAY_SALES,
} from '../actions/types';

const INIT_STATE = {
    business: {
      contacts: []
    },
    counts: {
      users: 0,
      customers: 0,
      products: 0,
      orders: 0
    },
    popularProducts: [],
    productLists: [],
    unpaidCustomers: [],
    revenueSummary: {
      totalSales: 0,
      totalExpenses: 0,
      totalInventory: 0,
      data: []
    },
    unpaidOrders: [],
    todaySales: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_DASHBOARD_DATA: {
      return {
        ...state,
        ...action.payload
      };
    }

    case CLEAR_DASHBOARD_DATA: {
      return {
        business: {},
        counts: {
          users: 0,
          customers: 0,
          products: 0,
          orders: 0
        },
        popularProducts: [],
        productLists: [],
        unpaidCustomers: [],
        unpaidOrders: [],
        todaySales: {
          today: [],
          total: 0
        }
      };
    }

    case SET_TODAY_SALES: {
      return {
        ...state,
        todaySales: action.payload
      };
    }

    default:
      return state;
  }
};
