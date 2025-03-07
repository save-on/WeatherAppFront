import React, { useState, useEffect } from "react";
import { getPackingListItems } from "../../Utils/Api.js";
import { checkLoggedIn } from "../../Utils/token.js";
import "./PackingListDetailsModal.css";

const PackingListDetailsModal = ({ packingList, onClose }) => {
  const [packingListItems, setPackingListItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [errorLoadingItems, setErrorLoadingItems] = useState(null);

  useEffect(() => {
    console.log("PackingListDetailsModal - useEffect - packingList prop: ", packingList);
    if (!packingList) return;

    const fetchItems = async () => {
      setLoadingItems(true);
      setErrorLoadingItems(null);
      try {
        const token = checkLoggedIn();
        const items = await getPackingListItems(packingList.id, token);
        setPackingListItems(items);
        setLoadingItems(false);
      } catch (error) {
        console.error("Error fetching items for packing list: ", error);
        setErrorLoadingItems(error);
        setLoadingItems(false);
      }
    };

    fetchItems();
  }, [packingList]);

  return (
    <div
      className={`modal modal__type_packing-list ${
        packingList ? "modal_opened" : ""
      }`}
    >
      <div className="modal__content modal__content_type_packing-list">
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <div className="modal__header">
          <h3 className="modal__title">
            {packingList?.name || "Packing List Details"}
          </h3>
        </div>
        <div className="modal__body modal__body_type_packing-list">
          <img
            src={`http://localhost:3001${packingList?.image_filepath}`}
            alt={packingList?.name}
            className="modal__image"
          />
          <p className="modal__text">Location: {packingList?.location}</p>
          <p className="modal__text">
            Weather: {packingList?.weather_condition}
          </p>

          <div className="modal__items-section">
            <h4>Clothing Items In This Packing List:</h4>
            {loadingItems && <p>Loading Items...</p>}
            {errorLoadingItems && (
              <p className="modal__error">
                Error loading items: {errorLoadingItems.message}
              </p>
            )}
            {!loadingItems &&
              !errorLoadingItems &&
              packingListItems.length > 0 && (
                <ul className="modal__item-list">
                  {packingListItems.map((item) => (
                    <li key={item.id} className="modal__item">
                      <p className="modal__item-name">{item.name}</p>
                    </li>
                  ))}
                </ul>
              )}
            {!loadingItems &&
              !errorLoadingItems &&
              packingListItems.length === 0 && (
                <p>No clothing items added to this packing list yet.</p>
              )}
          </div>
        </div>
        <div className="modal__footer modal__fotter_type_packing-list">
          <button
            className="modal__button modal__button-close"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackingListDetailsModal;
