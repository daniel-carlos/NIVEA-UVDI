// import { elevation, solar, weather } from "../../fakeData/fakeData";

export const getCurrentTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}`;
};

export const GetWeatherData = async (lat, lng, callback) => {
  const params = "windSpeed,humidity,airTemperature,cloudCover";
  const apiKey = import.meta.env.VITE_STORMGLASS_API_KEY;

  fetch(
    `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${getCurrentTime()}&end=${getCurrentTime()}&source=sg`,
    {
      headers: {
        Authorization: apiKey,
      },
    }
  )
    .then((response) => response.json())
    .then((jsonData) => {
      console.log("Weather", JSON.stringify(jsonData));
      callback([
        { label: "windSpeed", value: jsonData.hours[0].windSpeed.sg },
        { label: "airTemperature", value: jsonData.hours[0].airTemperature.sg },
        { label: "cloudCover", value: jsonData.hours[0].cloudCover.sg },
        { label: "humidity", value: jsonData.hours[0].humidity.sg },
      ]);
    });
};

export const GetSolarData = async (lat, lng, callback) => {
  const params = "downwardShortWaveRadiationFlux,uvIndex";
  const apiKey = import.meta.env.VITE_STORMGLASS_API_KEY;

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
      console.log("Solar", JSON.stringify(jsonData));
      callback([
        {
          label: "downwardShortWaveRadiationFlux",
          value: jsonData.hours[0].downwardShortWaveRadiationFlux.sg,
        },
        { label: "uvIndex", value: jsonData.hours[0].uvIndex.sg },
      ]);
    });
};

export const GetElevationData = async (lat, lng, callback) => {
  const params = "elevation";
  const apiKey = import.meta.env.VITE_STORMGLASS_API_KEY;

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
      console.log("Elevation", JSON.stringify(jsonData));
      callback([{ label: "Altitude", value: jsonData.data.elevation }]);
    });
};
