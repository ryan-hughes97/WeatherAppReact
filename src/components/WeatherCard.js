import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import axios from 'axios';

function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState('');
  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=Moreno Valley`
      )
      .then((data) => {
        setWeather(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // Event
  const weatherInput = (e) => {
    setInput(e.target.value);
  };
  const searchWeather = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=1ae961cf72224574815214155211002&q=${input}`
      )
      .then((data) => {
        setWeather(data.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {weather && (
        <StyledWeatherCard>
          <div className='search'>
            <input onChange={weatherInput} type='text' />
            <button onClick={searchWeather}>Search</button>
          </div>
          <StyledWeatherLocation className='weather-location'>
            <h4>{weather.location.name}</h4>
            <div className='temperature-div'>
              <img
                src={weather.current.condition.icon}
                alt='Current weather icon'
              />
              <h4 className='temperature'>{weather.current.temp_f}°F</h4>
            </div>
          </StyledWeatherLocation>
        </StyledWeatherCard>
      )}
    </div>
  );
}

const StyledWeatherCard = styled(motion.div)`
  font-size: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 500px;
  width: 250px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 25px;
  background: linear-gradient(#8ca4f1, #f4f4f4);
  .search {
    input {
      margin-top: 1rem;
      border: 0;
      padding: 0.25rem 0.5rem;
      border-radius: 10px;
    }
    input:focus {
      outline: 0;
    }
  }
  .temperature-div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    max-width: 40px;
    max-height: 40px;
  }
`;

const StyledWeatherLocation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  background: #fff;
  padding: 0rem 1rem;
  margin: 1rem 0;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 30px;
`;

export default WeatherCard;
