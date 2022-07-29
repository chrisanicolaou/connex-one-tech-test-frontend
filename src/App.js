import Metrics from "./components/Metrics";
import Time from "./components/Time";

function App() {
  return (
    <div className="flex flex-col md:flex-row">
      <Time />
      <Metrics />
    </div>
  );
}

export default App;
