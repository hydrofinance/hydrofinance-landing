import gql from "graphql-tag";

export type PairQueryResult = {
  pair: {
    token0: {
      symbol: string;
      tokenDayData: {
        priceUSD: string;
        dailyVolumeUSD: string;
      }[];
    };
    token1: {
      symbol: string;
      tokenDayData: {
        priceUSD: string;
        dailyVolumeUSD: string;
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
          tokenDayData(orderBy: date, orderDirection: desc, first:7) {
            priceUSD,
            dailyVolumeUSD
          }
        }
        token1 {
          symbol
          tokenDayData(orderBy: date, orderDirection: desc, first:7) {
            priceUSD,
            dailyVolumeUSD
          }
        }
        reserve0
        reserve1
      }
    }
`;
  return gql(queryString);
};
