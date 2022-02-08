export type LiquidityState = {
  tokens: TokensMap;
  fetchBalancesPending: boolean;
  fetchBalancesDone: boolean;
  fetchApprovalPending: {
    [address: string]: boolean;
  };
  fetchApprovalDone: boolean;
  addLiquidityPending: boolean;
};

export type Token = {
  symbol: string;
  decimals: number;
  address: string;
  balance: string;
  allowance: {
    [address: string]: string;
  };
};

export type TokensMap = { [token: string]: Token };
