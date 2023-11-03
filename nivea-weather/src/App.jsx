import { useState, useEffect, useRef } from "react";
import "./App.css";
import { GetSolarData, GetWeatherData } from "./components/api/weather";
import DataLabel from "./components/dataLabel";

function App() {
  // const [latitude, setLatitude] = useState();
  // const [longitude, setLongitude] = useState();

  const latInput = useRef();
  const lngInput = useRef(null);

  const [weather, setWeather] = useState([]);
  const [solar, setSolar] = useState([]);

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

              {(weather.length > 0 || solar.length > 0) && (
                <div className="card-footer text-muted mt-3">
                  <h4>Resultados</h4>
                  {weather.length > 0 &&
                    weather.map((d, i) => {
                      return (
                        <div key={`data-${i}`}>
                          {" "}
                          <DataLabel label={d.label} dataValue={d.value} />{" "}
                        </div>
                      );
                    })}
                  {solar.length > 0 &&
                    solar.map((d, i) => {
                      return (
                        <div key={`data-${i}`}>
                          {" "}
                          <DataLabel label={d.label} dataValue={d.value} />{" "}
                        </div>
                      );
                    })}
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
