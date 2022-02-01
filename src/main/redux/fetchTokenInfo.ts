import { ReducerBuilder } from "typescript-fsa-reducers";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import { createAsync } from "../../utils/reduxCreators";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Store } from "../../utils/rootReducer";
import { erc20ABI } from "../../web3/abi";
import { getNetworkV2TokenAddress } from "../../web3/getNetworkData";
import { MainState } from "../model/reducer";
import { byDecimals } from "../../utils/bignumber";
import { createEthersProvider } from "../../web3/networkSetup";

export const fetchTokenInfo = createAsync<
  void,
  { totalSupply: string | null },
  Error
>("FETCH_TOKEN_INFO", async () => {
  const result = { totalSupply: null as string | null };

  const provider = createEthersProvider(1285);

  const hydroAddress = getNetworkV2TokenAddress(1285);
  if (!hydroAddress) {
    return result;
  }

  const hydro = new ethers.Contract(hydroAddress, erc20ABI, provider);
  const totalSupply = await hydro.totalSupply();

  result.totalSupply = totalSupply.toString();
  return result;
});

export function useFetchTokenInfo() {
  const dispatch = useDispatch();
  const { totalSupply, tokenInfoPending } = useSelector(
    (state: Store) => ({
      totalSupply: state.main.totalSupply,
      tokenInfoPending: state.main.tokenInfoPending,
    }),
    shallowEqual
  );
  const boundAction = useCallback(() => dispatch(fetchTokenInfo()), [dispatch]);

  const burnedAmount = useMemo(() => {
    if (!totalSupply) {
      return null;
    }
    const burned = new BigNumber(10)
      .pow(18 + 9)
      .minus(new BigNumber(totalSupply));
    return byDecimals(burned, 18, 0);
  }, [totalSupply]);

  return {
    burnedAmount,
    tokenInfoPending,
    fetchTokenInfo: boundAction,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<MainState>
): ReducerBuilder<MainState> =>
  builder
    .case(fetchTokenInfo.async.started, (state) => ({
      ...state,
      tokenInfoPending: true,
    }))
    .case(fetchTokenInfo.async.failed, (state) => ({
      ...state,
      tokenInfoPending: false,
    }))
    .case(fetchTokenInfo.async.done, (state, { result }) => ({
      ...state,
      totalSupply: result.totalSupply,
      tokenInfoPending: false,
    }));
