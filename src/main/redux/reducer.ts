import { reducerWithInitialState } from "typescript-fsa-reducers";
import { builderHandler as claimHandler } from "./fetchClaim";
import { builderHandler as pendingClaimHandler } from "./fetchPendingClaim";
import { builderHandler as isAirdropStartedHandler } from "./fetchIsAirdropStarted";
import { builderHandler as rewardsHandler } from "./fetchRewards";
import { builderHandler as priceHandler } from "./fetchPrice";
import { MainState } from "../model/reducer";

const initialState: MainState = {
  claimAmount: null,
  h2oPrice: null,
  h2oLPValue: null,
  claimAmountPending: false,
  claimingPending: false,
  isAirdropStarted: false,
  isAirdropStartedPending: false,
  rewardsAmount: null,
  rewardsUSDValue: null,
  rewardsPending: false,
};

export default reducerWithInitialState(initialState)
  .withHandling(claimHandler)
  .withHandling(pendingClaimHandler)
  .withHandling(isAirdropStartedHandler)
  .withHandling(rewardsHandler)
  .withHandling(priceHandler);
