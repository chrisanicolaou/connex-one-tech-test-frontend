import Metrics from "./components/Metrics";
import Time from "./components/Time";

/*
Given the time limitations, I have not repeated what I completed
in the API section of this tech test (implemented a linter, any CI/CD
through GitHub Actions, or any testing). Given more time, these would
have been my priority when setting up the project.
*/
function App() {
  return (
    <div className="flex flex-col md:flex-row">
      <Time />
      <Metrics />
    </div>
  );
}

export default App;
