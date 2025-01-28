import CurrentUserContext from "../../Contexts/CurrentUserContext.js";
import "./ItemCard.css";
import { useContext } from "react";
import likeButton from "../../Images/State=Default.svg";
import likeButtonActive from "../../Images/State=Liked.svg";

const ItemCard = ({ item, onSelectedCard, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);

  // const isLiked = item.likes.some((user) => user === currentUser?._id);
  const id = item._id;

  // const handleLike = () => {
  //   onCardLike(id, isLiked);
  // };

  return (
    <li className="card">
      <img
        className="card_image"
        src={item.clothingimage_filepath}
        onClick={() => onSelectedCard(item)}
        alt={item.name}
      />
      <div className="card_container">
        <p className="card_name">{item.name}</p>
        <button className="card__like" /*onClick={handleLike}*/>
          <img
            className="card_like-button"
            // src={isLiked ? likeButtonActive : likeButton}
            src={likeButton}
            alt="like-button"
          />
        </button>
      </div>
    </li>
  );
};

export default ItemCard;
