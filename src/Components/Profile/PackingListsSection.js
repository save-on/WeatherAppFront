import SideBar from "./SideBar.js";
import ClothesSection from "./ClothesSection.js";
import "./Profile.css";
import "./PackingListsSection.css";

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
      <div className="packing__lists-container">
        <div className="packing__lists-text">
          <button
            className="packing__lists-button"
            onClick={onCreate}
            type="button"
          >
            Create Packing List
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

export default PackingListsSection;
