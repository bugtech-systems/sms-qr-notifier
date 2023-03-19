import { SEND_FORGET_PASSWORD_EMAIL, UPDATE_AUTH_USER, UPDATE_LOAD_USER, CLEAR_USER } from '../actions/types';

const INIT_USER = {
  contacts: [],
  password: null
}

const INIT_STATE = {
  authUser: INIT_USER,
  loadUser: false,
  isAdmin: false,
  send_forget_password_email: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_AUTH_USER: {
      let { roles } = action.payload ? action.payload : {};
      let adm = roles && roles.find(a => String(a.name).includes('super') || String(a.name).includes('admin'));
      return {
        ...state,
        authUser: {...INIT_USER, ...action.payload},
        loadUser: true,
        isAdmin: adm ? true : false
      };
    }
    case UPDATE_LOAD_USER: {
      return {
        ...state,
        loadUser: action.payload,
      };
    }
    case SEND_FORGET_PASSWORD_EMAIL: {
      return {
        ...state,
        send_forget_password_email: action.payload,
      };
    }
    case CLEAR_USER: {
      return {
        ...state,
        authUser: INIT_USER,
        loadUser: false,
        isAdmin: false
      };
    }
    default:
      return state;
  }
};
