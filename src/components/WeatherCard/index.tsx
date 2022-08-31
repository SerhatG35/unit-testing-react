import {
  Center,
  Collapse,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { WiHumidity } from "react-icons/wi";
import { FiRefreshCcw } from "react-icons/fi";
import { BsCloudsFill } from "react-icons/bs";
import { MdVisibility } from "react-icons/md";
import { RiWindyFill } from "react-icons/ri";
import { FC, useState } from "react";

type WeatherCardProps = {
  weatherData?: Api.Weather.WeatherData;
  reFetch?: () => void;
};

const WeatherCard: FC<WeatherCardProps> = ({ weatherData, reFetch }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const additionalInfo = [
    {
      Icon: WiHumidity,
      name: "Humidity",
      value: `${weatherData?.main.humidity}%`,
    },
    {
      Icon: MdVisibility,
      name: "Visibility",
      value: weatherData?.visibility && `${weatherData?.visibility / 1000} km`,
    },
    {
      Icon: BsCloudsFill,
      name: "Cloudiness",
      value: `${weatherData?.clouds.all}%`,
    },
    {
      Icon: RiWindyFill,
      name: "Wind",
      value: `${weatherData?.wind.speed.toFixed(1)} m/s`,
    },
  ];

  return (
    <>
      {weatherData && (
        <Center
          color="black"
          flexDir="column"
          boxShadow="2xl"
          rounded="8px"
          bg="gainsboro"
          p="1rem"
          fontSize="xl"
          width="300px"
        >
          <Heading data-testid="city-name">{weatherData.name}</Heading>
          <Image
            src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png`}
          />
          <Text fontSize="2xl">{weatherData.main.temp.toFixed(0)}°C</Text>
          <Text>{weatherData.weather[0].main}</Text>

          <Collapse in={isExpanded} style={{ width: "100%" }} animateOpacity>
            {additionalInfo.map(({ Icon, name, value }, index, list) => {
              return (
                <Center
                  borderTop="1px solid"
                  borderBottom={
                    list.length - 1 === index ? "1px solid" : "none"
                  }
                  justifyContent="space-between"
                  mt={index === 0 ? "2rem" : "0px"}
                  key={name}
                  borderColor="gray.300"
                >
                  <Center>
                    <Icon />
                    <Text ml="0.5rem">{name}</Text>
                  </Center>
                  <Text data-testid={`text-${name.toLocaleLowerCase()}`}>
                    {value}
                  </Text>
                </Center>
              );
            })}
          </Collapse>

          <Center w="100%" justifyContent="space-between">
            <IconButton
              onClick={reFetch}
              aria-label="refetch-data"
              _focus={{ outline: "none" }}
              icon={<FiRefreshCcw />}
            />
            <IconButton
              alignSelf="end"
              onClick={() => setIsExpanded((state) => !state)}
              aria-label="expand-card"
              _focus={{ outline: "none" }}
              icon={isExpanded ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
              data-testid="expand-card-button"
            />
          </Center>
        </Center>
      )}
    </>
  );
};

export default WeatherCard;
