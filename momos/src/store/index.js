import { combineReducers } from "@reduxjs/toolkit";
import { app_utils } from "./utils";
import { current_user } from "./user";

export const combined_reducers = combineReducers({ app_utils, current_user });
