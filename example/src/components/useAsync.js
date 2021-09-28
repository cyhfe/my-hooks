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
