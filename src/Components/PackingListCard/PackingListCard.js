import React from "react";
import "../ItemCard/ItemCard.css";
import { baseUrl } from "../../Utils/Api.js";

const PackingListCard = ({ packingList, onSelectedPackingList }) => {
  return (
    <li className="card">
      <img
        className="card_image"
        src={`http://localhost:3001${packingList.packinglist_image}`}
        onClick={() => {
          console.log("packingListCard - onClick - packingList: ", packingList);
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
