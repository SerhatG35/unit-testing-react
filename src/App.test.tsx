import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { weather } from "api";
import { mockedGetWeatherDataResponse } from "api/mockData/weather";
import App from "App";

describe("App tests", () => {
  const setup = () => render(<App />);

  it("loads data successfully", async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByTestId("city-name")).toHaveTextContent(
        mockedGetWeatherDataResponse.name
      );
    });
  });
  it("should expand the card", async () => {
    setup();

    fireEvent.click(await screen.findByTestId("expand-card-button"));

    expect(await screen.findByTestId("text-humidity")).toHaveTextContent(
      mockedGetWeatherDataResponse.main.humidity.toString()
    );
  });
  it("should throw error", async () => {
    jest.spyOn(weather, "getWeatherData").mockImplementation(() => {
      throw new Error();
    });

    setup();

    await waitFor(async () => {
      expect(weather.getWeatherData).toThrowError();
    });
  });
});
