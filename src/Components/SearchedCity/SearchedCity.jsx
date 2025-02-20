import { useMemo } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import "./SearchedCity.css";
import ItemCard from "../ItemCard/ItemCard";

const SearchedCity = ({
  searchedCity,
  handleBackgroundVideoChange,
  clothingItems,
  handleSelectedCard,
  handleCardLike,
  loggedIn,
}) => {
  const handlePageTitle = (city) => {
    const lines = [
      `Weather & Packing Guide for ${city}:`,
      `Your Travel Info for ${city}:`,
      `Exploring ${city}: Weather & Essentials:`,
      `Packing List Potentials for ${city}:`,
      `Don’t Forget to Pack This for ${city}:`,
      `Must-Have Items for ${city}:`,
      `Your ${city} Packing Guide:`,
      `What You’ll Need in ${city}:`,
      `Essential Items for Your Trip to ${city}:`,
    ];
    if (city === undefined) {
      return;
    }
    return lines[Math.floor(Math.random() * lines.length)];
  };

  const filteredClothingItems = useMemo(() => {
    return clothingItems.filter(
      (item) => item.weather_condition === searchedCity.type
    );
  }, [clothingItems, searchedCity.type]);

  return (
    <div className="searched-city">
      <WeatherCard
        weatherData={searchedCity}
        handleBackgroundVideoChange={handleBackgroundVideoChange}
      />
      <h2 className="searched-city_title">
        {handlePageTitle(searchedCity.city)}
      </h2>
      <ul className="searched-city_card-lists">
        {filteredClothingItems.map((item, index) => {
          return (
            <ItemCard
              key={`item-card=${index}`}
              item={item}
              onSelectedCard={handleSelectedCard}
              onCardLike={handleCardLike}
              loggedIn={loggedIn}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default SearchedCity;
