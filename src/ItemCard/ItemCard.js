import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemCard.css";
import { useContext } from "react";
import likeButton from "../../images/State=Default.svg";
import likeButtonActive from "../../images/State=Liked.svg";

const ItemCard = ({ item, onSelectCard, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((user) => user === currentUser?._id);
  const id = item._id;

  const handleLike = () => {
    onCardLike(id, isLiked);
  };

  return (
    <div>
      <div className="card_name">
        {item.name}
        <button className="card__like" onClick={handleLike}>
          <img
            className="card_like-button"
            src={isLiked ? likeButtonActive : likeButton}
            alt="like-button"
          />
        </button>
      </div>
      <img
        className="card_image"
        src={item.imageUrl}
        onClick={() => onSelectCard(item)}
        alt={item.name}
      />
    </div>
  );
};

export default ItemCard;
