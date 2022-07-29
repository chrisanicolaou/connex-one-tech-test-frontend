import axios from "axios";

/* 
Script for providing repeatable functions for Axios API calls.
Sets up the baseURL and authorization header for every call.
*/
const api = axios.create({
  baseURL: "https://limitless-coast-44176.herokuapp.com/api",
  headers: { Authorization: process.env.REACT_APP_SECRET_TOKEN }
});

const getReq = async (path) => {
  const res = await api.get(path);
  return res.data;
};

export default getReq;
