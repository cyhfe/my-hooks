# my-hooks

>

[![NPM](https://img.shields.io/npm/v/my-hooks.svg)](https://www.npmjs.com/package/@cyhfe/my-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save my-hooks
```

## Usage

```tsx
import React from "react";

import { useBoolean } from "my-hooks";

const Example = () => {
  const [open, { toggle }] = useBoolean(true);
  return (
    <div>
      <button>toggle</button>
      {open ? "open" : "closed"}
    </div>
  );
};
```

## License

MIT © [cyhfe](https://github.com/cyhfe)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
