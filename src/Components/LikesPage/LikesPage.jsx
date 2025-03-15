import { useContext } from "react";
import BackButton from "../BackButton/BackButton";
import LocationSearch from "../LocationSearch/LocationSearch";
import "./LikesPage.css";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";

const LikesPage = ({
  handleSelectedCard,
  clothingItems,
  handleCardLike,
  loggedIn,
  handleGetCityWeather,
  searchResults,
  handleSearchedData,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const filteredClothingItems = clothingItems.filter((item) => {
    if (item["likes"].includes(currentUser._id)) {
      return item;
    }
  });

  
  return (
    <div className="likes-page">
      <div className="likes-page__header">
        <BackButton type="prev" />
        <LocationSearch
          handleGetCityWeather={handleGetCityWeather}
          searchResults={searchResults}
          handleSearchedData={handleSearchedData}
        />
      </div>
      <div className="likes-page__header-container">
      <h1 className="likes-page__title">Favorites  </h1>
      <p className="likes-page__counter">
        {filteredClothingItems.length > 0
          ? `${filteredClothingItems.length} liked items`
          : "No liked items"}
      </p>
      </div>
     
      <ul className="likes-page__items">
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

export default LikesPage;
