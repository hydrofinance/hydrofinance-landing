export type UserInfo = { amount: string; claimedAmount: string };

export type MainState = {
  claimAmount: UserInfo | null;
  rewardsAmount: string | null;
  rewardsUSDValue: string | null;
  h2oPrice: string | null;
  h2oLPValue: string | null;
  claimAmountPending: boolean;
  claimingPending: boolean;
  isAirdropStarted: boolean;
  isAirdropStartedPending: boolean;
  rewardsPending: boolean;
};
