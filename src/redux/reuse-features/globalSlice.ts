// 2023-03-06 20:00:00

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IGlobalPO } from "../../utils/re-utils/type";

export const initialState: IGlobalPO = {
  isAuth: null,
  email: "",
  username: "",
  theme: "light",
  photo: "",
  documentIdsStr: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<IGlobalPO>) => {
      Object.assign(state, action.payload);
    },
    setGlobal: (state, action: PayloadAction<IGlobalPO>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { set, setGlobal } = globalSlice.actions;

export default globalSlice.reducer;
