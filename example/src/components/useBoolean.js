import React from "react";

import { useBoolean } from "my-hooks";

const UseBoolean = () => {
  const [open, { toggle }] = useBoolean(true);
  return (
    <div>
      <button onClick={toggle}>toggle</button>
      {open ? "open" : "closed"}
    </div>
  );
};

export default UseBoolean;
