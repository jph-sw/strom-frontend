import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [message, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [time, setTime] = useState();
  const [pv, setPV] = useState();
  const [ewe, setEwe] = useState();

  useEffect(() => {
    fetch("http://pv-api.onrender.com/data")
      .then((res) => res.json())
      .then((data) => {
        setTime(data.StatusSNS.Time);
        setPV(data.StatusSNS.PV);
        setEwe(data.StatusSNS.EWE);
        console.log(data);
      });
  }, []);

  return (
    <div className="App">
      <h1 className="App-header">Stromverbrauch</h1>
      <p>Uhrzeit: {time}</p>
      <p>Ewe: {JSON.stringify(ewe)}</p>
      <p>PV: {JSON.stringify(pv)}</p>
    </div>
  );
}

export default App;
