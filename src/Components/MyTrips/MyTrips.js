import "./MyTrips.css";
import Sunny from "../../Images/sunny.svg";
import PartlyCloudy from "../../Images/partly-cloudy.svg";
import ScatteredShowers from "../../Images/scattered-showers.svg";
import Plus from "../../Images/plus.svg";
import { useState } from "react";
import Trashcan from "../../Images/trashcan.svg";

function MyTrips({ tripDetails, onRemoveActivity }) {
  const [clothesItems, setClothesItems] = useState([]);
  const [footwearItems, setFootwearItems] = useState([]);
  const [accessoriesItems, setAccessoriesItems] = useState([]);
  const [personalItems, setPersonalItems] = useState([]);

  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState([1]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isAddingItem, setIsAddingItem] = useState(false);

  const formatDate = (date) => {
    if (date instanceof Date) {
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    }
    return "";
  };

  const formatDateDay = (date) => {
    if (date instanceof Date) {
      const options = { weekday: "long", month: "long", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    }
    return "";
  };

  const handleRemoveActivity = (index) => {
    if (onRemoveActivity) {
      onRemoveActivity(index);
    }
  };

  const handleAddItem = (category) => {
    if (newItemName.trim()) {
      const newItem = { name: newItemName.trim(), quantity: newItemQuantity };
      switch (category) {
        case "Clothes":
          const newClothes = [...clothesItems, newItem];
          setClothesItems(newClothes);
          break;
        case "Footwear":
          setFootwearItems([...footwearItems, newItem]);
          break;
        case "Accessories":
          setAccessoriesItems([...accessoriesItems, newItem]);
          break;
        case "Personal Items":
          setPersonalItems([...personalItems, newItem]);
          break;
        default:
          break;
      }
      setNewItemName("");
      setNewItemQuantity(1);
      setIsAddingItem(false);
      setCurrentCategory(null);
    }
  };

  const handleDeleteItem = (category, indexToDelete) => {
    switch (category) {
      case "Clothes":
        setClothesItems(
          clothesItems.filter((_, index) => index !== indexToDelete)
        );
        break;
      case "Footwear":
        setFootwearItems(
          footwearItems.filter((_, index) => index !== indexToDelete)
        );
        break;
      case "Accessories":
        setAccessoriesItems(
          accessoriesItems.filter((_, index) => index !== indexToDelete)
        );
        break;
      case "Personal Items":
        setPersonalItems(
          personalItems.filter((_, index) => index !== indexToDelete)
        );
        break;
      default:
        break;
    }
  };

  const handleQuantityChange = (category, indexToUpdate, newQuantity) => {
    switch (category) {
      case "Clothes":
        const updatedClothesItems = clothesItems.map((item, index) =>
          index === indexToUpdate ? { ...item, quantity: newQuantity } : item
        );
        setClothesItems(updatedClothesItems);
        break;
      case "Footwear":
        const updatedFootwearItems = footwearItems.map((item, index) =>
          index === indexToUpdate ? { ...item, quantity: newQuantity } : item
        );
        setFootwearItems(updatedFootwearItems);
        break;
      case "Accessories":
        const updatedAccessoriesItems = accessoriesItems.map((item, index) =>
          index === indexToUpdated ? { ...item, quantity: newQuantity } : item
        );
        setAccessoriesItems(updatedAccessoriesItems);
        break;
      case "Personal Items":
        const updatedPersonalItems = personalItems.map((item, index) =>
          index === indexToUpdate ? { ...item, quantity: newQuantity } : item
        );
        setPersonalItems(updatedPersonalItems);
        break;
      default:
        break;
    }
  };

  return (
    <div className="mytrips">
      <div className="mytrips__location">
        {tripDetails.location && (
          <p className="mytrips__location-destination">
            {tripDetails.location}{" "}
          </p>
        )}
        {tripDetails.travelDates &&
          tripDetails.travelDates.startDate &&
          tripDetails.travelDates.endDate && (
            <p className="mytrips__location-dates">
              {formatDate(tripDetails.travelDates.startDate)} -{" "}
              {formatDate(tripDetails.travelDates.endDate)}
            </p>
          )}
      </div>
      <div className="mytrips__weatherForecast">
        <p className="mytrips__weatherForecast-title">Weather Forecast</p>
        <div className="mytrips__weatherForecast-days">
          <ul className="mytrips__weatherForecast-days-list">
            <li className="mytrips__weatherForecast-day">
              <img
                className="mytrips__weatherForecast-day-weather-image"
                src={Sunny}
              />
              <div className="mytrips__weatherForecast-day-details">
                <p className="mytrips__weatherForecast-day-details-text">
                  Day 1
                </p>
                <p className="mytrips__weatherForecast-day-details-text">
                  {formatDateDay(tripDetails.travelDates.startDate)}
                </p>
                <p className="mytrips__weatherForecast-day-details-text">
                  Sunny, 80°
                </p>
              </div>
            </li>
            <li className="mytrips__weatherForecast-day">
              <img
                className="mytrips__weatherForecast-day-weather-image"
                src={PartlyCloudy}
              />
              <div className="mytrips__weatherForecast-day-details">
                <p className="mytrips__weatherForecast-day-details-text">
                  Day 2
                </p>
                <p className="mytrips__weatherForecast-day-details-text">
                  {formatDateDay(
                    new Date(
                      tripDetails.travelDates.startDate.getTime() +
                        24 * 60 * 60 * 1000
                    )
                  )}
                </p>
                <p className="mytrips__weatherForecast-day-details-text">
                  Partly Cloudy, 76°
                </p>
              </div>
            </li>
            <li className="mytrips__weatherForecast-day">
              <img
                className="mytrips__weatherForecast-day-weather-image"
                src={ScatteredShowers}
              />
              <div className="mytrips__weatherForecast-day-details">
                <p className="mytrips__weatherForecast-day-details-text">
                  Day 3
                </p>
                <p className="mytrips__weatherForecast-day-details-text">
                  {formatDateDay(
                    new Date(
                      tripDetails.travelDates.startDate.getTime() +
                        2 * 24 * 60 * 60 * 1000
                    )
                  )}
                </p>
                <p className="mytrips__weatherForecast-day-details-text">
                  Scattered Showers, 83°
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="mytrips__suggested-packing-list">
        <p className="mytrips__suggested-packing-list-title">
          Suggested Packing List
        </p>

        <div className="mytrips__activities">
          {tripDetails.activities.map((activity, index) => (
            <span key={index} className="mytrips__activity-tag-inside">
              <button
                type="button"
                className="mytrips__remove-activity-inside"
                onClick={() => handleRemoveActivity(index)}
              >
                X
              </button>
              {activity}
            </span>
          ))}
        </div>
        <ul className="mytrips__suggested-packing-list-items-container">
          <li className="mytrips__item-category">
            <p className="mytrips__item-category-title">Clothes</p>
            {clothesItems.map((item, index) => (
              <div key={index} className="mytrips__item-category__added-item">
                <input
                  className="mytrips__item-category__added-item-checkbox"
                  type="checkbox"
                />
                <span className="mytrips__item-category__added-item-text">
                  {item.name} {item.quantity > 0 ? `(${item.quantity})` : ""}
                </span>
                <div className="mytrips__quantity-controls">
                  <button
                    type="button"
                    className="mytrips__quantity-button"
                    onClick={() =>
                      handleQuantityChange("Clothes", index, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="mytrips__quantity-button"
                    onClick={() =>
                      handleQuantityChange(
                        "Clothes",
                        index,
                        Math.max(0, item.quantity - 1)
                      )
                    }
                  >
                    -
                  </button>
                </div>
                <button
                  type="button"
                  className="mytrips__delete-item-button"
                  onClick={() => handleDeleteItem("Clothes", index)}
                >
                  <img
                    src={Trashcan}
                    alt="Delete"
                    className="mytrips__delete-icon"
                  />
                </button>
              </div>
            ))}
            {!isAddingItem || currentCategory !== "Clothes" ? (
              <div className="mytrips__item-category-add-item">
                <button
                  className="mytrips__item-category-add-item-button"
                  type="button"
                  onClick={() => {
                    setIsAddingItem(true);
                    setCurrentCategory("Clothes");
                  }}
                >
                  <img src={Plus} alt="Add Item" />
                </button>
                <p className="mytrips__item-category-add-item-text">Add Item</p>
              </div>
            ) : (
              <div className="mytrips__item-category-add-item-form">
                <input
                  className="mytrips__item-category-add-item-form-input"
                  type="text"
                  placeholder="Item Name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                />
                <input
                  className="mytrips__item-category-add-item-form-quantity"
                  type="number"
                  min="1"
                  value={newItemQuantity}
                  onChange={(e) => setNewItemQuantity(parseInt(e.target.value))}
                />
                <button
                  className="mytrips__item-category-add-button"
                  onClick={() => handleAddItem("Clothes")}
                >
                  Add
                </button>
                {/* <button onClick={() => setIsAddingItem(false)}>Cancel</button> */}
              </div>
            )}
          </li>
          <li className="mytrips__item-category">
            <p className="mytrips__item-category-title">Footwear</p>
            {footwearItems.map((item, index) => (
              <div key={index} className="mytrips__item-category__added-item">
                <input
                  className="mytrips__item-category__added-item-checkbox"
                  type="checkbox"
                />
                <span>
                  {item.name} {item.quantity > 0 ? `(${item.quantity})` : ""}
                </span>
                <button
                  type="button"
                  className="mytrips__delete-item-button"
                  onClick={() => handleDeleteItem("Footwear", index)}
                >
                  <img
                    src={Trashcan}
                    alt="Delete"
                    className="mytrips__delete-icon"
                  />
                </button>
              </div>
            ))}
            {!isAddingItem || currentCategory !== "Footwear" ? (
              <div className="mytrips__item-category-add-item">
                <button
                  className="mytrips__item-category-add-item-button"
                  type="button"
                  onClick={() => {
                    setIsAddingItem(true);
                    setCurrentCategory("Footwear");
                  }}
                >
                  <img src={Plus} alt="Add Item" />
                </button>
                <p className="mytrips__item-category-add-item-text">Add Item</p>
              </div>
            ) : (
              <div className="mytrips__item-category-add-item-form">
                <input
                  className="mytrips__item-category-add-item-form-input"
                  type="text"
                  placeholder="Item Name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                />
                <input
                  type="number"
                  min="1"
                  value={newItemQuantity}
                  onChange={(e) => setNewItemQuantity(parseInt(e.target.value))}
                  className="mytrips__item-category-add-item-form-quantity"
                />
                <button
                  className="mytrips__item-category-add-button"
                  onClick={() => handleAddItem("Footwear")}
                >
                  Add
                </button>
                {/* <button onClick={() => setIsAddingItem(false)}>Cancel</button> */}
              </div>
            )}
          </li>
          <li className="mytrips__item-category">
            <p className="mytrips__item-category-title">Accessories</p>
            {accessoriesItems.map((item, index) => (
              <div key={index} className="mytrips__item-category__added-item">
                <input
                  className="mytrips__item-category__added-item-checkbox"
                  type="checkbox"
                />
                <span>
                  {item.name} {item.quantity > 0 ? `(${item.quantity})` : ""}
                </span>
                <button
                  type="button"
                  className="mytrips__delete-item-button"
                  onClick={() => handleDeleteItem("Accessories", index)}
                >
                  <img
                    src={Trashcan}
                    alt="Delete"
                    className="mytrips__delete-icon"
                  />
                </button>
              </div>
            ))}
            {!isAddingItem || currentCategory !== "Accessories" ? (
              <div className="mytrips__item-category-add-item">
                <button
                  className="mytrips__item-category-add-item-button"
                  type="button"
                  onClick={() => {
                    setIsAddingItem(true);
                    setCurrentCategory("Accessories");
                  }}
                >
                  <img src={Plus} alt="Add Item" />
                </button>
                <p className="mytrips__item-category-add-item-text">Add Item</p>
              </div>
            ) : (
              <div className="mytrips__item-category-add-item-form">
                <input
                  className="mytrips__item-category-add-item-form-input"
                  type="text"
                  placeholder="Item Name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                />
                <input
                  type="number"
                  min="1"
                  value={newItemQuantity}
                  onChange={(e) => setNewItemQuantity(parseInt(e.target.value))}
                  className="mytrips__item-category-add-item-form-quantity"
                />
                <button
                  className="mytrips__item-category-add-button"
                  onClick={() => handleAddItem("Accessories")}
                >
                  Add
                </button>
                {/* <button onClick={() => setIsAddingItem(false)}>Cancel</button> */}
              </div>
            )}
          </li>
          <li className="mytrips__item-category">
            <p className="mytrips__item-category-title">Personal Items</p>
            {personalItems.map((item, index) => (
              <div key={index} className="mytrips__item-category__added-item">
                <input
                  className="mytrips__item-category__added-item-checkbox"
                  type="checkbox"
                />
                <span>
                  {item.name} {item.quantity > 0 ? `(${item.quantity})` : ""}
                </span>
                <button
                  type="button"
                  className="mytrips__delete-item-button"
                  onClick={() => handleDeleteItem("Personal Items", index)}
                >
                  <img
                    src={Trashcan}
                    alt="Delete"
                    className="mytrips__delete-icon"
                  />
                </button>
              </div>
            ))}
            {!isAddingItem || currentCategory !== "Personal Items" ? (
              <div className="mytrips__item-category-add-item">
                <button
                  className="mytrips__item-category-add-item-button"
                  type="button"
                  onClick={() => {
                    setIsAddingItem(true);
                    setCurrentCategory("Personal Items");
                  }}
                >
                  <img src={Plus} alt="Add Item" />
                </button>
                <p className="mytrips__item-category-add-item-text">Add Item</p>
              </div>
            ) : (
              <div className="mytrips__item-category-add-item-form">
                <input
                  className="mytrips__item-category-add-item-form-input"
                  type="text"
                  placeholder="Item Name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                />
                <input
                  type="number"
                  min="1"
                  value={newItemQuantity}
                  onChange={(e) => setNewItemQuantity(parseInt(e.target.value))}
                  className="mytrips__item-category-add-item-form-quantity"
                />
                <button
                  className="mytrips__item-category-add-button"
                  onClick={() => handleAddItem("Personal Items")}
                >
                  Add
                </button>
                {/* <button onClick={() => setIsAddingItem(false)}>Cancel</button> */}
              </div>
            )}
          </li>
        </ul>
      </div>
      <div className="mytrips__other-items">
        <div className="mytrips__other-items-container">
          <p className="mytrips__other-items-text">Other Items You May Need:</p>
        </div>
      </div>
      <div className="mytrips__email-packing-list">
        <button className="mytrips__email-submit-button">
          Email Packing List
        </button>
      </div>
    </div>
  );
}

export default MyTrips;
