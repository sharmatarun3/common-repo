// import React from 'react'
import axios from "axios";

const axiosIntance = axios.create({
  baseURL: "https://react-udumy-taru.firebaseio.com/",
});

export default axiosIntance;
