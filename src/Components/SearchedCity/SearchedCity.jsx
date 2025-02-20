import WeatherCard from "../WeatherCard/WeatherCard";
import "./SearchedCity.css";

const SearchedCity = ({ searchedCity, handleBackgroundVideoChange }) => {
  return (
    <div className="searched-city">
      <WeatherCard
        weatherData={searchedCity}
        handleBackgroundVideoChange={handleBackgroundVideoChange}
      />
    </div>
  );
};

export default SearchedCity;
