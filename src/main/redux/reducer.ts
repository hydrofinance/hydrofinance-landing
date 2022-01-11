import { reducerWithInitialState } from "typescript-fsa-reducers";
import { builderHandler as claimHandler } from "./fetchClaim";
import { builderHandler as pendingClaimHandler } from "./fetchPendingClaim";
import { builderHandler as isAirdropStartedHandler } from "./fetchIsAirdropStarted";
import { builderHandler as rewardsHandler } from "./fetchRewards";
import { builderHandler as priceHandler } from "./fetchPrice";
import { builderHandler as balanceHandler } from "./fetchBalance";
import { builderHandler as v2MigrateHandler } from "./v2Migrate";
import { MainState } from "../model/reducer";

const initialState: MainState = {
  claimAmount: null,
  h2oPrice: null,
  h2oLPValue: null,
  v1Amount: null,
  v1Approval: null,
  claimAmountPending: false,
  claimingPending: false,
  isAirdropStarted: false,
  isAirdropStartedPending: false,
  rewardsAmount: null,
  rewardsUSDValue: null,
  rewardsPending: false,
  v1AmountPending: false,
  v2MigratePending: false,
  v2MigrateDone: false,
  v2MigrateApprovePending: false,
};

export default reducerWithInitialState(initialState)
  .withHandling(claimHandler)
  .withHandling(pendingClaimHandler)
  .withHandling(isAirdropStartedHandler)
  .withHandling(rewardsHandler)
  .withHandling(priceHandler)
  .withHandling(balanceHandler)
  .withHandling(v2MigrateHandler);
