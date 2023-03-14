import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import accountSlice from "./features/accountSlice";
import authSlice from "./features/authSlice";
import globalSlice from "./reuse-features/globalSlice";
import accountDocumentSlice from "./features/accountDocumentSlice";

export const reducer = combineReducers({
  global: globalSlice,
  auth: authSlice,
  account: accountSlice,
  accountDocument: accountDocumentSlice,
});

export const rootPersistConfig = {
  key: "root",
  storage,
  // blacklist: [""],
};
