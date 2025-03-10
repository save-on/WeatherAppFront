import React, { useState, useEffect } from "react";
import { getPackingListItems } from "../../Utils/Api.js";
import { getItems } from "../../Utils/Api.js";
import { checkLoggedIn } from "../../Utils/token.js";
import * as api from "../../Utils/Api.js";
import "./PackingListDetailsModal.css";

const PackingListDetailsModal = ({ packingList, onClose }) => {
  const [items, setItems] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [errorLoadingItems, setErrorLoadingItems] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectedItemsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const values = selectedOptions.map((option) => option.value);
    setSelectedItems(values);
    console.log("Selected Item IDs: ", values);
  };

  const handleAddItemToPackingList = async () => {
    console.log("Add Item button clicked. Selected Item IDs:", selectedItems);

    if (!packingList) {
      console.error("Packing list is not defined.");
      return;
    }

    const packingListId = packingList.id;
    const clothingItemIds = selectedItems;
    const token = checkLoggedIn();

    if (!token) {
      console.error("User not logged in or token missing.");

      return;
    }

    if (!clothingItemIds || clothingItemIds.length === 0) {
      console.warn("No items selected to add.");
      return;
    }

    try {
      await api.postPackingListItem(packingListId, clothingItemIds, token);
      console.log("Items added to packing list successfully!");

      const tokenForFetch = checkLoggedIn();
      console.log(
        "Token for getPackingListItems (handleAddItem): ",
        tokenForFetch
      );
      const updatedPackingListItems = await getPackingListItems(packingListId);
      setItems(updatedPackingListItems);

      setSelectedItems([]);
    } catch (error) {
      console.error("Error adding items to packing list: ", error);
    }

    try {
      await api.postPackingListItem(packingListId, clothingItemIds, token);
      console.log("Items added to packing list successfully!");

      const updatedPackingListItems = await getPackingListItems(
        packingListId,
        token
      );
      setItems(updatedPackingListItems);

      setSelectedItems([]);
    } catch (error) {
      console.error("Error adding items to packing list: ", error);
    }
  };

  useEffect(() => {
    console.log(
      "PackingListDetailsModal - useEffect - packingList prop: ",
      packingList
    );
    if (!packingList) return;

    const fetchItems = async () => {
      try {
        console.log("PackingListADetailsModal - useEffect - Before checkLoggedIn()");
        const token = checkLoggedIn();
        console.log("PackingListDetailsModal - useEffect - After checkLoggedIn() - Token:", token);

        const localStorageToken = localStorage.getItem('jwt');
        console.log("PackingListDetailsModal - useEffect - localStorage Token:", localStorageToken);
        if (!token) {
          console.error(
            "PackingListDetailsModal - useEffect - No token found, cannot fetch items");
          return;
        }
        console.log("Token from getPackingListItems (useEffect): ", token);
        const packingListItemsData = await getPackingListItems(packingList.id);
        setItems(packingListItemsData);
      } catch (error) {
        console.error("Error fetching items for packing list: ", error);
      }
    };

    const fetchAvailableItems = async () => {
      try {
        const allClothingItems = await getItems();
        setAvailableItems(allClothingItems);
      } catch (error) {
        console.error("Error fetching available clothing items: ", error);
      }
    };

  
    fetchItems();
    fetchAvailableItems();
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
         
          {console.log(
            "DEBUG: Just before <img> - packingList.packinglist_image: ",
            packingList?.packinglist_image
          )}
          {console.log(
            "DEBUG: Constructed Image URL: ",
            `http://localhost:3001${packingList?.packinglist_image}`
          )}
          <img
            src={`http://localhost:3001${packingList?.packinglist_image}`}
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
            {!loadingItems && !errorLoadingItems && items.length > 0 && (
              <ul className="modal__item-list">
                {items.map((item) => (
                  <li key={item.id} className="modal__item">
                    <p className="modal__item-name">{item.name}</p>
                  </li>
                ))}
              </ul>
            )}
            {!loadingItems && !errorLoadingItems && items.length === 0 && (
              <p>No clothing items added to this packing list yet.</p>
            )}
            <div className="modal__add-item-section">
              <h4>Add Item To Packing List</h4>
              <select multiple onChange={handleSelectedItemsChange}>
                <option value="">Select an item to add</option>
                {availableItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button onClick={handleAddItemToPackingList}>Add Item</button>
            </div>
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
