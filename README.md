my-hooks
==============================

[![NPM](https://img.shields.io/npm/v/@cyhfe/my-hooks.svg)](https://www.npmjs.com/package/@cyhfe/my-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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


## useBoolean

**hook**

```tsx
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
## License

MIT © [cyhfe](https://github.com/cyhfe)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
