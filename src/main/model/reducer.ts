export type UserInfo = { amount: string; claimedAmount: string };

export type MainState = {
  claimAmount: UserInfo | null;
  rewards: Rewards | null;
  v1Amount: string | null;
  v1Approval: string | null;
  h2oPrice: string | null;
  h2oLPValue: string | null;
  totalSupply: string | null;
  h2oVolumeDay: string | null;
  h2oVolumeWeek: string | null;
  claimAmountPending: boolean;
  claimingPending: boolean;
  isAirdropStarted: boolean;
  isAirdropStartedPending: boolean;
  rewardsPending: boolean;
  v1AmountPending: boolean;
  v2MigratePending: boolean;
  v2MigrateDone: boolean;
  v2MigrateApprovePending: boolean;
  tokenInfoPending: boolean;
};

export type Reward = {
  tokenName: string;
  value: string;
  address: string;
};

export type Rewards = {
  total: string;
  rewards: Reward[];
};
