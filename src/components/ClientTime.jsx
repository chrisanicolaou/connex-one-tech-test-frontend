import React, { useState, useEffect } from "react";

function ClientTime({ serverTime }) {
  const [clientTime, setClientTime] = useState(0);

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setClientTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  });

  const formatTime = (num) => {
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

  return <div>ClientTime: {formatTime(clientTime)}</div>;
}

export default ClientTime;
