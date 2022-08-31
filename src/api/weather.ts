import axios from "axios";

export const getWeatherData = async (
  params: Api.Weather.GetWeatherDataParams
) => {
  const url = "https://api.openweathermap.org/data/2.5/weather";
  const { data } = await axios.get<Api.Weather.WeatherData>(url, {
    params: {
      ...params,
      appid: "c44d81a217575adb400efd58a0ba4339",
      units: "metric",
    },
  });
  return data;
};
