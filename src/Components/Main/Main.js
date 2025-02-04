import WeatherCard from "../WeatherCard/WeatherCard.js";
import ItemCard from "../ItemCard/ItemCard.js";
import { useMemo, useContext } from "react";
import "./Main.css";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext.js";

function Main({
  weatherData,
  onSelectCard,
  clothingItems,
  handleCardLike,
  onDeleteClick,
  coords,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredClothingItems = useMemo(() => {
    return clothingItems.filter(
      (item) => item.weather_condition === weatherData.type
    );
  }, [clothingItems, weatherData.type]);

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} coords={coords} />
      <section className="card_section">
        <p className="card_suggestion">
          Today is{" "}
          {currentTemperatureUnit === "F"
            ? weatherData.temp[currentTemperatureUnit]
            : weatherData.temp[currentTemperatureUnit]}
          / You may want to wear:
        </p>
        <div className="card_item-container">
          <ul className="card_items">
            {filteredClothingItems.map((item, index) => (
              <ItemCard
                key={`item-card=${index}`}
                item={item}
                onSelectedCard={onSelectCard}
                onCardLike={handleCardLike}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default Main;
