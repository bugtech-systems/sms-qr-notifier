import {SET_STUDENTS} from "../actions/types";

const INIT_STATE = {
    students: []
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
    default:
        return state;
};
}
