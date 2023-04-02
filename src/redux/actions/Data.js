// import {fetchError, fetchStart, fetchSuccess} from "../actions";

import {SET_ATTENDANCES, SET_MESSAGE, SET_STUDENTS} from "./types";
import { BUBU_API_URL } from "../../commonData";
import axios from 'axios';


export const getAttendance = () => async dispatch => {
  return await axios
  .get(BUBU_API_URL + "/students/attendances")
  .then((response) => {
    console.log(response)
    dispatch({type: SET_ATTENDANCES, payload: response.data})
    return response.data;
  });
};



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



export const updateRecord = (data) => async dispatch => {
  return await axios
  .put(BUBU_API_URL + `/updateById/${data._id}`, data)
  .then((response) => {
    dispatch(getAllStudents());
    return response.data;
  });
};


export const scanCode = (code, isFlush) => async dispatch => {
  return await axios
  .get(BUBU_API_URL + `/students/scan-qr/${code}?isFlush=${isFlush}`)
};



export const deleteRecord = (data) => async dispatch => {
  return await axios
  .delete(BUBU_API_URL + `/students/deleteById/${data}`)
  .then((response) => {
    dispatch(getAllStudents());
    return response.data;
  });
};
