import React, { useState } from "react";
import SideBar from "./SideBar.js";
import ClothesSection from "./ClothesSection.js";
import PackingListList from "../../Components/PackingListList/PackingListList.js";
import PackingListDetailsModal from "../PackingListDetailsModal/PackingListDetailsModal.js";
import PackingListCard from "../PackingListCard/PackingListCard.js";
import "./Profile.css";
import BackButton from "../BackButton/BackButton.jsx";

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
  packingLists,
}) => {
  const handlePackingListDeleted = (deletedPackingListId) => {
    // [✅] **Define handlePackingListDeleted in Profile**
    // Update the packing lists state to remove the deleted list
    setPackingLists((prevLists) =>
      prevLists.filter((list) => list.id !== deletedPackingListId)
    );
  };

  return (
    <div className="profile">
      <BackButton type="prev" />
      <div className="profile_container">
        <SideBar onSignOut={onSignOut} onEditProfile={onEditProfile} />
        <div className="profile__items-container">
          <div className="profile__items">
            <p className="profile__items-text"> Your Clothing Items </p>
            <button
              className="profile__add-button"
              onClick={onCreate}
              type="button"
            >
              Add New Item
            </button>
          </div>

          <ClothesSection
            clothingItems={clothingItems}
            onSelectedCard={onSelectedCard}
            onCreate={onCreate}
            onAddItem={onAddItem}
            onCardLike={handleCardLike}
            onDeleteClick={onDeleteClick}
          />
        </div>

        <PackingListList
          onOpenCreatePackingListModal={onCreate}
          onSelectedPackingList={onSelectedPackingList}
          isPackingListModalOpen={isPackingListModalOpen}
          selectedPackingList={selectedPackingList}
          closePackingListModal={closePackingListModal}
          handlePackingListDeleted={handlePackingListDeleted}
          packingLists={packingLists}
        />
      </div>
    </div>
  );
};

export default Profile;
