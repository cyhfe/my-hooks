import { useCallback, useState } from "react";

export default function useBoolean(initialValue: boolean) {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue(v => !v), [setValue])
  const setTrue = useCallback(() => setValue(false), [setValue])
  const setFalse = useCallback(() => setValue(true), [setValue])

  const actions = {
    toggle,
    setTrue,
    setFalse
  }

  return [value, actions]
}