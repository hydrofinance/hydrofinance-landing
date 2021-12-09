import { reducerWithInitialState } from "typescript-fsa-reducers";
import { builderHandler as claimHandler } from "./fetchClaim";
import { builderHandler as pendingClaimHandler } from "./fetchPendingClaim";
import { builderHandler as isAirdropStartedHandler } from "./fetchIsAirdropStarted";
import { MainState } from "../model/reducer";

const initialState: MainState = {
  claimAmount: null,
  claimAmountPending: false,
  claimingPending: false,
  isAirdropStarted: false,
  isAirdropStartedPending: false,
};

export default reducerWithInitialState(initialState)
  .withHandling(claimHandler)
  .withHandling(pendingClaimHandler)
  .withHandling(isAirdropStartedHandler);
