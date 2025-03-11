import React from 'react';
import './PackingListItemCard.css'; 

const PackingListItemCard = ({ item }) => {
    if (!item) {
        return null; 
    }

    return (
        <li className="packing-list-item-card">
            <img
                className="packing-list-item-card__image"
                src={`http://localhost:3001${item.clothing_image}`} 
                alt={item.name}
            />
            <div className="packing-list-item-card__info">
                <h5 className="packing-list-item-card__name">{item.name}</h5>
                
            </div>
        </li>
    );
};

export default PackingListItemCard;