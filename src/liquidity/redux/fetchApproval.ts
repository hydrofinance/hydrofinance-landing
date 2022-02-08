import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReducerBuilder } from "typescript-fsa-reducers";
import { thunkToAction } from "typescript-fsa-redux-thunk";
import Web3 from "web3";
import { createAsync } from "../../utils/reduxCreators";
import { Store } from "../../utils/rootReducer";
import { approval } from "../../web3/approval";
import { getHydroRouter } from "../../web3/getNetworkData";
import { LiquidityState } from "../model/reducer";

type BaseFetchApprovalProps = {
  tokenAddress: string;
};

interface FetchApprovalProps extends BaseFetchApprovalProps {
  address: string | null;
  web3: Web3 | null;
  contractAddress: string | null;
}

export const fetchApproval = createAsync<FetchApprovalProps, string, Error>(
  "FETCH_APPROVAL",
  async ({ address, web3, tokenAddress, contractAddress }, dispatch, _1) => {
    if (!web3 || !address || !contractAddress) {
      return;
    }
    const result = await approval({
      web3,
      address,
      tokenAddress,
      contractAddress,
      dispatch,
    });
    return result as any;
  }
);

export function useFetchApproval() {
  const dispatch = useDispatch();

  const { fetchApprovalPending } = useSelector((state: Store) => ({
    fetchApprovalPending: state.liquidity.fetchApprovalPending,
  }));
  const { web3, address, networkId } = useSelector((state: Store) => ({
    web3: state.common.web3,
    address: state.common.address,
    networkId: state.common.networkId,
  }));

  const boundAction = useCallback(
    (data: BaseFetchApprovalProps) => {
      const routerAddress = getHydroRouter(networkId || 0);
      return dispatch(
        thunkToAction(fetchApproval as any)({
          ...data,
          web3,
          address,
          contractAddress: routerAddress,
        })
      );
    },
    [dispatch, web3, address, networkId]
  );

  return {
    fetchApproval: boundAction,
    fetchApprovalPending,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<LiquidityState>
): ReducerBuilder<LiquidityState> =>
  builder
    .case(fetchApproval.async.started, (state, { tokenAddress }) => ({
      ...state,
      fetchApprovalPending: {
        ...state.fetchApprovalPending,
        [tokenAddress]: true,
      },
    }))
    .case(
      fetchApproval.async.failed,
      (state, { params: { tokenAddress } }) => ({
        ...state,
        fetchApprovalPending: {
          ...state.fetchApprovalPending,
          [tokenAddress]: false,
        },
      })
    )
    .case(
      fetchApproval.async.done,
      (state, { params: { tokenAddress, contractAddress }, result }) => {
        const { tokens } = state;
        if (contractAddress) {
          tokens[tokenAddress].allowance[contractAddress] = result;
        }
        return {
          ...state,
          tokens,
          fetchApprovalPending: {
            ...state.fetchApprovalPending,
            [tokenAddress]: false,
          },
        };
      }
    );
