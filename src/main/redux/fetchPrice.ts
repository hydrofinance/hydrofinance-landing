import { BigNumber } from "bignumber.js";
import { ReducerBuilder } from "typescript-fsa-reducers";
import { createAsync } from "../../utils/reduxCreators";
import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Store } from "../../utils/rootReducer";
import { getNetworkPair } from "../../web3/getNetworkData";
import { MainState } from "../model/reducer";
import { huckleberryClient } from "../../apollo/client";
import { pairQuery, PairQueryResult } from "../../apollo/queries";

export const fetchPrice = createAsync<
  void,
  {
    h2oPrice: string;
    h2oLPValue: string;
    h2oVolumeDay: string;
    h2oVolumeWeek: string;
  } | null,
  Error
>("FETCH_PRICE", async () => {
  const pairAddress = getNetworkPair(1285);
  if (!pairAddress) {
    return null;
  }

  const { data } = await huckleberryClient.query<PairQueryResult>({
    query: pairQuery(pairAddress.toLowerCase()),
  });

  if (!data || !data.pair) {
    return null;
  }

  const tokenDayData =
    data.pair.token0.symbol === "HYDRO"
      ? data.pair.token0.tokenDayData
      : data.pair.token1.tokenDayData;

  const h2oPrice = new BigNumber(tokenDayData[0].priceUSD);
  const h2oVolumeDay = tokenDayData[0].dailyVolumeUSD;
  const h2oVolumeWeek = tokenDayData
    .reduce(
      (prev, currentValue) =>
        prev.plus(new BigNumber(currentValue.dailyVolumeUSD)),
      new BigNumber(0)
    )
    .toString();

  const h2oReserve = new BigNumber(
    data.pair.token0.symbol === "HYDRO"
      ? data.pair.reserve0
      : data.pair.reserve1
  );

  const lpValue = h2oPrice.multipliedBy(h2oReserve).multipliedBy(2);
  return {
    h2oPrice: h2oPrice.toString(),
    h2oLPValue: lpValue.toString(),
    h2oVolumeDay,
    h2oVolumeWeek,
  };
});

export function useFetchPrice() {
  const dispatch = useDispatch();
  const { h2oPrice, h2oLPValue, h2oVolumeDay, h2oVolumeWeek } = useSelector(
    (state: Store) => ({
      h2oPrice: state.main.h2oPrice,
      h2oLPValue: state.main.h2oLPValue,
      h2oVolumeDay: state.main.h2oVolumeDay,
      h2oVolumeWeek: state.main.h2oVolumeWeek,
    }),
    shallowEqual
  );
  const boundAction = useCallback(() => dispatch(fetchPrice()), [dispatch]);

  return {
    h2oPrice,
    h2oLPValue,
    h2oVolumeDay,
    h2oVolumeWeek,
    fetchPrice: boundAction,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<MainState>
): ReducerBuilder<MainState> =>
  builder.case(fetchPrice.async.done, (state, { result }) => {
    if (!result) {
      return state;
    }
    return {
      ...state,
      ...result,
    };
  });
