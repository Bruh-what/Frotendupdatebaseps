import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../feature/auth/auth.slicer";
const rootReducer = combineReducers({
  auth: authSlice,
});

export default rootReducer;
