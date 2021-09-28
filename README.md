# my-hooks

[![NPM](https://img.shields.io/npm/v/@cyhfe/my-hooks.svg)](https://www.npmjs.com/package/@cyhfe/my-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[Demo](https://cyhfe.github.io/my-hooks/)

## Install

```bash
npm install --save @cyhfe/my-hooks
```

## Usage

```tsx
import React from "react";

import { useBoolean } from "@cyhfe/my-hooks";

const Example = () => {
  const [open, { toggle }] = useBoolean(true);
  return (
    <div>
      <button onClick={toggle}>toggle</button>
      {open ? "open" : "closed"}
    </div>
  );
};
```

# hooks

- [useBoolean](#useboolean)
- [useAsync](#useasync)
- [useSafeDispatch](#usesafedispatch)

## useBoolean

**hook**

```tsx
import { useCallback, useState } from "react";

type Actions = {
  toggle: (value: boolean) => void;
  setTrue: () => void;
  setFalse: () => void;
};

export default function useBoolean(initialValue: boolean): [boolean, Actions] {
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
```

**usage**

```tsx
import React from "react";

import { useBoolean } from "@cyhfe/my-hooks";

const Example = () => {
  const [open, { toggle }] = useBoolean(true);
  return (
    <div>
      <button onClick={toggle}>toggle</button>
      {open ? "open" : "closed"}
    </div>
  );
};
```

## useAsync

**hook**

```tsx
import { useReducer, useCallback } from "react";
import useSafeDispatch from "@cyhfe/my-hooks";
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
```

**usage**

```tsx
import React, { useEffect, useState } from "react";

import { useAsync } from "my-hooks";

const request = (state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      !!state
        ? resolve("Submitted successfully 🙌")
        : reject("Oh no there was an error 😞");
    }, 1000);
  });
};

const UseAsync = () => {
  const [state, setState] = useState(true);

  const { isLoading, data, error, run } = useAsync();

  useEffect(() => {
    run(request(state));
  }, [state, run]);

  const renderContent = () => {
    if (isLoading) {
      return <div>loading...</div>;
    }
    if (error) {
      return <div>{JSON.stringify(error)}</div>;
    }
    if (data) return <div>{JSON.stringify(data)}</div>;
  };
  return (
    <div>
      <button onClick={() => setState(true)}>loadSuccess</button>
      <button onClick={() => setState(false)}>loadFail</button>
      {renderContent()}
    </div>
  );
};

const Demo = () => {
  const [show, setShow] = useState(true);
  if (!show) return <div>unmount</div>;
  return (
    <div>
      <button onClick={() => setShow(false)}>unmount</button>
      <UseAsync />
    </div>
  );
};

export default Demo;
```

## useSafeDispatch

**hook**

```tsx
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
```

## License

MIT © [cyhfe](https://github.com/cyhfe)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
