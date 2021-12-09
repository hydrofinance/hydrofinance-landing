import { ReducerBuilder } from "typescript-fsa-reducers";
import { AbiItem } from "web3-utils";
import { createAsync } from "../../utils/reduxCreators";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Store } from "../../utils/rootReducer";
import Web3 from "web3";
import { airdropABI } from "../../web3/abi";
import { getNetworkAirdropAddress } from "../../web3/getNetworkData";
import { MainState, UserInfo } from "../model/reducer";
import { byDecimals } from "../../utils/bignumber";

interface FetchPendingClaimProps {
  networkId: number | null;
  address: string | null;
  web3: Web3 | null;
}

export const fetchPendingClaim = createAsync<
  FetchPendingClaimProps,
  UserInfo | null,
  Error
>("FETCH_PENDING_CLAIM", async ({ address, web3, networkId }) => {
  if (!web3 || !address || !networkId) {
    return null;
  }

  const airdropAddress = getNetworkAirdropAddress(networkId);

  const contract = new web3.eth.Contract(
    airdropABI as AbiItem[],
    airdropAddress
  );
  const { amount, claimedAmount } = await contract.methods
    .userInfo(address)
    .call({ from: address });

  return { amount: amount.toString(), claimedAmount: claimedAmount.toString() };
});

export function useFetchPendingClaim() {
  const dispatch = useDispatch();
  const { networkId, address, web3, claimAmount, claimAmountPending } =
    useSelector(
      (state: Store) => ({
        networkId: state.common.networkId,
        address: state.common.address,
        web3: state.common.web3,
        claimAmount: state.main.claimAmount,
        claimAmountPending: state.main.claimAmountPending,
      }),
      shallowEqual
    );
  const boundAction = useCallback(
    () => dispatch(fetchPendingClaim({ networkId, address, web3 })),
    [dispatch, networkId, address, web3]
  );

  const userInfo = useMemo(() => {
    if (!claimAmount) {
      return null;
    }

    return {
      amount: byDecimals(claimAmount.amount, 18),
      claimedAmount: byDecimals(claimAmount.claimedAmount, 18),
    };
  }, [claimAmount]);

  return {
    userInfo: userInfo,
    claimAmountPending,
    fetchPendingClaim: boundAction,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<MainState>
): ReducerBuilder<MainState> =>
  builder
    .case(fetchPendingClaim.async.started, (state) => ({
      ...state,
      claimAmountPending: true,
    }))
    .case(fetchPendingClaim.async.failed, (state) => ({
      ...state,
      claimAmountPending: false,
    }))
    .case(fetchPendingClaim.async.done, (state, { result }) => ({
      ...state,
      claimAmount: result,
      claimAmountPending: false,
    }));
