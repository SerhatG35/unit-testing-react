import { mockedGetWeatherDataResponse } from "api/mockData/weather";

export const getWeatherData = async (
  params: Api.Weather.GetWeatherDataParams
) => Promise.resolve(mockedGetWeatherDataResponse);
