import CurrentUserContext from "../../Contexts/CurrentUserContext.js";
import "./ItemCard.css";
import { useContext } from "react";
import likeButton from "../../Images/State=Default.svg";
import likeButtonActive from "../../Images/heart.png";

const ItemCard = ({ item, onSelectedCard, onCardLike, loggedIn }) => {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some((user) => user === currentUser._id);

  const handleLike = () => {
    onCardLike(item.id, isLiked);
  };

  const likeBtnClassName = `card_like ${
    loggedIn ? "card_like-visible" : "card_like-hidden"
  }`;

  return (
    <li className="card">
      <img
        className="card_image"
        src={
          process.env.NODE_ENV === "development"
            ? `http://localhost:3001/${item.clothing_image}`
            : `https://travelwear-aa3b8a7cc158.herokuapp.com/${item.clothing_image}`
        }
        onClick={() => onSelectedCard(item)}
        alt={item.name}
      />
      <div className="card_container">
        <p className="card_name">{item.name}</p>
        <button className={likeBtnClassName} onClick={handleLike}>
          <img
            className="card_like-button"
            src={isLiked ? likeButtonActive : likeButton}
            alt="like-button"
          />
        </button>
      </div>
    </li>
  );
};

export default ItemCard;
