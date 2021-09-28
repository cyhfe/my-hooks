import React, { useEffect, useState } from "react";

// import { useBoolean } from "my-hooks";

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

  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  useEffect(() => {
    setStatus("loading");
    request(state).then(
      (data) => {
        setData(data);
        setStatus("success");
      },
      (err) => {
        setError(err);
        setStatus("error");
      }
    );
  }, [state]);

  const renderContent = () => {
    if (status === "idle") {
      return <div>idle</div>;
    }
    if (status === "loading") {
      return <div>loading...</div>;
    }
    if (status === "error") {
      return <div>{error}</div>;
    }
    if (status === "success") {
      return <div>{data}</div>;
    }
  };

  return (
    <div>
      <button onClick={() => setState(true)}>loadSuccess</button>
      <button onClick={() => setState(false)}>loadFail</button>
      {renderContent()}
    </div>
  );
};

export default UseAsync;
