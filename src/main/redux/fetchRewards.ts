import { ReducerBuilder } from "typescript-fsa-reducers";
import { createAsync } from "../../utils/reduxCreators";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Store } from "../../utils/rootReducer";
import { MainState, Rewards } from "../model/reducer";
import { API } from "../../utils/api";

export const fetchRewards = createAsync<void, Rewards, Error>(
  "FETCH_REWARDS",
  async () => {
    const result = await API.get<Rewards>("/rewards/1285");
    return result.data;
  }
);

export function useFetchRewards() {
  const dispatch = useDispatch();
  const { rewards, rewardsPending } = useSelector(
    (state: Store) => ({
      networkId: state.common.networkId,
      rewards: state.main.rewards,
      rewardsPending: state.main.rewardsPending,
    }),
    shallowEqual
  );
  const boundAction = useCallback(() => dispatch(fetchRewards()), [dispatch]);

  return {
    rewards,
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
      rewards: result,
    }));
