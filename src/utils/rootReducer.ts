import { combineReducers } from "redux";
import { CommonState } from "../common/model/reducer";
import commonReducer from "../common/redux/reducer";
import { LiquidityState } from "../liquidity/model/reducer";
import liquidityReducer from "../liquidity/redux/reducer";
import { MainState } from "../main/model/reducer";
import mainReducer from "../main/redux/reducer";

export type Store = {
  main: MainState;
  liquidity: LiquidityState;
  common: CommonState;
};

const reducerMap = {
  main: mainReducer,
  liquidity: liquidityReducer,
  common: commonReducer,
};

export default combineReducers(reducerMap);
