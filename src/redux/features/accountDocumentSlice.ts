// 2023-03-06 20:00:00

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IAccountDocumentPO } from "../../utils/type";

const initialState: IAccountDocumentPO = {
  _id: null,
  username: "",
};

export const accountDocumentSlice = createSlice({
  name: "accountDocument",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<IAccountDocumentPO>) => {
      Object.assign(state, action.payload);
    },
    setAccountDocument: (state, action: PayloadAction<IAccountDocumentPO>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { set, setAccountDocument } = accountDocumentSlice.actions;

export default accountDocumentSlice.reducer;
