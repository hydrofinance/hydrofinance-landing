import { reducerWithInitialState } from "typescript-fsa-reducers";
import { builderHandler as fetchBalancesHandler } from "./fetchBalances";
import { LiquidityState, Token, TokensMap } from "../model/reducer";
import {
  connectWallet,
  networkChanged,
} from "../../common/redux/connectWallet";
import {
  getFinnAddress,
  getHydroRouter,
  getNetworkV2TokenAddress,
} from "../../web3/getNetworkData";

const createInitialToken = (
  symbol: string,
  address: string,
  networkId: number
): Token => {
  const allowance: {
    [address: string]: string;
  } = {};
  const routerAddress = getHydroRouter(networkId);
  if (routerAddress) {
    allowance[routerAddress] = "";
  }

  return {
    symbol,
    decimals: 18,
    address,
    balance: "0",
    allowance,
  };
};

const createInitialTokens = (networkId: number): TokensMap => {
  const hydroAddress = getNetworkV2TokenAddress(networkId);
  const finnAddress = getFinnAddress(networkId);

  const tokens: TokensMap = {};
  if (hydroAddress) {
    tokens[hydroAddress] = createInitialToken("HYDRO", hydroAddress, networkId);
  }
  if (finnAddress) {
    tokens[finnAddress] = createInitialToken("FINN", finnAddress, networkId);
  }
  return tokens;
};

const initialState: LiquidityState = {
  tokens: {},
  fetchBalancesPending: false,
  fetchBalancesDone: false,
  fetchApprovalPending: {},
  fetchApprovalDone: false,
  addLiquidityPending: false,
};

export default reducerWithInitialState(initialState)
  .withHandling(fetchBalancesHandler)
  .case(networkChanged, (_, { networkId }) => ({
    ...initialState,
    tokens: createInitialTokens(networkId),
  }))
  .case(connectWallet.async.done, (state, { result: { networkId } }) => ({
    ...state,
    tokens: createInitialTokens(networkId),
  }));
