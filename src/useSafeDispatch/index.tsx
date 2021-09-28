import { useCallback, useLayoutEffect, useRef } from "react";

export default function useSafeDispatch(dispatch: any) {
  const mountedRef = useRef(false);
  useLayoutEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const safeDispatch = useCallback(
    (...arg: any) => {
      mountedRef.current ? dispatch(...arg) : void 0;
    },
    [dispatch]
  );

  return safeDispatch;
}
