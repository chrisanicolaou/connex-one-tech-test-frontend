import React, { useState, useEffect } from "react";
import getReq from "../utils/api";

/* 
Component for fetching and rendering the server Epoch time
and the elapsed time since the last call. I'm sure there is a cleaner
way to make repeat API calls without repeat useEffects, but
this solution works and was the quickest I could figure out how to
implement in the time constraint.
*/
function Time() {
  const [serverTime, setServerTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refetchTimer, setRefetchTimer] = useState(0);

  // useEffect that makes the API call
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
    return (
      <div className="w-full border-r-4 text-center text-9xl p-10 md:w-1/2">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full border-r-4 text-center md:w-1/2">
      <p className="text-5xl py-10 pb-20 hover:text-7xl">Timer</p>
      <p className="text-2xl pb-10 hover:text-3xl">Server Time: {serverTime}</p>
      <p className="text-2xl pb-10 hover:text-3xl">
        Time since refresh: {formatTimer(refetchTimer)}
      </p>
    </div>
  );
}

export default Time;
