import React from 'react';
import './PackingListItemCard.css'; 

const PackingListItemCard = ({ item, onDelete }) => {    

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(item.clothing_item_id);
    }

    if (!item) {
        return null; 
    }

    return (
        <li className="packinglist__item-card">
            <img
                className="packinglist__item-card__image"
                src={
                    process.env.NODE_ENV === "development"
                      ? `http://localhost:3001${item.clothing_image}`
                      : `https://travelwear-aa3b8a7cc158.herokuapp.com/${item.clothing_image}`
                  }
                alt={item.name}
            />
            <div className="packinglist__item-card__info">
                <h5 className="packinglist__item-card__name">{item.name}</h5>
            </div>
            <button className="packinglist__item-delete__button" onClick={handleDelete}>
                x
            </button>
        </li>
    );
};

export default PackingListItemCard;