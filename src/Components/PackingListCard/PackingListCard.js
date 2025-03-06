import React from "react";
import "../ItemCard/ItemCard.css";


const PackingListCard = ({ packingList, onSelectedPackingList }) => {
  


    return (
        <li className="card">
            <img 
            className="card_image"
            src={`http://localhost:3001${packingList.image_filepath}`}
            onClick={() => onSelectedPackingList(packingList)}
            alt={packingList.name}
            />
            <div className="card_container">
                <p className="card_name"> {packingList.name}</p>
            </div>
        </li>
    );
};

export default PackingListCard;