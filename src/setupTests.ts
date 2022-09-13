// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

const mockGeolocation = {
  getCurrentPosition: (cb: any) => {
    return cb({
      coords: {
        latitude: 27.0881,
        longitude: 38.4942,
      },
    });
  },
};

global.navigator = Object.defineProperty(global.navigator, "geolocation", {
  value: mockGeolocation,
});

window.scrollTo = jest.fn();

jest.mock("api/weather");
