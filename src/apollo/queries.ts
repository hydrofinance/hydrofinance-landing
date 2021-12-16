import gql from "graphql-tag";

export type SwapsQueryResult = {
  swaps: {
    timestamp: string;
    amount1Out: string;
    amountUSD: string;
  }[];
};

export const swapsQuery = (pair: string, to: string) => {
  const queryString = `
    query swaps {
      swaps(orderBy: timestamp, orderDirection: desc, where: {pair: "${pair}", to:"${to}" }) {
        timestamp
        amount1Out
        amountUSD
      }
    }
`;
  return gql(queryString);
};

export type PairQueryResult = {
  pair: {
    token0: {
      symbol: string;
      tokenDayData: {
        priceUSD: string;
      }[];
    };
    token1: {
      symbol: string;
      tokenDayData: {
        priceUSD: string;
      }[];
    };
    reserve0: string;
    reserve1: string;
  };
};

export const pairQuery = (pair: string) => {
  const queryString = `
    query pair {
      pair(id: "${pair}") {
        token0 {
          symbol
          tokenDayData(orderBy: date, orderDirection: desc, first:1) {
            priceUSD
          }
        }
        token1 {
          symbol
          tokenDayData(orderBy: date, orderDirection: desc, first:1) {
            priceUSD
          }
        }
        reserve0
        reserve1
      }
    }
`;
  return gql(queryString);
};
