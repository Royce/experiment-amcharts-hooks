import React, { useCallback, useEffect, useState } from "react";

function Graph(props) {
  const [graphLoaded, setGraphLoaded] = useState(false);

  // load graph
  // https://medium.com/swlh/how-to-use-amcharts-4-with-react-hooks-999a62c185a5

  const showNoData = !props.loading && props.data.length === 0;
  const showGraph = !props.loading && props.data.length > 0 && graphLoaded;
  const showLoading = props.loading || (props.data.length > 0 && !graphLoaded);

  return (
    <div>
      {showLoading && <div>SPINNER</div>}
      {showNoData && <div>NO DATA</div>}

      <div id={props.id}></div>
    </div>
  );
}

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    setTimeout(() => setData([]), 1000);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Graph loading={!data} data={data} />
      </header>
    </div>
  );
}

export default App;
