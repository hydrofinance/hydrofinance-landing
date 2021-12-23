import { BigNumber } from "bignumber.js";
import { ReducerBuilder } from "typescript-fsa-reducers";
import { createAsync } from "../../utils/reduxCreators";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Store } from "../../utils/rootReducer";
import {
  getNetworkDistributors,
  getNetworkRewardPairs,
} from "../../web3/getNetworkData";
import { MainState } from "../model/reducer";
import { huckleberryClient } from "../../apollo/client";
import { swapsQuery, SwapsQueryResult } from "../../apollo/queries";

export const fetchRewards = createAsync<
  void,
  { rewardsUSDValue: string } | null,
  Error
>("FETCH_REWARDS", async () => {
  const rewardPairAddresses = getNetworkRewardPairs(1285);
  const distributorAddresses = getNetworkDistributors(1285);
  if (!rewardPairAddresses || !distributorAddresses) {
    return null;
  }

  let rewardUsdValue = new BigNumber(0);
  for (let index = 0; index < rewardPairAddresses.length; index++) {
    for (
      let distIndex = 0;
      distIndex < distributorAddresses.length;
      distIndex++
    ) {
      const rewardPairAddress = rewardPairAddresses[index];
      const { data } = await huckleberryClient.query<SwapsQueryResult>({
        query: swapsQuery(
          rewardPairAddress.toLowerCase(),
          distributorAddresses[distIndex].toLowerCase()
        ),
      });

      for (let dataIndex = 0; dataIndex < data.swaps.length; dataIndex++) {
        const dataSwap = data.swaps[dataIndex];
        rewardUsdValue = rewardUsdValue.plus(new BigNumber(dataSwap.amountUSD));
      }
    }
  }

  return {
    rewardsUSDValue: rewardUsdValue.toString(),
  };
});

export function useFetchRewards() {
  const dispatch = useDispatch();
  const { rewardsAmount, rewardsPending, rewardsUSDValue } = useSelector(
    (state: Store) => ({
      networkId: state.common.networkId,
      rewardsAmount: state.main.rewardsAmount,
      rewardsPending: state.main.rewardsPending,
      rewardsUSDValue: state.main.rewardsUSDValue,
    }),
    shallowEqual
  );
  const boundAction = useCallback(() => dispatch(fetchRewards()), [dispatch]);

  return {
    rewardsAmount,
    rewardsUSDValue,
    rewardsPending,
    fetchRewards: boundAction,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<MainState>
): ReducerBuilder<MainState> =>
  builder
    .case(fetchRewards.async.started, (state) => ({
      ...state,
      rewardsPending: true,
    }))
    .case(fetchRewards.async.failed, (state) => ({
      ...state,
      rewardsPending: false,
    }))
    .case(fetchRewards.async.done, (state, { result }) => ({
      ...state,
      rewardsPending: false,
      ...(result || {}),
    }));
