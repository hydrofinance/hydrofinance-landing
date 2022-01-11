import { BigNumber } from "bignumber.js";
import { ReducerBuilder } from "typescript-fsa-reducers";
import { AbiItem } from "web3-utils";
import { AnyAction } from "redux";
import { createAsync } from "../../utils/reduxCreators";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Store } from "../../utils/rootReducer";
import Web3 from "web3";
import { erc20ABI, v2MigratorABI } from "../../web3/abi";
import {
  getNetworkV1TokenAddress,
  getNetworkV2MigratorAddress,
} from "../../web3/getNetworkData";
import { MainState } from "../model/reducer";
import { ThunkDispatch } from "redux-thunk";
import { showSnackbar } from "../../common/redux/snackbar";
import { thunkToAction } from "typescript-fsa-redux-thunk";

const approvaAllAmount = Web3.utils.toWei("10000000000000", "ether");

const v2MigrateAllPromise = (
  contract: any,
  address: string,
  dispatch: ThunkDispatch<Store, unknown, AnyAction>
) =>
  new Promise<void>((resolve, reject) => {
    contract.methods
      .migrateAll()
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

const approveMigratePromise = (
  contract: any,
  spender: string,
  amount: BigNumber,
  address: string,
  dispatch: ThunkDispatch<Store, unknown, AnyAction>
) =>
  new Promise<void>((resolve, reject) => {
    contract.methods
      .approve(spender, amount)
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

interface V2MigrateProps {
  networkId: number | null;
  address: string | null;
  web3: Web3 | null;
}

export const v2Migrate = createAsync<V2MigrateProps, void, Error>(
  "V2_MIGRATE",
  async ({ address, web3, networkId }, dispatch) => {
    if (!web3 || !address || !networkId) {
      return null;
    }

    const v2MigratorAddress = getNetworkV2MigratorAddress(networkId);
    if (!v2MigratorAddress) {
      return null;
    }

    const contract = new web3.eth.Contract(
      v2MigratorABI as AbiItem[],
      v2MigratorAddress
    );

    await v2MigrateAllPromise(contract, address, dispatch);
  }
);

export const v2ApproveMigrate = createAsync<V2MigrateProps, void, Error>(
  "V2_APPROVE_MIGRATE",
  async ({ address, web3, networkId }, dispatch) => {
    if (!web3 || !address || !networkId) {
      return null;
    }

    const v1TokenAddress = getNetworkV1TokenAddress(networkId);
    const v2MigratorAddress = getNetworkV2MigratorAddress(networkId);
    if (!v2MigratorAddress || !v1TokenAddress) {
      return null;
    }

    const contract = new web3.eth.Contract(
      erc20ABI as AbiItem[],
      v1TokenAddress
    );

    await approveMigratePromise(
      contract,
      v2MigratorAddress,
      new BigNumber(approvaAllAmount),
      address,
      dispatch
    );
  }
);

export function useV2Migrate() {
  const dispatch = useDispatch();
  const {
    networkId,
    address,
    web3,
    migratePending,
    migrateDone,
    approvePending,
  } = useSelector(
    (state: Store) => ({
      networkId: state.common.networkId,
      address: state.common.address,
      web3: state.common.web3,
      migratePending: state.main.v2MigratePending,
      migrateDone: state.main.v2MigrateDone,
      approvePending: state.main.v2MigrateApprovePending,
    }),
    shallowEqual
  );
  const boundAction = useCallback(
    () =>
      dispatch(thunkToAction(v2Migrate as any)({ networkId, address, web3 })),
    [dispatch, networkId, address, web3]
  );

  const bound2Action = useCallback(
    () =>
      dispatch(
        thunkToAction(v2ApproveMigrate as any)({ networkId, address, web3 })
      ),
    [dispatch, networkId, address, web3]
  );

  return {
    migratePending,
    migrateDone,
    approvePending,
    migrate: boundAction,
    approve: bound2Action,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<MainState>
): ReducerBuilder<MainState> =>
  builder
    .case(v2Migrate.async.started, (state) => ({
      ...state,
      v2MigratePending: true,
    }))
    .case(v2Migrate.async.failed, (state) => ({
      ...state,
      v2MigratePending: false,
    }))
    .case(v2Migrate.async.done, (state) => ({
      ...state,
      v2MigratePending: false,
      v2MigrateDone: true,
    }))
    .case(v2ApproveMigrate.async.started, (state) => ({
      ...state,
      v2MigrateApprovePending: true,
    }))
    .case(v2ApproveMigrate.async.failed, (state) => ({
      ...state,
      v2MigrateApprovePending: false,
    }))
    .case(v2ApproveMigrate.async.done, (state) => ({
      ...state,
      v2MigrateApprovePending: false,
      v1Approval: approvaAllAmount
    }));
