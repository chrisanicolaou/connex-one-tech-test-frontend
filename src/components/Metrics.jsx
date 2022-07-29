import React, { useState, useEffect } from "react";
import getReq from "../utils/api";
import parsePrometheusTextFormat from "parse-prometheus-text-format";

/* 
Component for fetching and rendering Prometheus Metrics.
I originally didn't plan for both the metrics and time API calls to repeat
every 30 seconds - as a result, I repeated a significant amount of code
to get both components to re-render to a timer, and show the same loading
screen. If I had more time,I would look for a more DRY solution - e.g
wrap both components in a wrapper component that forces a re-render
after a set period of time and displays a suspense/loading screen.
*/
function Metrics() {
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refetchTimer, setRefetchTimer] = useState(0);

  // useEffect that makes the API call
  useEffect(() => {
    refreshMetrics();
    const interval = setInterval(() => {
      setRefetchTimer((currentValue) => currentValue + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isLoading]);

  // useEffect to check the timer and trigger the above
  // useEffect once 30 seconds have passed.
  useEffect(() => {
    if (refetchTimer >= 30) {
      setIsLoading(true);
    }
  }, [refetchTimer]);

  // Async function for making the API call
  const refreshMetrics = async () => {
    const result = await getReq("/metrics");
    setRefetchTimer(0);
    const parsedResult = parsePrometheusTextFormat(result);
    setMetrics(parsedResult);
    setIsLoading(false);
  };

  // Returns "loading" whenever the API call hasn't completed
  if (isLoading)
    return (
      <div className="w-full border-l-4 text-center text-9xl p-10 md:w-1/2">
        Loading...
      </div>
    );

  // Returns the metric whenever the API call is complete
  return (
    <div className="w-full border-l-4 text-center md:w-1/2">
      <ul>
        <p className="text-5xl py-10 pb-20 hover:text-7xl">
          Prometheus Metrics
        </p>
        {metrics.map((metric) => {
          return (
            <li
              key={metric.name}
              className="border-2 border-black p-3 m-5 hover:bg-slate-300"
            >
              <pre>Name: {metric.name}</pre>
              <pre>Help: {metric.help}</pre>
              <pre>Type: {metric.type}</pre>
              <pre>Value: {metric.metrics[0]?.value || "Not available"}</pre>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Metrics;
