import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const middlewares: any[] = [thunk];
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const configureStore = () =>
  createStore(rootReducer, applyMiddleware(...middlewares));
export default configureStore;
