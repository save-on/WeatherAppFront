import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useMemo, useContext } from "react";
import "./Main.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

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
    return items.weather === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={false} type="cloudynight" weatherTemp={temp} />
      <section className="card_section" id="card-section">
        Today is {temp}° {currentTemperatureUnit} / You may want to wear:
        <div className="card_items">
          {filteredCards.map((item, index) => {
            return (
              <ItemCard
                key={`item-card=${index}`}
                item={item}
                onSelectedCard={onSelectCard}
                id={item.id}
                link={item.link}
                name={item.name}
                weather={item.weather}
                onCardLike={onCardLike}
                onDeleteClick={onDeleteClick}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
