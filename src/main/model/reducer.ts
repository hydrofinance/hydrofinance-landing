export type UserInfo = { amount: string; claimedAmount: string };

export type MainState = {
  claimAmount: UserInfo | null;
  rewardsAmount: string | null;
  rewardsUSDValue: string | null;
  v1Amount: string | null;
  v1Approval: string | null;
  h2oPrice: string | null;
  h2oLPValue: string | null;
  claimAmountPending: boolean;
  claimingPending: boolean;
  isAirdropStarted: boolean;
  isAirdropStartedPending: boolean;
  rewardsPending: boolean;
  v1AmountPending: boolean;
  v2MigratePending: boolean;
  v2MigrateDone: boolean;
  v2MigrateApprovePending: boolean;
};
