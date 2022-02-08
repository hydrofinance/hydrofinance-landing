import { BigNumber } from "bignumber.js";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { ReducerBuilder } from "typescript-fsa-reducers";
import { thunkToAction } from "typescript-fsa-redux-thunk";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { showSnackbar } from "../../common/redux/snackbar";
import { convertAmountToRawNumber } from "../../utils/bignumber";
import { createAsync } from "../../utils/reduxCreators";
import { Store } from "../../utils/rootReducer";
import { hydroRouterABI } from "../../web3/abi";
import { getHydroRouter } from "../../web3/getNetworkData";
import { LiquidityState } from "../model/reducer";

type BaseAddLiquidityProps = {
  hydroAmount: BigNumber;
  finnAmount: BigNumber;
};

interface AddLiquidityProps extends BaseAddLiquidityProps {
  address: string | null;
  web3: Web3 | null;
  networkId: number | null;
}

async function addLiquidityPromise(props: {
  web3: Web3;
  address: string;
  routerAddress: string;
  hydroAmount: BigNumber;
  finnAmount: BigNumber;
  dispatch: Dispatch;
}): Promise<void> {
  const { web3, address, routerAddress, hydroAmount, finnAmount, dispatch } =
    props;

  return new Promise<void>((resolve, reject) => {
    const contract = new web3.eth.Contract(
      hydroRouterABI as AbiItem[],
      routerAddress
    );

    contract.methods
      .addLiquidity(
        convertAmountToRawNumber(hydroAmount),
        convertAmountToRawNumber(finnAmount),
        0,
        0,
        address
      )
      .send({ from: address })
      .on("transactionHash", (hash: string) => {
        dispatch(showSnackbar({ message: hash, type: "success" }));
      })
      .on("receipt", function () {
        resolve();
      })
      .on("error", function (error: Error) {
        reject(error);
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
}

export const addLiquidity = createAsync<AddLiquidityProps, void, Error>(
  "ADD_LIQUIDITY",
  async (
    { address, web3, networkId, hydroAmount, finnAmount },
    dispatch,
    _1
  ) => {
    if (!web3 || !address || !networkId) {
      return;
    }

    const routerAddress = getHydroRouter(networkId);
    if (!routerAddress) {
      return;
    }

    await addLiquidityPromise({
      web3,
      address,
      routerAddress,
      hydroAmount,
      finnAmount,
      dispatch,
    });
  }
);

export function useAddLiquidity() {
  const dispatch = useDispatch();

  const { addLiquidityPending } = useSelector((state: Store) => ({
    addLiquidityPending: state.liquidity.addLiquidityPending,
  }));
  const { web3, address, networkId } = useSelector((state: Store) => ({
    web3: state.common.web3,
    address: state.common.address,
    networkId: state.common.networkId,
  }));

  const boundAction = useCallback(
    (data: BaseAddLiquidityProps) => {
      return dispatch(
        thunkToAction(addLiquidity as any)({
          ...data,
          web3,
          address,
          networkId,
        })
      );
    },
    [dispatch, web3, address, networkId]
  );

  return {
    addLiquidity: boundAction,
    addLiquidityPending,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<LiquidityState>
): ReducerBuilder<LiquidityState> =>
  builder
    .case(addLiquidity.async.started, (state) => ({
      ...state,
      addLiquidityPending: true,
    }))
    .case(addLiquidity.async.failed, (state) => ({
      ...state,
      addLiquidityPending: false,
    }))
    .case(addLiquidity.async.done, (state) => ({
      ...state,
      addLiquidityPending: false,
    }));
