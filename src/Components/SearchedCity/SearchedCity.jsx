import { useEffect, useMemo, useState } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import "./SearchedCity.css";
import ItemCard from "../ItemCard/ItemCard";
import BackButton from "../BackButton/BackButton";

const SearchedCity = ({
  searchedCity,
  handleBackgroundVideoChange,
  clothingItems,
  handleSelectedCard,
  handleCardLike,
  loggedIn,
  savedCity,
}) => {
  const [line, setLine] = useState("");

  useEffect(() => {
    if (savedCity?.name) {
      const lines = [
        `Weather & Packing Guide for ${savedCity.name}:`,
        `Your Travel Info for ${savedCity.name}:`,
        `Exploring ${savedCity.name} Weather & Essentials:`,
        `Packing List Potentials for ${savedCity.name}:`,
        `Don’t Forget to Pack This for ${savedCity.name}:`,
        `Must-Have Items for ${savedCity.name}:`,
        `Your ${savedCity.name} Packing Guide:`,
        `What You’ll Need in ${savedCity.name}:`,
        `Essential Items for Your Trip to ${savedCity.name}:`,
      ];
      setLine(lines[Math.floor(Math.random() * lines.length)]);
    }
  }, [savedCity]);

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
      <BackButton type={"home"} />
      <h2 className="searched-city_title">{line}</h2>
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
