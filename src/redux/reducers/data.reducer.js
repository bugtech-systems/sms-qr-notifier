import {SET_FLUSH, SET_STUDENT, SET_STUDENTS} from "../actions/types";

const INIT_STATE = {
    students: [],
    isFlush: false,
    student: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    }
};

export default (state = INIT_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_STUDENTS: {
      return {
        ...state,
        students: payload
      };
    }
    case SET_STUDENT: {
      return {
        ...state,
        student: payload
      };
    }
    case SET_FLUSH: {
      return {
        ...state,
        isFlush: payload
      };
    }
    default:
        return state;
};
}
