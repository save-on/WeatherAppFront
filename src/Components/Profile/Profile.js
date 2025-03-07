import React, { useState } from "react";
import SideBar from "./SideBar.js";
import ClothesSection from "./ClothesSection.js";
import PackingListList from "../PackingListList/PackingListList.js";
import PackingListDetailsModal from "../PackingListDetailsModal/PackingListDetailsModal.js";
import "./Profile.css";

const Profile = ({
  onCreate,
  clothingItems,
  onSelectedCard,
  onAddItem,
  handleCardLike,
  onEditProfile,
  onSignOut,
  onDeleteClick,
  onSelectedPackingList,
  isPackingListModalOpen,
  selectedPackingList,
  closePackingListModal,
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
        <PackingListList
          onOpenCreatePackingListModal={onCreate}
          onSelectedPackingList={onSelectedPackingList}
        />
        <ClothesSection
          clothingItems={clothingItems}
          onSelectedCard={onSelectedCard}
          onCreate={onCreate}
          onAddItem={onAddItem}
          onCardLike={handleCardLike}
          onDeleteClick={onDeleteClick}
        />
      </div>
      {isPackingListModalOpen && (
        <PackingListDetailsModal
          packingList={selectedPackingList}
          onClose={closePackingListModal}
        />
      )}
    </div>
  );
};

export default Profile;
