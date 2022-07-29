import React, { useState, useEffect } from "react";
import getReq from "../utils/api";

function Time() {
  const [serverTime, setServerTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refetchTimer, setRefetchTimer] = useState(0);

  useEffect(() => {
    refreshServerTime();
    const interval = setInterval(() => {
      setRefetchTimer((currentValue) => currentValue + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [serverTime]);

  useEffect(() => {
    if (refetchTimer >= 30) {
      setServerTime(0);
    }
  }, [refetchTimer]);

  const refreshServerTime = async () => {
    setIsLoading(true);
    const result = await getReq("/time");
    setIsLoading(false);
    setRefetchTimer(0);
    setServerTime(result.epoch);
  };

  const formatTimer = (num) => {
    const hours = Math.floor(num / 3600);
    const minutes = Math.floor(num / 3600 / 60);
    const seconds = (num % 3600) % 60;
    const timeArray = [hours, minutes, seconds].map((unitOfTime) => {
      let returnString = unitOfTime.toString();
      if (returnString.length < 2) {
        returnString = `0${returnString}`;
      }
      return returnString;
    });
    return timeArray.join(":");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Server Time: {serverTime}</p>
      <p> Time since refresh: {formatTimer(refetchTimer)}</p>
    </div>
  );
}

export default Time;
