import { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  GetElevationData,
  GetSolarData,
  GetWeatherData,
} from "./components/api/weather";

function App() {
  // const [latitude, setLatitude] = useState();
  // const [longitude, setLongitude] = useState();

  const latInput = useRef();
  const lngInput = useRef(null);

  const [weather, setWeather] = useState([]);
  const [solar, setSolar] = useState([]);
  const [elevation, setElevation] = useState([]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        // setLatitude(pos.coords.latitude);
        // setLongitude(pos.coords.longitude);
        latInput.current.value = pos.coords.latitude;
        lngInput.current.value = pos.coords.longitude;
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const searchClickHandle = () => {
    GetWeatherData(latInput.current.value, lngInput.current.value, setWeather);
    GetSolarData(latInput.current.value, lngInput.current.value, setSolar);
    GetElevationData(
      latInput.current.value,
      lngInput.current.value,
      setElevation
    );
  };

  const DataLabelList = ({ dataList }) => {
    return dataList.map((d, i) => {
      return (
        <div key={`data-${i}`}>
          <span>{d.label}</span>
          {": "}
          <span>{d.value}</span>
        </div>
      );
    });
  };

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title ">UVDI</h4>
            <div className="card-text">
              <section style={{ width: "12rem" }}>
                <div className="input-group input-group-sm mb-3">
                  <span className="input-group-text" style={{ width: "6rem" }}>
                    Latitude
                  </span>
                  <input
                    id="input_lat"
                    type="number"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="input_lat"
                    ref={latInput}
                  />
                </div>
                <div className="input-group input-group-sm mb-3">
                  <span className="input-group-text" style={{ width: "6rem" }}>
                    Longitude
                  </span>
                  <input
                    id="input_lng"
                    type="number"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="input_lng"
                    ref={lngInput}
                  />
                </div>
              </section>

              <button
                className="btn btn-sm btn-primary"
                onClick={searchClickHandle}
              >
                Buscar
              </button>

              {weather.length + solar.length + elevation.length > 0 && (
                <div className="card-footer text-muted mt-3">
                  <h4>Resultados</h4>
                  <DataLabelList dataList={weather} />
                  <DataLabelList dataList={solar} />
                  <DataLabelList dataList={elevation} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
