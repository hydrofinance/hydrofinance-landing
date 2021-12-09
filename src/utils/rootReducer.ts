import { combineReducers } from "redux";
import { CommonState } from "../common/model/reducer";
import commonReducer from "../common/redux/reducer";
import { MainState } from "../main/model/reducer";
import mainReducer from "../main/redux/reducer";

export type Store = {
  main: MainState;
  common: CommonState;
};

const reducerMap = {
  main: mainReducer,
  common: commonReducer,
};

export default combineReducers(reducerMap);
