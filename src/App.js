import "./App.css";
import { Component, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Time from "react-time-format";
function App() {
  const [message, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [time, setTime] = useState();
  const [pv, setPV] = useState();
  const [ewe, setEwe] = useState();
  const [datastorage, setDataStorage] = useState();
  const [graphlabels, setGraphLabels] = useState([]);
  const [graphvalues, setGraphValues] = useState([]);

  useEffect(() => {
    fetch("https://pv-api.onrender.com/data")
      .then((res) => res.json())
      .then((data) => {
        setTime(data.StatusSNS.Time);
        setPV(data.StatusSNS.PV);
        setEwe(data.StatusSNS.EWE);
        console.log(data);
      });
    fetch("https://pv-api.onrender.com/datastorage")
      .then((res) => res.json())
      .then((data) => {
        console.log("datastorage", data);
        setDataStorage(JSON.stringify(data));
        let dates = [];
        let values = [];
        data.forEach((element) => {
          dates.push(element.date);
          values.push(element.ewe);
        });
        console.log("dates", values);
        setGraphLabels(dates);
        setGraphValues(values);
      });
  }, []);

  return (
    <div className="App">
      <h1 className="App-header">Stromverbrauch</h1>
      <p>
        Uhrzeit: <Time value={time} format="DD.MM.YYYY hh:mm:ss" />
      </p>
      <p>Ewe: {JSON.stringify(ewe)}</p>
      <p>PV: {JSON.stringify(pv)}</p>
      <Line
        data={{
          labels: graphlabels,
          datasets: [
            {
              label: "KW curr_w2",
              data: graphvalues,
              fill: true,
              backgroundColor: "rgba(6, 156,51, .3)",
              borderColor: "#02b844",
            },
          ],
        }}
      />
    </div>
  );
}

export default App;
