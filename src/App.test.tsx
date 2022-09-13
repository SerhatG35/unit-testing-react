import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { weather } from "api";
import { mockedGetWeatherDataResponse } from "api/mockData/weather";

import App from "App";

describe("App tests", () => {
  const setup = () => render(<App />);

  it("renders data successfully", async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByTestId("city-name")).toHaveTextContent(
        mockedGetWeatherDataResponse.name
      );
    });
  });

  it("should expand the weather card", async () => {
    setup();

    userEvent.click(await screen.findByTestId("expand-card-button"));

    expect(await screen.findByTestId("text-humidity")).toHaveTextContent(
      mockedGetWeatherDataResponse.main.humidity.toString()
    );
  });
  it("should throw error while fetching weather data", async () => {
    jest.spyOn(weather, "getWeatherData").mockImplementation(() => {
      throw new Error();
    });

    setup();

    await waitFor(async () => {
      expect(weather.getWeatherData).toThrowError();
    });
  });
});
