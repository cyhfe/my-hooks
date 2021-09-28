import { useReducer, useCallback } from "react";
import useSafeDispatch from "../useSafeDispatch";
export function reducer(state: any, action: any) {
  switch (action.type) {
    case "pendding": {
      return {
        ...state,
        status: "pendding",
        error: null,
        data: null,
      };
    }
    case "resolve": {
      return {
        ...state,
        data: action.payload,
        error: null,
        status: "idle",
      };
    }
    case "reject": {
      return {
        ...state,
        error: action.payload,
        status: "idle",
        data: null,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type} `);
    }
  }
}

export default function useAsync(initialState: any) {
  const [state, dispatch] = useReducer(reducer, {
    status: "idle",
    error: null,
    data: null,
    ...initialState,
  });

  const safeDispatch = useSafeDispatch(dispatch);

  const { status, data, error } = state;

  const isIdle = status === "idle";
  const isLoading = status === "pendding";

  const run = useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error("run need promise as params");
      }
      safeDispatch({ type: "pendding" });
      promise.then(
        (data: any) => safeDispatch({ type: "resolve", payload: data }),
        (error: any) => safeDispatch({ type: "reject", payload: error })
      );
    },
    [safeDispatch]
  );

  return {
    status,
    error,
    data,

    isIdle,
    isLoading,

    run,
  };
}
