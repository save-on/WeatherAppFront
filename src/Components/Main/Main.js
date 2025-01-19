import WeatherCard from "../WeatherCard/WeatherCard.js";
import ItemCard from "../ItemCard/ItemCard.js";
import { useMemo, useContext } from "react";
import "./Main.css";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext.js";

function Main({
  weatherTemp,
  onSelectCard,
  clothingItems,
  onCardLike,
  onDeleteClick,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 999;
  const tempInF = currentTemperatureUnit === "F" ? temp : temp * 1.8 + 32;

  const weatherType = useMemo(() => {
    if (tempInF >= 86) {
      return "hot";
    } else if (tempInF >= 66 && tempInF <= 85) {
      return "warm";
    } else if (tempInF <= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  const filteredCards = clothingItems.filter((items) => {
    return items.weather_condition === weatherType;
  });

  return (
    <main className="main">     
      <WeatherCard day={false} type="cloudynight" weatherTemp={temp} />
      <section className="card_section">
        <p className="card_suggestion">
          Today is {temp}° {currentTemperatureUnit} / You may want to wear:
        </p>
        <div className="card_item-container">
          <ul className="card_items">
            {filteredCards.map((item, index) => {
              return (
                <ItemCard
                  key={`item-card=${index}`}
                  item={item}
                  onSelectedCard={onSelectCard}
                  id={item.id}
                  link={item.link}
                  name={item.name}
                  weather={item.weather_condition}
                  onCardLike={onCardLike}
                  onDeleteClick={onDeleteClick}
                />
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default Main;
