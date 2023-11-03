// import { elevation, solar, weather } from "../../fakeData/fakeData";

const formatarTimestamp = (timestamp) => {
  const data = new Date(timestamp * 1000); // Converta o timestamp em milissegundos
  const hora = data.getHours().toString().padStart(2, '0'); // Obtém a hora (formato com 2 dígitos)
  const minuto = data.getMinutes().toString().padStart(2, '0'); // Obtém os minutos (formato com 2 dígitos)
  return `${hora}:${minuto}`;
}

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

const MountHourlyResult = (data, label, paramName, indexHour) => {
  return {
    label: label,
    value: data.hourly[paramName][indexHour],
    unit: data.hourly_units[paramName],
  };
};

const MountMinute15Result = (data, label, paramName, indexMin15) => {
  return {
    label: label,
    value: data.minutely_15[paramName][indexMin15],
    unit: data.minutely_15_units[paramName],
  };
};

export const GetWeatherData = async (
  lat,
  lng,
  callback,
  setLoading = () => {}
) => {
  const hourParams = "wind_speed_10m,uv_index,direct_radiation,cloudcover";
  const min15Params =
    "temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,diffuse_radiation";

  setLoading(true);

  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=${hourParams}&minutely_15=${min15Params}&start_date=${getCurrentTime()}&end_date=${getCurrentTime()}&format=json&timeformat=unixtime`
  )
    .then((response) => response.json())
    .then((jsonData) => {
      setLoading(false);

      const index15 = EncontrarIndiceDaHoraAtual(jsonData.minutely_15.time);
      const indexHour = EncontrarIndiceDaHoraAtual(jsonData.hourly.time);

      callback([
        { label: "Hora do dia", value: formatarTimestamp(jsonData.minutely_15.time[index15]) },
        MountHourlyResult(jsonData, "Índice UV", "uv_index", indexHour),
        MountHourlyResult(
          jsonData,
          "Reflexão da Superfície",
          "direct_radiation",
          indexHour
        ),
        MountHourlyResult(
          jsonData,
          "Coberto por nuvens",
          "cloudcover",
          indexHour
        ),
        MountMinute15Result(
          jsonData,
          "Umidade Relativa",
          "relative_humidity_2m",
          index15
        ),
        MountMinute15Result(
          jsonData,
          "Velocidade do vento",
          "wind_speed_10m",
          index15
        ),
        MountMinute15Result(jsonData, "Temperatura", "temperature_2m", index15),
        MountMinute15Result(
          jsonData,
          "Temperatura Aparente",
          "apparent_temperature",
          index15
        ),
      ]);
    });
};

export const GetElevationData = async (
  lat,
  lng,
  callback,
  setLoading = () => {}
) => {
  setLoading(true);

  fetch(
    `https://api.open-meteo.com/v1/elevation?latitude=${lat}&longitude=${lng}`
  )
    .then((response) => response.json())
    .then((jsonData) => {
      setLoading(false);
      callback([{ label: "Altitude", value: jsonData.elevation, unit: "m" }]);
    });
};
