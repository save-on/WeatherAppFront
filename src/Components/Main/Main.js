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

  // const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 16;
  const temp = useMemo(() => {
    if (currentTemperatureUnit === "F") {
      return weatherTemp?.temperature?.F || 16;
    } else {
      return weatherTemp?.temperature?.C || Math.round((16 - 32) * (5 / 9));
    }
  }, [weatherTemp, currentTemperatureUnit]);


  const tempInF = currentTemperatureUnit === "F" ? temp : Math.round(temp * 1.8 + 32);

  const weatherType = useMemo(() => {
    if (tempInF >= 86) return "hot";
    if (tempInF >= 66 && tempInF <= 85) return "warm";
    return "cold";
  }, [tempInF]);

  const weatherCondition = weatherTemp?.condition || "sunny";

  const filteredClothingItems = useMemo(() => {
    return clothingItems.filter(
      (item) => item.weather_condition === weatherType
    );
  }, [clothingItems, weatherType]);

  return (
    <main className="main">
      <WeatherCard day={true} type={weatherCondition} weatherTemp={temp} />
      <section className="card_section">
        <p className="card_suggestion">
          Today is {temp}° {currentTemperatureUnit} / You may want to wear:
        </p>
        <div className="card_item-container">
          <ul className="card_items">
            {filteredClothingItems.map((item, index) => (
              <ItemCard
                key={`item-card=${index}`}
                item={item}
                onSelectedCard={onSelectCard}
                onCardLike={onCardLike}
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
