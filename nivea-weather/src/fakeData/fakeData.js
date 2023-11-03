export const weather = {
  hours: [
    {
      airTemperature: {
        sg: 26.43,
      },
      cloudCover: {
        sg: 100.0,
      },
      humidity: {
        sg: 80.67,
      },
      time: "2023-11-01T08:00:00+00:00",
      windSpeed: {
        sg: 2.97,
      },
    },
  ],
  meta: {
    cost: 1,
    dailyQuota: 10,
    end: "2023-11-01 08:00",
    lat: -3.7421737,
    lng: -38.5358828,
    params: ["windSpeed", "humidity", "airTemperature", "cloudCover"],
    requestCount: 8,
    source: ["sg"],
    start: "2023-11-01 08:00",
  },
};

export const solar = {
  hours: [
    {
      downwardShortWaveRadiationFlux: {
        sg: 225.19,
      },
      time: "2023-11-01T08:00:00+00:00",
      uvIndex: {
        sg: 0.19,
      },
    },
  ],
  meta: {
    cost: 1,
    dailyQuota: 10,
    end: "2023-11-01 08:00",
    lat: -3.7421737,
    lng: -38.5358828,
    params: ["uvIndex", "downwardShortWaveRadiationFlux"],
    requestCount: 7,
    source: ["sg"],
    start: "2023-11-01 08:00",
  },
};

export const elevation = {
  data: {
    elevation: 24.928163528442383,
  },
  meta: {
    cost: 1,
    dailyQuota: 10,
    distance: 0.18,
    elevation: {
      source:
        "GEBCO Compilation Group (2019) GEBCO 2019 Grid (doi:10.5285/836f016a-33be-6ddc-e053-6c86abc0788e)",
      unit: "m",
    },
    lat: -3.7421737,
    lng: -38.5358828,
    requestCount: 9,
  },
};
