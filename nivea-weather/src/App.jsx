/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import "./App.css";
import { GetElevationData, GetWeatherData } from "./components/api/weather";

function App() {
  const latInput = useRef();
  const lngInput = useRef(null);

  const [weather, setWeather] = useState([]);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [solar, setSolar] = useState([]);
  const [loadingSolar, setLoadingSolar] = useState(false);
  const [elevation, setElevation] = useState([]);
  const [loadingElevation, setLoadingElevation] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
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
    GetWeatherData(
      latInput.current.value,
      lngInput.current.value,
      setWeather,
      setLoadingWeather
    );
    // GetSolarData(
    //   latInput.current.value.toString(),
    //   lngInput.current.value.toString(),
    //   setSolar,
    //   setLoadingSolar
    // );
    GetElevationData(
      latInput.current.value,
      lngInput.current.value,
      setElevation,
      setLoadingElevation
    );
  };

  const DataLabelList = ({ dataList, loading, loadingLabel }) => {
    if (loading) {
      return (
        <div className="d-flex align-items-center">
          <strong>{loadingLabel}</strong>
          <div
            className="spinner-border ms-auto"
            role="status"
            aria-hidden="true"
          ></div>
        </div>
      );
    } else {
      return dataList.map((d, i) => {
        return (
          <tr key={`data-${i}`}>
            <td>{d.label}</td>
            <td className="fw-bold">{d.value}</td>
            <td>{d.unit}</td>
          </tr>
        );
      });
    }
  };

  return (
    <>
      <div className="container m-5">
        <div className="card" style={{ maxWidth: "30rem" }}>
          <div className="card-body">
            <h4 className="card-title ">Nivea UVDI Data</h4>
            <div className="card-text">
              <section style={{ width: "15rem" }}>
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
                disabled={loadingWeather || loadingSolar || loadingElevation}
              >
                Buscar
              </button>

              <div className="card-footer text-muted mt-3">
                <table className="table table-striped table-hover">
                  <thead>
                    <th>Parâmetro</th>
                    <th>Valor</th>
                    <th>Unidade</th>
                  </thead>
                  <tbody>
                    <DataLabelList
                      dataList={weather}
                      loading={loadingWeather}
                      loadingLabel={"Buscando dados do clima"}
                    />
                    <DataLabelList
                      dataList={solar}
                      loading={loadingSolar}
                      loadingLabel={"Buscando dados do sol"}
                    />
                    <DataLabelList
                      dataList={elevation}
                      loading={loadingElevation}
                      loadingLabel={"Buscando dados de altitude"}
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
