import {SET_CREATE_CUSTOMER_DIALOG, SET_OPTIONS, SET_USER_DIALOG, SET_STORE_DIALOG, SET_UI, CLEAR_CART, SET_CART_SUCCESS, SET_NOTIFICATIONS, SET_NOTIF_COUNT, SET_DRAWER_OPEN, SET_ACTIVE_OPTION, SET_ACTION, SET_EXPENSE_DIALOG, SET_LOADING, STOP_LOADING} from "../actions/types";

const INIT_STATE = {
    createCustomerDialog: false,
    notifications: [],
    notifCount: 0,
    action: 'cart',
    activeOption: 'cart',
    viewMode: 'order',
    isDrawerOpen: false,
    cartSuccess: null,
    userDialog: false,
    expenseDialog: false,
    autoCompleteProducts: [],
    autoCompleteCustomers: [],
    options: [],
    loading: false
};

export default (state = INIT_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_UI: {
      return {
        ...state,
        ...payload
      };
    }

    case SET_OPTIONS: {
      return {
        ...state,
        options: payload
      };
    }

    case SET_USER_DIALOG: {
      return {
        ...state,
        userDialog: payload ? true : false
      };
    }

    
    case SET_EXPENSE_DIALOG: {
      return {
        ...state,
        expenseDialog: payload ? true : false
      };
    }

    case SET_STORE_DIALOG: {
      return {
        ...state,
        storeDialog: payload ? true : false
      };
    }

    case SET_CREATE_CUSTOMER_DIALOG: {
      return {
        ...state,
        createCustomerDialog: payload ? true : false
      };
    }

    case SET_NOTIF_COUNT: {
      return {
        ...state,
        notifCount: payload !== 0 ? state.notifCount++ : 0
      };
    }
  

    case SET_NOTIFICATIONS: {
      return {
        ...state,
       ...payload
      };
    }

    case SET_DRAWER_OPEN: {
      return {
        ...state,
        isDrawerOpen: payload
      };
    }

    case CLEAR_CART: {
      return {
        ...state,
        action: 'cart',
        activeOption: 'cart',
        cartSuccess: null
      };
    }

    case SET_CART_SUCCESS: {
      return {
        ...state,
        cartSuccess: payload
      };
    }

    case SET_ACTION: {
      return {
        ...state,
        action: payload
      };
    }

    case SET_ACTIVE_OPTION: {
      return {
        ...state,
        activeOption: payload
      };
    }
    

    case SET_LOADING: {
      return {
        ...state,
        loading: true
      };
    }

    
    case STOP_LOADING: {
      return {
        ...state,
        loading: false
      };
    }

    default:
      return state;
  }
};
