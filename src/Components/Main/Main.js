import WeatherCard from "../WeatherCard/WeatherCard.js";
import ItemCard from "../ItemCard/ItemCard.js";
import { useMemo, useContext } from "react";
import "./Main.css";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext.js";
import LocationSearch from "../LocationSearch/LocationSearch.jsx";

function Main({
  weatherData,
  onSelectedCard,
  clothingItems,
  handleCardLike,
  loggedIn,
  handleBackgroundVideoChange,
  handleGetCityWeather,
  searchResults,
  handleSearchedData,
  locationData,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredClothingItems = useMemo(() => {
    return clothingItems.filter(
      (item) => item.weather_condition === weatherData.type
    );
  }, [clothingItems, weatherData.type]);

  return (
    <main className="main">
      {/* <WeatherCard
        weatherData={weatherData}
        handleBackgroundVideoChange={handleBackgroundVideoChange}
      /> */}
      <div className="main-city_weather-container">
        {weatherData.condition && (
          <p className="main-city_weather-condition">
            {`${weatherData.city}'s current weather is ${weatherData.condition}`}
          </p>
        )}

        {/* <LocationSearch
          handleGetCityWeather={handleGetCityWeather}
          searchResults={searchResults}
          handleSearchedData={handleSearchedData}
        /> */}
      </div>
      <section className="card_section">
        {locationData.locationAccess ? (
          <p className="card_suggestion">
            Today is{" "}
            {currentTemperatureUnit === "F"
              ? weatherData.temp[currentTemperatureUnit]
              : weatherData.temp[currentTemperatureUnit]}
            / You may want to wear:
          </p>
        ) : (
          <p className="card_suggestion">Community's Travel Items</p>
        )}
        <div className="card_item-container">
          {locationData.locationAccess ? (
            <ul className="card_items">
              {/* {filteredClothingItems.map((item, index) => (
                <ItemCard
                  key={`item-card=${index}`}
                  item={item}
                  onSelectedCard={onSelectedCard}
                  onCardLike={handleCardLike}
                  loggedIn={loggedIn}
                />
              ))} */}
            </ul>
          ) : (
            <ul className="card_items">
              {/* {clothingItems.map((item, index) => (
                <ItemCard
                  key={`item-card=${index}`}
                  item={item}
                  onSelectedCard={onSelectedCard}
                  onCardLike={handleCardLike}
                  loggedIn={loggedIn}
                />
              ))} */}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

export default Main;
