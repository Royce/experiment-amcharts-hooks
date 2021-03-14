import React, { useEffect, useRef, useState } from "react";
import { createChart } from "./createChart";
import { data1 } from "./data";

function Graph(props) {
  const chartRef = useRef();
  const [graphLoaded, setGraphLoaded] = useState(false);

  React.useEffect(() => {
    chartRef.current = createChart(props.data, { id: props.id }, () =>
      setGraphLoaded(true)
    );

    return () => {
      chartRef.current && chartRef.current.dispose();
    };
    // Eslint reason: Intention is too run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (chartRef.current) chartRef.current.data = props.data;
  }, [chartRef, props.data]);

  const showNoData = !props.loading && props.data.length === 0;
  const showGraph = !props.loading && props.data.length > 0 && graphLoaded;
  const showLoading = props.loading || (props.data.length > 0 && !graphLoaded);

  return (
    <div>
      {showLoading && <div>SPINNER</div>}
      {showNoData && <div>NO DATA</div>}

      <div
        id={props.id}
        style={{ visibility: showGraph ? "visible" : "hidden" }}
      ></div>
    </div>
  );
}

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    setTimeout(() => setData((x) => ({ 0: [], ...x })), 1000);
    setTimeout(() => setData((x) => ({ 1: data1, ...x })), 1000);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Graph id="CHART_0" loading={!data[0]} data={data[0]} />
        <Graph id="CHART_1" loading={!data[1]} data={data[1]} />
      </header>
    </div>
  );
}

export default App;
