# my-hooks

> 

[![NPM](https://img.shields.io/npm/v/my-hooks.svg)](https://www.npmjs.com/package/my-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save my-hooks
```

## Usage

```tsx
import * as React from 'react'

import { useMyHook } from 'my-hooks'

const Example = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
```

## License

MIT © [cyhfe](https://github.com/cyhfe)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
