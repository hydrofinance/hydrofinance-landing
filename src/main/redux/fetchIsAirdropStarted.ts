import { BigNumber } from "bignumber.js";
import { ReducerBuilder } from "typescript-fsa-reducers";
import { AbiItem } from "web3-utils";
import { createAsync } from "../../utils/reduxCreators";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Store } from "../../utils/rootReducer";
import Web3 from "web3";
import { airdropABI } from "../../web3/abi";
import { getNetworkAirdropAddress } from "../../web3/getNetworkData";
import { MainState } from "../model/reducer";

interface FetchIsAirdropProps {
  networkId: number | null;
  address: string | null;
  web3: Web3 | null;
}

export const fetchIsAirdropStarted = createAsync<
  FetchIsAirdropProps,
  boolean,
  Error
>("FETCH_IS_AIRDROP_STARTED", async ({ address, web3, networkId }) => {
  if (!web3 || !address || !networkId) {
    return false;
  }

  const airdropAddress = getNetworkAirdropAddress(networkId);
  if (!airdropAddress) {
    return false;
  }

  const contract = new web3.eth.Contract(
    airdropABI as AbiItem[],
    airdropAddress
  );
  const startTime = new BigNumber(
    await contract.methods.startTime().call({ from: address })
  );

  return !startTime.isZero();
});

export function useFetchIsAirdropStarted() {
  const dispatch = useDispatch();
  const {
    networkId,
    address,
    web3,
    isAirdropStarted,
    isAirdropStartedPending,
  } = useSelector(
    (state: Store) => ({
      networkId: state.common.networkId,
      address: state.common.address,
      web3: state.common.web3,
      isAirdropStarted: state.main.isAirdropStarted,
      isAirdropStartedPending: state.main.isAirdropStartedPending,
    }),
    shallowEqual
  );
  const boundAction = useCallback(
    () => dispatch(fetchIsAirdropStarted({ networkId, address, web3 })),
    [dispatch, networkId, address, web3]
  );

  return {
    isAirdropStarted,
    isAirdropStartedPending,
    fetchIsAirdropStarted: boundAction,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<MainState>
): ReducerBuilder<MainState> =>
  builder
    .case(fetchIsAirdropStarted.async.started, (state) => ({
      ...state,
      isAirdropStartedPending: true,
    }))
    .case(fetchIsAirdropStarted.async.failed, (state) => ({
      ...state,
      isAirdropStartedPending: false,
    }))
    .case(fetchIsAirdropStarted.async.done, (state, { result }) => ({
      ...state,
      isAirdropStarted: result,
      isAirdropStartedPending: false,
    }));
