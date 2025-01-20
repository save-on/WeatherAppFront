import React from "react";
import SideBar from "./SideBar.js";
import ClothesSection from "./ClothesSection.js";
import "./Profile.css";

const Profile = ({
  onCreate,
  clothingItems,
  onSelectCard,
  onAddItem,
  // onCardLike,
  onEditProfile,
  onSignOut,
  onDeleteClick,
}) => {
  return (
    <div className="profile">
      <SideBar onSignOut={onSignOut} onEditProfile={onEditProfile} />
      <div className="profile__items-container">
        <div className="profile__items-text">
          Your Clothing Items
          <button
            className="profile__add-button"
            onClick={onCreate}
            type="button"
          >
            + Add New
          </button>
        </div>
        <ClothesSection
          clothingItems={clothingItems}
          onSelectCard={onSelectCard}
          onCreate={onCreate}
          onAddItem={onAddItem}
          // onCardLike={onCardLike}
          onDeleteClick={onDeleteClick}
        />
      </div>
    </div>
  );
};

export default Profile;
