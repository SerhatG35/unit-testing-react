export const mockedGetWeatherDataResponse: Api.Weather.WeatherData = {
  coord: {
    lon: 27.0881,
    lat: 38.4942,
  },
  weather: [
    {
      id: 802,
      main: "Clouds",
      description: "scattered clouds",
      icon: "03d",
    },
  ],
  base: "stations",
  main: {
    temp: 27.94,
    feels_like: 27.61,
    temp_min: 27.94,
    temp_max: 27.94,
    pressure: 1008,
    humidity: 40,
    sea_level: 1008,
    grnd_level: 993,
  },
  visibility: 10000,
  wind: {
    speed: 3.36,
    deg: 277,
  },
  clouds: {
    all: 35,
  },
  dt: 1661422350,
  sys: {
    type: 1,
    id: 6977,
    country: "TR",
    sunrise: 1661398484,
    sunset: 1661446399,
  },
  timezone: 10800,
  id: 311044,
  name: "İzmir",
  cod: 200,
};
