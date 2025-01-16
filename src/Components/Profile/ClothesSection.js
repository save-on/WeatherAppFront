import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSections.css";

const ClothesSection = ({
  onSelectCard,
  onCreate,
  clothingItems,
  onAddItem,
  onCardLike,
  isLoggedIn,
}) => {
  return (
    <div className="profile__card-items">
      {clothingItems.map((item) => {
        return (
          <ItemCard
            item={item}
            key={item?._id ?? item?.id}
            onSelectCard={onSelectCard}
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
