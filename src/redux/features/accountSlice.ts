// 2023-03-06 20:00:00

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IAccountPO } from "../../utils/type";

const initialState: IAccountPO = {
  id: null,
  email: "",
  password: "",
  documentIdsStr: "",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<IAccountPO>) => {
      Object.assign(state, action.payload);
    },
    setAccount: (state, action: PayloadAction<IAccountPO>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { set, setAccount } = accountSlice.actions;

export default accountSlice.reducer;
