// import React from "react";
import ItemCard from "../ItemCard/ItemCard.js";
import "./ClothesSection.css";
import CurrentUserContext from "../../Contexts/CurrentUserContext.js";
import { useContext } from "react";

const ClothesSection = ({
  onSelectedCard,
  onCreate,
  clothingItems,
  onAddItem,
  onCardLike,
  isLoggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="profile__card-items">
      {clothingItems.map((item) => {
        if (item.owner !== currentUser._id) {
          return;
        }
        return (
          <ItemCard
            item={item}
            key={item?._id ?? item?.id}
            onSelectedCard={onSelectedCard}
            onCreate={onCreate}
            onAddItem={onAddItem}
            onCardLike={onCardLike}
            isLoggedIn={isLoggedIn}
          />
        );
      })}
    </div>
  );
};

export default ClothesSection;
