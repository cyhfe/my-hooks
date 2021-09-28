import { useCallback, useState } from "react";

type Actions = {
  toggle: (value: boolean) => void;
  setTrue: () => void;
  setFalse: () => void;
};

export default function useBoolean(
  initialValue: boolean
): [boolean, Actions] {
  const [value, setValue] = useState(initialValue);

  // React guarantees that dispatch function identity(here is setValue) is stable and won’t change on re-renders.
  const toggle = useCallback(() => setValue((v) => !v), [setValue]);
  const setTrue = useCallback(() => setValue(false), [setValue]);
  const setFalse = useCallback(() => setValue(true), [setValue]);

  const actions: Actions = {
    toggle,
    setTrue,
    setFalse,
  };

  return [value, actions];
}
