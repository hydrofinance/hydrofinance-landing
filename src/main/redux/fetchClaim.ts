import { ThunkDispatch } from "redux-thunk";
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
import { AnyAction } from "redux";
import { showSnackbar } from "../../common/redux/snackbar";
import { thunkToAction } from "typescript-fsa-redux-thunk";

const fetchClaimPromise = (
  contract: any,
  address: string,
  dispatch: ThunkDispatch<Store, unknown, AnyAction>
) =>
  new Promise<void>((resolve, reject) => {
    contract.methods
      .claimAll()
      .send({ from: address })
      .on("transactionHash", function (hash: string) {
        console.log(hash);
        dispatch(
          showSnackbar({ message: `Sent transaction: ${hash}`, type: "info" })
        );
      })
      .on("receipt", function (receipt: string) {
        console.log(receipt);
        resolve();
      })
      .on("error", function (error: Error) {
        console.log(error);
        reject(error);
      })
      .catch((error: Error) => {
        console.log(error);
        reject(error);
      });
  });

interface FetchClaimProps {
  networkId: number | null;
  address: string | null;
  web3: Web3 | null;
}

export const fetchClaim = createAsync<FetchClaimProps, void, Error>(
  "FETCH_CLAIM",
  async ({ address, web3, networkId }, dispatch) => {
    if (!web3 || !address || !networkId) {
      return null;
    }

    const airdropAddress = getNetworkAirdropAddress(networkId);
    if (!airdropAddress) {
      return null;
    }

    const contract = new web3.eth.Contract(
      airdropABI as AbiItem[],
      airdropAddress
    );

    await fetchClaimPromise(contract, address, dispatch);
  }
);

export function useFetchClaim() {
  const dispatch = useDispatch();
  const { networkId, address, web3, claimingPending } = useSelector(
    (state: Store) => ({
      networkId: state.common.networkId,
      address: state.common.address,
      web3: state.common.web3,
      claimingPending: state.main.claimingPending,
    }),
    shallowEqual
  );
  const boundAction = useCallback(
    () =>
      dispatch(thunkToAction(fetchClaim as any)({ networkId, address, web3 })),
    [dispatch, networkId, address, web3]
  );

  return {
    claimingPending,
    fetchPendingClaim: boundAction,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<MainState>
): ReducerBuilder<MainState> =>
  builder
    .case(fetchClaim.async.started, (state) => ({
      ...state,
      claimingPending: true,
    }))
    .case(fetchClaim.async.failed, (state) => ({
      ...state,
      claimingPending: false,
    }))
    .case(fetchClaim.async.done, (state) => ({
      ...state,
      claimingPending: false,
      claimAmount: {
        amount: state.claimAmount?.amount || "0",
        claimedAmount: state.claimAmount?.amount || "0",
      },
    }));
