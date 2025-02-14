import SideBar from "./SideBar.js";
import ClothesSection from "./ClothesSection.js";
import "./Profile.css";

const PackingListsSection = ({
  onCreate,
  clothingItems,
  onSelectedCard,
  onAddItem,
  handleCardLike,
  onEditProfile,
  onSignOut,
  onDeleteClick,
}) => {
  return (
    <div className="profile">
      <SideBar onSignOut={onSignOut} onEditProfile={onEditProfile} />
      <div className="profile__items-container">
        <div className="profile__items-text">
          Create Packing List
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
          onSelectedCard={onSelectedCard}
          onCreate={onCreate}
          onAddItem={onAddItem}
          onCardLike={handleCardLike}
          onDeleteClick={onDeleteClick}
        />
      </div>
    </div>
  );
};

export default PackingListsSection ;