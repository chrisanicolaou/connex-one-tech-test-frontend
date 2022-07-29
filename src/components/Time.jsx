import React, { useState, useEffect } from "react";
import getReq from "../utils/api";
import ClientTime from "./ClientTime";

function Time() {
  const [serverTime, setServerTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const asyncUseEffect = async () => {
      const result = await getReq("/time");
      setIsLoading(false);
      setServerTime(result.epoch);
    };
    asyncUseEffect();
  }, [isLoading, serverTime]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Server Time: {serverTime}</p>
      <ClientTime serverTime={serverTime} />
    </div>
  );
}

export default Time;
