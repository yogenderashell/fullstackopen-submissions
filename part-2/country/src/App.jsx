import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState(null);
  const [name, setName] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const fetchCountries = () => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        console.log(res.data);
        setCountries(res.data);
        setFilteredCountries(res.data);
      })
      .catch((err) => console.log("error fetching countries: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredCountries(filteredCountries);
    console.log("all the filtered countries are: ", filteredCountries);
    if (filteredCountries.length > 10) {
      setMessage("Too many matches, specify another filter");
    } else {
      setMessage(null);
    }
    if (filteredCountries.length === 1) {
      setCountry(filteredCountries[0]);
    }
  };
  const getWeather = () => {
    if (country) {
      const { latlng } = country.capitalInfo;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${Math.floor(
        latlng[0]
      )}&lon=${Math.floor(latlng[1])}&appid=${import.meta.env.VITE_API_KEY}`;
      console.log(url);
      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);
  useEffect(() => {
    getWeather();
  }, [country]);

  console.log("find about the country: ", country);
  console.log("vite key: ", import.meta.env.VITE_API_KEY);
  // console.log("Weather icon is: ", weather.weather.icon);
  return (
    <div>
      <div>
        find the country
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={handleChange}
            type="text"
            placeholder="Enter the country name"
          />
          <Message message={message} />
        </form>{" "}
        <div>
          {country && (
            <div>
              <h2>{country.name.common}</h2>
              <div>capital: {country.capital}</div>
              <div>area: {country.area}</div>
              <ul>
                {Object.values(country.languages).map((language) => (
                  <li key={language}>{language}</li>
                ))}
              </ul>
              <img
                src={country.flags.png}
                alt={country.name.common}
                width="100"
              />
              {weather && (
                <div>
                  <h1>Weather in {country.capital}</h1>
                  <div>Temprature: {(weather.main.temp - 273.15).toFixed(2)} Celcius</div>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].icon}
                    width="100"
                  />
                  <div>Wind: {weather.wind.speed} m/s</div>
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          {filteredCountries.map((country) => (
            <div key={country.name.common}>
              {country.name.common}{" "}
              <button onClick={() => setCountry(country)}>Show</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Message = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div>{message}</div>;
};

export default App;
