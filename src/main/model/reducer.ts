export type UserInfo = { amount: string; claimedAmount: string };

export type MainState = {
  claimAmount: UserInfo | null;
  claimAmountPending: boolean;
  claimingPending: boolean;
  isAirdropStarted: boolean;
  isAirdropStartedPending: boolean;
};
