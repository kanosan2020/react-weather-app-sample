import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({
    coord: '',
    weather: '',
    base: '',
    main: '',
    visibility: '',
    wind: '',
    clouds: '',
    dt: '',
    sys: '',
    timezone: '',
    id: '',
    name: '',
    cod: ''
  });
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=7ad30e0befb6c2352e38fc2ec13d4abf`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation()
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location ||  ''}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text"
          autoFocus />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="tmp">
            {/* {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null} */}
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bole">{data.main.feels_like.toFixed()}</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
