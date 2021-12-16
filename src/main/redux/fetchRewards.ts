import { BigNumber } from "bignumber.js";
import { ReducerBuilder } from "typescript-fsa-reducers";
import { createAsync } from "../../utils/reduxCreators";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Store } from "../../utils/rootReducer";
import {
  getNetworkDistributor,
  getNetworkRewardPair,
} from "../../web3/getNetworkData";
import { MainState } from "../model/reducer";
import { huckleberryClient } from "../../apollo/client";
import { swapsQuery, SwapsQueryResult } from "../../apollo/queries";

export const fetchRewards = createAsync<
  void,
  { rewardsUSDValue: string; rewardsAmount: string } | null,
  Error
>("FETCH_REWARDS", async () => {
  const rewardPairAddress = getNetworkRewardPair(1285);
  const distributorAddress = getNetworkDistributor(1285);
  if (!rewardPairAddress || !distributorAddress) {
    return null;
  }

  const { data } = await huckleberryClient.query<SwapsQueryResult>({
    query: swapsQuery(
      rewardPairAddress.toLowerCase(),
      distributorAddress.toLowerCase()
    ),
  });

  let rewardUsdValue = new BigNumber(0);
  let rewardAmount = new BigNumber(0);

  data.swaps.forEach((s) => {
    rewardAmount = rewardAmount.plus(new BigNumber(s.amount1Out));
    rewardUsdValue = rewardUsdValue.plus(new BigNumber(s.amountUSD));
  });

  return {
    rewardsUSDValue: rewardUsdValue.toString(),
    rewardsAmount: rewardAmount.toString(),
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
