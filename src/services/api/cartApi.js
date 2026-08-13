import api from "./axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export async function getCart() {
  const response = await api.get("/cart");

  return response.data.data;
}
