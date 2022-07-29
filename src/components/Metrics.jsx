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

  if (isLoading) return <div className="w-1/2 border-l-4">Loading...</div>;

  return (
    <div className="w-1/2 border-l-4">
      <ul>
        Prometheus Metrics
        {metrics.map((metric) => {
          return (
            <li key={metric.name}>
              <p>Name: {metric.name}</p>
              <p>Help: {metric.help}</p>
              <p>Type: {metric.type}</p>
              <p>Value: {metric.metrics[0]?.value || "Not available"}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Metrics;
