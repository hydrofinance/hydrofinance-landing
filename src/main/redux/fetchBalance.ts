import { ReducerBuilder } from "typescript-fsa-reducers";
import { AbiItem } from "web3-utils";
import { createAsync } from "../../utils/reduxCreators";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Store } from "../../utils/rootReducer";
import Web3 from "web3";
import { erc20ABI } from "../../web3/abi";
import {
  getNetworkV1TokenAddress,
  getNetworkV2MigratorAddress,
} from "../../web3/getNetworkData";
import { MainState } from "../model/reducer";
import { byDecimals } from "../../utils/bignumber";

interface FetchBalanceProps {
  networkId: number | null;
  address: string | null;
  web3: Web3 | null;
}

export const fetchBalance = createAsync<
  FetchBalanceProps,
  { balance: string; approvedBalance: string } | null,
  Error
>("FETCH_BALANCE", async ({ address, web3, networkId }) => {
  if (!web3 || !address || !networkId) {
    return null;
  }

  const v1Address = getNetworkV1TokenAddress(networkId);
  const migratorAddress = getNetworkV2MigratorAddress(networkId);
  if (!v1Address || !migratorAddress) {
    return null;
  }

  const contract = new web3.eth.Contract(erc20ABI as AbiItem[], v1Address);
  const balance = await contract.methods
    .balanceOf(address)
    .call({ from: address });

  const approvedBalance = await contract.methods
    .allowance(address, migratorAddress)
    .call({ from: address });

  return {
    balance: balance.toString(),
    approvedBalance: approvedBalance.toString(),
  };
});

export function useFetchBalance() {
  const dispatch = useDispatch();
  const { networkId, address, web3, v1Amount, v1Approval, v1AmountPending } =
    useSelector(
      (state: Store) => ({
        networkId: state.common.networkId,
        address: state.common.address,
        web3: state.common.web3,
        v1Amount: state.main.v1Amount,
        v1Approval: state.main.v1Approval,
        v1AmountPending: state.main.v1AmountPending,
      }),
      shallowEqual
    );
  const boundAction = useCallback(
    () => dispatch(fetchBalance({ networkId, address, web3 })),
    [dispatch, networkId, address, web3]
  );

  const v1Balance = useMemo(() => {
    if (!v1Amount) {
      return null;
    }
    return byDecimals(v1Amount, 18);
  }, [v1Amount]);

  const v1ApprovalBalance = useMemo(() => {
    if (!v1Approval) {
      return null;
    }
    return byDecimals(v1Approval, 18);
  }, [v1Approval]);

  return {
    v1Balance,
    v1ApprovalBalance,
    v1BalancePending: v1AmountPending,
    fetchBalance: boundAction,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<MainState>
): ReducerBuilder<MainState> =>
  builder
    .case(fetchBalance.async.started, (state) => ({
      ...state,
      v1AmountPending: true,
    }))
    .case(fetchBalance.async.failed, (state) => ({
      ...state,
      v1AmountPending: false,
    }))
    .case(fetchBalance.async.done, (state, { result }) => ({
      ...state,
      v1Amount: result?.balance || null,
      v1Approval: result?.approvedBalance || null,
      v1AmountPending: false,
    }));
