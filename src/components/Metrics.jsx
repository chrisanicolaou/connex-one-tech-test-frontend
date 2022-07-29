import React, { useState, useEffect } from "react";
import getReq from "../utils/api";
import parsePrometheusTextFormat from "parse-prometheus-text-format";

function Metrics() {
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refetchTimer, setRefetchTimer] = useState(0);

  useEffect(() => {
    ("Fecthing metrics");
    refreshMetrics();
    const interval = setInterval(() => {
      setRefetchTimer((currentValue) => currentValue + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (refetchTimer >= 30) {
      setIsLoading(true);
    }
  }, [refetchTimer]);

  const refreshMetrics = async () => {
    const result = await getReq("/metrics");
    setRefetchTimer(0);
    const parsedResult = parsePrometheusTextFormat(result);
    setMetrics(parsedResult);
    setIsLoading(false);
  };

  if (isLoading)
    return (
      <div className="w-full border-l-4 text-center text-9xl p-10 md:w-1/2">
        Loading...
      </div>
    );

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
