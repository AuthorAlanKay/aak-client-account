import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IAuthPO } from "../../utils/type";

const initialState: IAuthPO = { bool: false };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<IAuthPO>) => {
      Object.assign(state, action.payload);
    },
    setAuth: (state, action: PayloadAction<IAuthPO>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { set, setAuth } = authSlice.actions;

export default authSlice.reducer;
