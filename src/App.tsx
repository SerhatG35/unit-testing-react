import { Center, ChakraProvider, Spinner, useToast } from "@chakra-ui/react";
import { weather } from "api";
import WeatherCard from "components/WeatherCard";
import { useState, useEffect, useCallback } from "react";

type StateTypes = {
  geolocationInfo?: Api.Weather.GetWeatherDataParams;
  weatherData?: Api.Weather.WeatherData;
  isFetchingWeatherData: boolean;
};

const App = () => {
  const [{ isFetchingWeatherData, geolocationInfo, weatherData }, setState] =
    useState<StateTypes>({
      geolocationInfo: undefined,
      weatherData: undefined,
      isFetchingWeatherData: false,
    });

  const toast = useToast();

  const getGeoLocation = () => {
    setState((state) => ({ ...state, isFetchingWeatherData: true }));

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setState((state) => ({
          ...state,
          geolocationInfo: { lat: latitude, lon: longitude },
        }));
      }
    );
  };

  const getWeatherData = useCallback(async () => {
    if (!geolocationInfo) return;

    try {
      const response = await weather.getWeatherData(geolocationInfo);
      setState((state) => ({
        ...state,
        weatherData: response,
        isFetchingWeatherData: false,
      }));
    } catch (error: any) {
      setState((state) => ({ ...state, isFetchingWeatherData: false }));
      toast({
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [geolocationInfo, toast]);

  useEffect(() => {
    getGeoLocation();
  }, []);

  useEffect(() => {
    getWeatherData();
  }, [getWeatherData]);

  return (
    <ChakraProvider>
      <Center w="100%" h="100vh" bg="blue.200">
        {!isFetchingWeatherData ? (
          <WeatherCard weatherData={weatherData} reFetch={getGeoLocation} />
        ) : (
          <Spinner />
        )}
      </Center>
    </ChakraProvider>
  );
};

export default App;
