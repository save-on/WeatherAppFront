import React from "react";
import "../ItemCard/ItemCard.css";

const PackingListCard = ({ packingList, onSelectedPackingList }) => {
  return (
    <li className="card">
      <img
        className="card_image"
        src={
          process.env.NODE_ENV === "development"
            ? `http://localhost:3001${packingList?.packinglist_image}`
            : `https://travelwear-aa3b8a7cc158.herokuapp.com/${packingList?.packinglist_image}`
        }
        onClick={() => {
          onSelectedPackingList(packingList);
        }}
        alt={packingList.name}
      />
      <div className="card_container">
        <p className="card_name"> {packingList.name}</p>
      </div>
    </li>
  );
};

export default PackingListCard;
