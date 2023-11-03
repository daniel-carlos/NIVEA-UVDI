// import { elevation, solar, weather } from "../../fakeData/fakeData";

export const getCurrentTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};
const EncontrarIndiceDaHoraAtual = (listaDeHorarios) => {
  // Obtém a hora atual em segundos desde a época (Unix timestamp)
  const horaAtual = Math.floor(new Date().getTime() / 1000);

  // Percorre a lista de horários e encontra o índice correspondente à hora atual
  for (let i = 0; i < listaDeHorarios.length; i++) {
    if (horaAtual < listaDeHorarios[i]) {
      return i - 1; // Retorna o índice anterior
    }
  }

  // Se a hora atual for maior que o último horário na lista, retorne o último índice
  return listaDeHorarios.length - 1;
};
export const GetWeatherData = async (
  lat,
  lng,
  callback,
  setLoading = () => {}
) => {
  const hourParams = "wind_speed_10m,uv_index,direct_radiation,cloudcover";
  const min15Params = "temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,diffuse_radiation";

  setLoading(true);

  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=${hourParams}&minutely_15=${min15Params}&start_date=${getCurrentTime()}&end_date=${getCurrentTime()}&format=json&timeformat=unixtime`
  )
    .then((response) => response.json())
    .then((jsonData) => {
      setLoading(false);
      // console.log("Weather", JSON.stringify(jsonData));
      const index15 = EncontrarIndiceDaHoraAtual(jsonData.minutely_15.time);
      const indexHour = EncontrarIndiceDaHoraAtual(jsonData.hourly.time);
      callback([
        { label: "Índice UV", value: jsonData.hourly.uv_index[indexHour], unit: jsonData.hourly_units.uv_index },
        { label: "Reflexão da Superfície", value: jsonData.hourly.direct_radiation[indexHour], unit: jsonData.hourly_units.direct_radiation  },
        {
          label: "Coberto por nuvens",
          value: jsonData.hourly.cloudcover[indexHour],
        },
        {
          label: "Umidade Relativa",
          value: jsonData.minutely_15.relative_humidity_2m[index15],
        },
        {
          label: "Velocidade do vento",
          value: jsonData.minutely_15.wind_speed_10m[index15],
        },
        {
          label: "Temperatura",
          value: jsonData.minutely_15.temperature_2m[index15],
        },
        {
          label: "Temperatura Aparente",
          value: jsonData.minutely_15.apparent_temperature[index15],
        },
      ]);
    });
};

export const GetSolarData = async (
  lat,
  lng,
  callback,
  setLoading = () => {}
) => {
  const params = "downwardShortWaveRadiationFlux,uvIndex";
  const apiKey = import.meta.env.VITE_STORMGLASS_API_KEY;

  setLoading(true);

  fetch(
    `https://api.stormglass.io/v2/solar/point?lat=${lat}&lng=${lng}&params=${params}&start=${getCurrentTime()}&end=${getCurrentTime()}&source=sg`,
    {
      headers: {
        Authorization: apiKey,
      },
    }
  )
    .then((response) => response.json())
    .then((jsonData) => {
      setLoading(false);
      console.log("Solar", JSON.stringify(jsonData));
      if (jsonData.errors) {
        callback([{ label: "Erro (solar)", value: jsonData.errors.key }]);
        return;
      }
      callback([
        {
          label: "DownwardShortWaveRadiationFlux",
          value: jsonData.hours[0].downwardShortWaveRadiationFlux.sg,
        },
        { label: "Índice UV", value: jsonData.hours[0].uvIndex.sg },
      ]);
    });
};

export const GetElevationData = async (
  lat,
  lng,
  callback,
  setLoading = () => {}
) => {
  const params = "elevation";
  const apiKey = import.meta.env.VITE_STORMGLASS_API_KEY;

  setLoading(true);

  fetch(
    `https://api.stormglass.io/v2/elevation/point?lat=${lat}&lng=${lng}&params=${params}&start=${getCurrentTime()}&end=${getCurrentTime()}&source=sg`,
    {
      headers: {
        Authorization: apiKey,
      },
    }
  )
    .then((response) => response.json())
    .then((jsonData) => {
      setLoading(false);
      console.log("Elevation", JSON.stringify(jsonData));
      if (jsonData.errors) {
        callback([{ label: "Erro (elevation)", value: jsonData.errors.key }]);
        return;
      }
      callback([{ label: "Altitude", value: jsonData.data.elevation }]);
    });
};
