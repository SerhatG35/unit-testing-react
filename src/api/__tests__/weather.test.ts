import { weather } from "api";
import { mockedGetWeatherDataResponse } from "api/mockData/weather";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);
jest.unmock("api/weather");

describe("Weather api tests", () => {
  it("requests and gets a successful response from getWeatherData", async () => {
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const params: Api.Weather.GetWeatherDataParams = {
      lat: 100,
      lon: 200,
    };

    mock.onGet(url).reply(200, mockedGetWeatherDataResponse);

    const response = await weather.getWeatherData(params);

    expect(response).toEqual(mockedGetWeatherDataResponse);
  });
});
// 