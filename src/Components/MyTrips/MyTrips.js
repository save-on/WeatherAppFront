import "./MyTrips.css";
import Sunny from "../../Images/sunny.svg";
import PartlyCloudy from "../../Images/partly-cloudy.svg";
import ScatteredShowers from "../../Images/scattered-showers.svg";
import Plus from "../../Images/Plus.svg";
import Increment from "../../Images/Increment.svg";
import Decrement from "../../Images/decrement.svg";
import Checkmark from "../../Images/checkmark.svg";
import { useState, useContext, useEffect } from "react";
import Trashcan from "../../Images/trashcan.svg";
import { sendPackingListEmail } from "../../Utils/Api.js";
import { checkLoggedIn } from "../../Utils/token.js";
import CurrentUserContext from "../../Contexts/CurrentUserContext.js";

function MyTrips({ tripDetails, onRemoveActivity }) {
  const initialEmptyItems = Array(9).fill({
    name: "Item",
    quantity: 0,
    isEmpty: true,
    isChecked: false,
  });
  const [clothesItems, setClothesItems] = useState([...initialEmptyItems]);
  const [footwearItems, setFootwearItems] = useState([...initialEmptyItems]);
  const [accessoriesItems, setAccessoriesItems] = useState([
    ...initialEmptyItems,
  ]);
  const [personalItems, setPersonalItems] = useState([...initialEmptyItems]);

  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isAddingItem, setIsAddingItem] = useState(false);

  const [emailStatus, setEmailStatus] = useState("");

  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  useEffect(() => {
    console.log("MyTrips.js: currentUser from context:", currentUser);
    if (currentUser && currentUser.email) {
      console.log("MyTrips.js: User email available:", currentUser.email);
      setEmailStatus("");
    } else {
      console.log("MyTrips.js: User email NOT available in context.");
      setEmailStatus("Please sign in to email your packing list.");
    }
  }, [currentUser]);

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
      const newItem = {
        name: newItemName.trim(),
        quantity: newItemQuantity,
        isEmpty: false,
        isChecked: false,
      };
      switch (category) {
        case "Clothes":
          const firstEmptyIndexClothes = clothesItems.findIndex(
            (item) => item.isEmpty
          );
          if (firstEmptyIndexClothes !== -1) {
            const newClothes = [...clothesItems];
            newClothes[firstEmptyIndexClothes] = newItem;
            setClothesItems(newClothes);
          } else {
            setClothesItems([...clothesItems, newItem]);
          }
          break;
        case "Footwear":
          const firstEmptyIndexFootwear = footwearItems.findIndex(
            (item) => item.isEmpty
          );
          if (firstEmptyIndexFootwear !== -1) {
            const newFootwear = [...footwearItems];
            newFootwear[firstEmptyIndexFootwear] = newItem;
            setFootwearItems(newFootwear);
          } else {
            setFootwearItems([...footwearItems, newItem]);
          }
          break;
        case "Accessories":
          const firstEmptyIndexAccessories = accessoriesItems.findIndex(
            (item) => item.isEmpty
          );
          if (firstEmptyIndexAccessories !== -1) {
            const newAccessories = [...accessoriesItems];
            newAccessories[firstEmptyIndexAccessories] = newItem;
            setAccessoriesItems(newAccessories);
          } else {
            setAccessoriesItems([...accessoriesItems, newItem]);
          }
          break;
        case "Personal Items":
          const firstEmptyIndexPersonal = personalItems.findIndex(
            (item) => item.isEmpty
          );
          if (firstEmptyIndexPersonal !== -1) {
            const newPersonal = [...personalItems];
            newPersonal[firstEmptyIndexPersonal] = newItem;
            setPersonalItems(newPersonal);
          } else {
            setPersonalItems([...personalItems, newItem]);
          }
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
        setClothesItems((prevItems) => {
          const newItems = [...prevItems];
          newItems[indexToDelete] = { ...initialEmptyItems[0] };
          return newItems;
        });
        break;
      case "Footwear":
        setFootwearItems((prevItems) => {
          const newItems = [...prevItems];
          newItems[indexToDelete] = { ...initialEmptyItems[0] };
          return newItems;
        });
        break;
      case "Accessories":
        setAccessoriesItems((prevItems) => {
          const newItems = [...prevItems];
          newItems[indexToDelete] = { ...initialEmptyItems[0] };
          return newItems;
        });
        break;
      case "Personal Items":
        setPersonalItems((prevItems) => {
          const newItems = [...prevItems];
          newItems[indexToDelete] = { ...initialEmptyItems[0] };
          return newItems;
        });
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

  const handleItemCheck = (category, indexToUpdate) => {
    switch (category) {
      case "Clothes":
        setClothesItems((prevItems) =>
          prevItems.map((item, index) =>
            index === indexToUpdate
              ? { ...item, isChecked: !item.isChecked }
              : item
          )
        );
        break;
      case "Footwear":
        setFootwearItems((prevItems) =>
          prevItems.map((item, index) =>
            index === indexToUpdate
              ? { ...item, isChecked: !item.isChecked }
              : item
          )
        );
        break;
      case "Accessories":
        setAccessoriesItems((prevItems) =>
          prevItems.map((item, index) =>
            index === indexToUpdate
              ? { ...item, isChecked: !item.isChecked }
              : item
          )
        );
        break;
      case "Personal Items":
        setPersonalItems((prevItems) =>
          prevItems.map((item, index) =>
            index === indexToUpdate
              ? { ...item, isChecked: !item.isChecked }
              : item
          )
        );
        break;
      default:
        break;
    }
  };

  const handleEmailPackingList = async () => {
    console.log("Attempting to send email. Current user:", currentUser);
    const recipientEmail = currentUser?.email;

    if (!recipientEmail) {
      alert("Error: User email not found. Please log in again.");
      console.error("Recipient email is null or undefined.");
      return;
    }

    const packingList = {
      clothes: clothesItems,
      footwear: footwearItems,
      accessories: accessoriesItems,
      personal: personalItems,
    };
    const authToken = localStorage.getItem("jwt");
    console.log('Auth Token: ', authToken);

    if (!authToken) {
      alert("You must be logged in to email your packing list.");
      return "";
    }

    const tripName = tripDetails.location || "Your Trip";
    let tripDates = "";
    if (
      tripDetails.travelDates &&
      tripDetails.travelDates.startDate &&
      tripDetails.travelDates.endDate
    ) {
      const formattedStartDate = formatDate(tripDetails.travelDates.startDate);
      const formattedEndDate = formatDate(tripDetails.travelDates.endDate);
      tripDates = `${formattedStartDate} - ${formattedEndDate}`;
    }

    try {
      const response = await sendPackingListEmail(
        {
          ...packingList,
          tripName,
          tripDates,
        },
        authToken
      );

      if (response && response.message) {
        alert(response.message);
      } else {
        alert("Packing list sent to your email!");
      }
    } catch (error) {
      console.error("Error sending packing list email: ", error);
      alert(error.message || "Failed to send packing list. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem(currentCategory);
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
              <div
                key={index}
                className={`mytrips__item-category__added-item ${
                  !item.isEmpty ? "mytrips__item-not-empty" : ""
                }`}
              >
                <label className="mytrips__checkbox-lable">
                  <input
                    className="mytrips__item-category__added-item-checkbox"
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={() => handleItemCheck("Clothes", index)}
                    disabled={item.isEmpty}
                  />
                  <span className="custom-checkbox-box">
                    {item.isChecked && (
                      <img
                        className="mytrips__checkmark"
                        src={Checkmark}
                        alt="Checked"
                      />
                    )}
                  </span>
                  <span className="mytrips__item-name-text">
                    {item.isEmpty ? (
                      <>Item {item.quantity === 0 && "(quantity)"}</>
                    ) : (
                      <>{item.name}</>
                    )}
                  </span>
                </label>
                <div className="mytrips__quantity-controls">
                  <img
                    className="mytrips__quantity-button"
                    src={Decrement}
                    onClick={() =>
                      handleQuantityChange(
                        "Clothes",
                        index,
                        Math.max(0, item.quantity - 1)
                      )
                    }
                  />
                  <span className="mytrips__item-category__added-item-text">
                    {item.quantity > 0 && !item.isEmpty
                      ? `${item.quantity}`
                      : ""}
                  </span>
                  <img
                    className="mytrips__quantity-button"
                    src={Increment}
                    onClick={() =>
                      handleQuantityChange(
                        "Clothes",
                        index,
                        Math.max(0, item.quantity + 1)
                      )
                    }
                  />
                </div>
                {!item.isEmpty && (
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
                )}
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
                  <img
                    className="mytrips__item-category-add-item-image"
                    src={Plus}
                    alt="Add Item"
                  />
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
                  onKeyDown={handleKeyPress}
                />
                <img
                  className="mytrips__quantity-button"
                  src={Decrement}
                  onClick={() =>
                    setNewItemQuantity(Math.max(1, newItemQuantity - 1))
                  }
                />
                <span className="mytrips__item-category__added-item-text">
                  {newItemQuantity}
                </span>
                <img
                  className="mytrips__quantity-button"
                  src={Increment}
                  onClick={() => setNewItemQuantity(newItemQuantity + 1)}
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
                <label className="mytrips__checkbox-lable">
                  <input
                    className="mytrips__item-category__added-item-checkbox"
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={() => handleItemCheck("Footwear", index)}
                    disabled={item.isEmpty}
                  />
                  <span className="custom-checkbox-box">
                    {item.isChecked && (
                      <img
                        className="mytrips__checkmark"
                        src={Checkmark}
                        alt="Checked"
                      />
                    )}
                  </span>
                  <span className="mytrips__item-name-text">
                    {item.isEmpty ? (
                      <>Item {item.quantity === 0 && "(quantity)"}</>
                    ) : (
                      <>{item.name}</>
                    )}
                  </span>
                </label>
                <div className="mytrips__quantity-controls">
                  <img
                    className="mytrips__quantity-button"
                    src={Decrement}
                    onClick={() =>
                      handleQuantityChange(
                        "Footwear",
                        index,
                        Math.max(0, item.quantity - 1)
                      )
                    }
                  />
                  <span className="mytrips__item-category__added-item-text">
                    {item.quantity > 0 && !item.isEmpty
                      ? `${item.quantity}`
                      : ""}
                  </span>
                  <img
                    className="mytrips__quantity-button"
                    src={Increment}
                    onClick={() =>
                      handleQuantityChange(
                        "Footwear",
                        index,
                        Math.max(0, item.quantity + 1)
                      )
                    }
                  />
                </div>
                {!item.isEmpty && (
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
                )}
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
                  <img
                    className="mytrips__item-category-add-item-image"
                    src={Plus}
                    alt="Add Item"
                  />
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
                  onKeyDown={handleKeyPress}
                />
                <img
                  className="mytrips__quantity-button"
                  src={Decrement}
                  onClick={() =>
                    setNewItemQuantity(Math.max(1, newItemQuantity - 1))
                  }
                />
                <span className="mytrips__item-category__added-item-text">
                  {newItemQuantity}
                </span>
                <img
                  className="mytrips__quantity-button"
                  src={Increment}
                  onClick={() => setNewItemQuantity(newItemQuantity + 1)}
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
                <label className="mytrips__checkbox-lable">
                  <input
                    className="mytrips__item-category__added-item-checkbox"
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={() => handleItemCheck("Accessories", index)}
                    disabled={item.isEmpty}
                  />
                  <span className="custom-checkbox-box">
                    {item.isChecked && (
                      <img
                        className="mytrips__checkmark"
                        src={Checkmark}
                        alt="Checked"
                      />
                    )}
                  </span>
                  <span className="mytrips__item-name-text">
                    {item.isEmpty ? (
                      <>Item {item.quantity === 0 && "(quantity)"}</>
                    ) : (
                      <>{item.name}</>
                    )}
                  </span>
                </label>
                <div className="mytrips__quantity-controls">
                  <img
                    className="mytrips__quantity-button"
                    src={Decrement}
                    onClick={() =>
                      handleQuantityChange(
                        "Accessories",
                        index,
                        Math.max(0, item.quantity - 1)
                      )
                    }
                  />
                  <span className="mytrips__item-category__added-item-text">
                    {item.quantity > 0 && !item.isEmpty
                      ? `${item.quantity}`
                      : ""}
                  </span>
                  <img
                    className="mytrips__quantity-button"
                    src={Increment}
                    onClick={() =>
                      handleQuantityChange(
                        "Accessories",
                        index,
                        Math.max(0, item.quantity + 1)
                      )
                    }
                  />
                </div>
                {!item.isEmpty && (
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
                )}
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
                  <img
                    className="mytrips__item-category-add-item-image"
                    src={Plus}
                    alt="Add Item"
                  />
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
                  onKeyDown={handleKeyPress}
                />
                <img
                  className="mytrips__quantity-button"
                  src={Decrement}
                  onClick={() =>
                    setNewItemQuantity(Math.max(1, newItemQuantity - 1))
                  }
                />
                <span className="mytrips__item-category__added-item-text">
                  {newItemQuantity}
                </span>
                <img
                  className="mytrips__quantity-button"
                  src={Increment}
                  onClick={() => setNewItemQuantity(newItemQuantity + 1)}
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
                <label className="mytrips__checkbox-lable">
                  <input
                    className="mytrips__item-category__added-item-checkbox"
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={() => handleItemCheck("Personal Items", index)}
                    disabled={item.isEmpty}
                  />
                  <span className="custom-checkbox-box">
                    {item.isChecked && (
                      <img
                        className="mytrips__checkmark"
                        src={Checkmark}
                        alt="Checked"
                      />
                    )}
                  </span>
                  <span className="mytrips__item-name-text">
                    {item.isEmpty ? (
                      <>Item {item.quantity === 0 && "(quantity)"}</>
                    ) : (
                      <>{item.name}</>
                    )}
                  </span>
                </label>
                <div className="mytrips__quantity-controls">
                  <img
                    className="mytrips__quantity-button"
                    src={Decrement}
                    onClick={() =>
                      handleQuantityChange(
                        "Personal Items",
                        index,
                        Math.max(0, item.quantity - 1)
                      )
                    }
                  />
                  <span className="mytrips__item-category__added-item-text">
                    {item.quantity > 0 && !item.isEmpty
                      ? `${item.quantity}`
                      : ""}
                  </span>
                  <img
                    className="mytrips__quantity-button"
                    src={Increment}
                    onClick={() =>
                      handleQuantityChange(
                        "Personal Items",
                        index,
                        Math.max(0, item.quantity + 1)
                      )
                    }
                  />
                </div>
                {!item.isEmpty && (
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
                )}
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
                  <img
                    className="mytrips__item-category-add-item-image"
                    src={Plus}
                    alt="Add Item"
                  />
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
                  onKeyDown={handleKeyPress}
                />
                <img
                  className="mytrips__quantity-button"
                  src={Decrement}
                  onClick={() =>
                    setNewItemQuantity(Math.max(1, newItemQuantity - 1))
                  }
                />
                <span className="mytrips__item-category__added-item-text">
                  {newItemQuantity}
                </span>
                <img
                  className="mytrips__quantity-button"
                  src={Increment}
                  onClick={() => setNewItemQuantity(newItemQuantity + 1)}
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
        {emailStatus && (
          <p className="mytrips__email-status-message">{emailStatus}</p>
        )}
        <button
          type="button"
          className="mytrips__email-submit-button"
          onClick={handleEmailPackingList}
          disabled={!!emailStatus}
        >
          Email Packing List
        </button>
      </div>
      <div>
        <button>
          Delete Trip
        </button>
      </div>
    </div>
  );
}

export default MyTrips;
