import React, { useState, useEffect } from "react";
import { getPackingListItems } from "../../Utils/Api.js";
import { getItems } from "../../Utils/Api.js";
import { checkLoggedIn } from "../../Utils/token.js";
import PackingListItemCard from "../PackingListItemCard/PackingListItemCard.js";
import * as api from "../../Utils/Api.js";
import "./PackingListDetailsModal.css";

const PackingListDetailsModal = ({
  packingList,
  onClose,
  handlePackingListDeleted,
}) => {
  const [items, setItems] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [errorLoadingItems, setErrorLoadingItems] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [token, setToken] = useState(null);

  const handleSelectedItemsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const values = selectedOptions.map((option) => option.value);
    setSelectedItems(values);
  };

  const handleAddItemToPackingList = async () => {
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

  const handleDeletePackingListItem = async (itemId) => {
    const token = checkLoggedIn();
    if (!token) {
      console.error("User not logged in.");
      return null;
    }

    try {
      await api.deletePackingListItem(packingList.id, itemId, token);
      setItems((prevItems) => {
        const updatedItems = prevItems.filter(
          (item) => item.clothing_item_id !== itemId
        );
        return updatedItems;
      });
    } catch (error) {
      console.error("Error deleting item from packing list: ", error);
    }
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this packing list " ${packingList.name}"? This action cannot be undone.`
    );
    if (confirmDelete) {
      const token = checkLoggedIn();
      if (!token) {
        console.error("User not logged in.");
        return null;
      }
      try {
        await api.deletePackingList(packingList.id, token);
        handlePackingListDeleted(packingList.id);
        onClose();
      } catch (error) {
        console.error("Error deleting packing list: ", error);
      }
    }
  };

  useEffect(() => {
    if (!packingList) {
      return;
    }

    const storedToken = localStorage.getItem("jwt");
    if (storedToken) {
      setToken(storedToken);
    }

    const fetchItems = async () => {
      try {
        const token = checkLoggedIn();

        const localStorageToken = localStorage.getItem("jwt");

        if (!token) {
          console.error(
            "PackingListDetailsModal - useEffect - No token found, cannot fetch items"
          );
          return;
        }
        const packingListItemsData = await getPackingListItems(
          packingList.id,
          token
        );
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
          <img
            src={
              process.env.NODE_ENV === "development"
                ? `http://localhost:3001/${packingList?.packinglist_image}`
                : `https://travelwear-aa3b8a7cc158.herokuapp.com/${packingList?.packinglist_image}`
            }
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
              <ul className="modal__item-list modal__item-card-list">
                {items.map((item) => (
                  <PackingListItemCard
                    key={item.id}
                    item={item}
                    onDelete={handleDeletePackingListItem}
                  />
                ))}
              </ul>
            )}
            {!loadingItems && !errorLoadingItems && items.length === 0 && (
              <p>No clothing items added to this packing list yet.</p>
            )}
            <div className="modal__add-item-section">
              <h4>Add Item To Packing List</h4>
              <select
                multiple
                className="modal__add-item-section-options"
                onChange={handleSelectedItemsChange}
              >
                <option value="">Select an item to add</option>
                {availableItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button
                className="modal__add-item-section-options__button"
                onClick={handleAddItemToPackingList}
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
        <div className="modal__footer modal__fotter_type_packing-list">
          <button
            className="modal__button modal__button-delete"
            onClick={handleDeleteClick}
          >
            Delete Packing List
          </button>
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
