import { builderHandler as connectHandler } from "./connectWallet";
import { builderHandler as disconnectHandler } from "./disconnectWallet";
import { builderHandler as snackbarHandler } from "./snackbar";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { CommonState } from "../model/reducer";

const initialState: CommonState = {
  address: null,
  web3: null,
  connected: false,
  networkId: null,
  snackbar: null,
};

export default reducerWithInitialState(initialState)
  .withHandling(connectHandler)
  .withHandling(disconnectHandler)
  .withHandling(snackbarHandler);
