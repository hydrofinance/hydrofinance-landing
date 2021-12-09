import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ReducerBuilder } from "typescript-fsa-reducers";
import { create } from "../../utils/reduxCreators";
import { Store } from "../../utils/rootReducer";
import { CommonState, SnackbarInfo } from "../model/reducer";

export const showSnackbar = create<SnackbarInfo>("SHOW_SNACKBAR");
export const hideSnackbar = create("HIDE_SNACKBAR");

export function useSnackbar() {
  const dispatch = useDispatch();
  const { snackbar } = useSelector(
    (state: Store) => ({
      snackbar: state.common.snackbar,
    }),
    shallowEqual
  );
  const boundAction = useCallback(
    (snackbar: SnackbarInfo) => dispatch(showSnackbar(snackbar)),
    [dispatch]
  );
  const boundAction2 = useCallback(() => dispatch(hideSnackbar()), [dispatch]);

  return {
    snackbar,
    showSnackbar: boundAction,
    hideSnackbar: boundAction2,
  };
}

export const builderHandler = (
  builder: ReducerBuilder<CommonState>
): ReducerBuilder<CommonState> =>
  builder
    .case(showSnackbar, (state, params) => ({
      ...state,
      snackbar: params,
    }))
    .case(hideSnackbar, (state) => ({
      ...state,
      snackbar: null,
    }));
