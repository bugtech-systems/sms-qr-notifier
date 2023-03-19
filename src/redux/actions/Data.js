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


export const createRecord = (data) => async dispatch => {
  return await axios
  .post(BUBU_API_URL + "/students/create", data)
  .then((response) => {
    dispatch(getAllStudents());
    return response.data;
  });
};

