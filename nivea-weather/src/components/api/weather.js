import { elevation, solar, weather } from "../../fakeData/fakeData";

export const getCurrentTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}`;
};

export const GetWeatherData = async (lat, lng, callback) => {
  callback([
    { label: "windSpeed", value: weather.hours[0].windSpeed.sg },
    { label: "airTemperature", value: weather.hours[0].airTemperature.sg },
    { label: "cloudCover", value: weather.hours[0].cloudCover.sg },
    { label: "humidity", value: weather.hours[0].humidity.sg },
  ]);

  // const params = "windSpeed,humidity,airTemperature,cloudCover";
  // const apiKey =
  //   "2ffb42ea-78e9-11ee-a14f-0242ac130002-2ffb43a8-78e9-11ee-a14f-0242ac130002";

  // fetch(
  //   `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${getCurrentTime()}&end=${getCurrentTime()}&source=sg`,
  //   {
  //     headers: {
  //       Authorization: apiKey,
  //     },
  //   }
  // )
  //   .then((response) => response.json())
  //   .then((jsonData) => {
  //     callback(jsonData);
  //   });
};

export const GetSolarData = async (lat, lng, callback) => {
  callback([
    {
      label: "downwardShortWaveRadiationFlux",
      value: solar.hours[0].downwardShortWaveRadiationFlux.sg,
    },
    { label: "uvIndex", value: solar.hours[0].uvIndex.sg },
  ]);

  // const params = "windSpeed,humidity,airTemperature,cloudCover";
  // const apiKey =
  //   "2ffb42ea-78e9-11ee-a14f-0242ac130002-2ffb43a8-78e9-11ee-a14f-0242ac130002";

  // fetch(
  //   `https://api.stormglass.io/v2/solar/point?lat=${lat}&lng=${lng}&params=${params}&start=${getCurrentTime()}&end=${getCurrentTime()}&source=sg`,
  //   {
  //     headers: {
  //       Authorization: apiKey,
  //     },
  //   }
  // )
  //   .then((response) => response.json())
  //   .then((jsonData) => {
  //     callback(jsonData);
  //   });
};

export const GetElevationData = async (lat, lng, callback) => {
  callback([{ label: "Altitude", value: elevation.data.elevation }]);

  // const params = "windSpeed,humidity,airTemperature,cloudCover";
  // const apiKey =
  //   "2ffb42ea-78e9-11ee-a14f-0242ac130002-2ffb43a8-78e9-11ee-a14f-0242ac130002";

  // fetch(
  //   `https://api.stormglass.io/v2/solar/point?lat=${lat}&lng=${lng}&params=${params}&start=${getCurrentTime()}&end=${getCurrentTime()}&source=sg`,
  //   {
  //     headers: {
  //       Authorization: apiKey,
  //     },
  //   }
  // )
  //   .then((response) => response.json())
  //   .then((jsonData) => {
  //     callback(jsonData);
  //   });
};
