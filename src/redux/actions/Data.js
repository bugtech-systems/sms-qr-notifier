// import {fetchError, fetchStart, fetchSuccess} from "../actions";

import {SET_MESSAGE, SET_STUDENTS} from "./types";
import { BUBU_API_URL } from "../../commonData";
import axios from 'axios';


export const getAllStudents = () => async dispatch => {
  return await axios
  .get(BUBU_API_URL + "/students/getAll")
  .then((response) => {
    console.log(response)
    dispatch({type: SET_STUDENTS, payload: response.data})
    return response.data;
  });
};
