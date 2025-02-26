import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../axiosRequest";

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (obj) => {
    try {
      let { data } = await axiosRequest.post("/Account/login", obj);
      localStorage.setItem("token", data.data);
    } catch (error) {
      console.log(error);
    }
  }
);
