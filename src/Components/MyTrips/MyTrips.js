import "./MyTrips.css";
import Footer from "../Footer/Footer.js";
import Sunny from "../../Images/sunny.svg";
import PartlyCloudy from "../../Images/partly-cloudy.svg";
import ScatteredShowers from "../../Images/scattered-showers.svg";
import Plus from "../../Images/Plus.svg";
import Increment from "../../Images/increment.svg";
import Decrement from "../../Images/decrement.svg";
import Checkmark from "../../Images/checkmark.svg";
import { useState, useContext, useEffect, useCallback, useRef } from "react";
import Trashcan from "../../Images/trashcan.svg";
import {
  sendPackingListEmail,
  getTripById,
  deleteTrip,
  updateTrip,
} from "../../Utils/Api.js";
import { checkLoggedIn } from "../../Utils/token.js";
import CurrentUserContext from "../../Contexts/CurrentUserContext.js";
import { useParams, useNavigate } from "react-router-dom";

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

// const formatTripDates = (dateRangeString) => {
//   if (!dateRangeString) return "N/A";

//   const parts = dateRangeString.replace(/[\[)]/g, "").split(",");
//   if (parts.length < 2) return dateRangeString;

//   const startDate = new Date(parts[0]);
//   const endDate = new Date(parts[1]);

//   const formattedStartDate = formatDate(startDate);
//   const formattedEndDate = formatDate(endDate);

//   return `${formattedStartDate} - ${formattedEndDate}`;
// };
const formatTripDates = (dateRangeString) => {
  if (!dateRangeString) return "";
  try {
    const [startDateISO, endDateISO] = dateRangeString
      .replace(/[{}"\[\]]/g, "")
      .split(",");
    const startDate = new Date(startDateISO.trim());
    const endDate = new Date(endDateISO.trim());
    // Adjust format as needed
    return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
  } catch (e) {
    console.error("Error formatting trip dates:", e);
    return "";
  }
};

function MyTrips({ onRemoveActivity, onTripDeleted, customStyle }) {
  const { tripId } = useParams();
  const { currentUser, loggedIn } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const saveChangesTimeoutRef = useRef(null);

  //State for fetched trip details
  const [trip, setTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const initialEmptyItems = Array.from({ length: 9 }, () => ({
    name: "Item",
    quantity: 0,
    isEmpty: true,
    isChecked: false,
  }));
  const [clothesItems, setClothesItems] = useState([...initialEmptyItems]);
  const [footwearItems, setFootwearItems] = useState([...initialEmptyItems]);
  const [accessoriesItems, setAccessoriesItems] = useState([
    ...initialEmptyItems,
  ]);
  const [personal_items, setPersonal_items] = useState([...initialEmptyItems]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [currentActivities, setCurrentActivities] = useState("");
  const [savePending, setSavePending] = useState(false);

  let saveChangesTimeout;

  // useEffect(() => {
  //   const fetchTripDetails = async () => {
  //     if (tripId && loggedIn) {
  //       setIsLoading(true);
  //       try {
  //         const token = localStorage.getItem("jwt");
  //         if (!token) {
  //           console.error("No token found for fetching trip details.");
  //           setIsLoading(false);
  //           return;
  //         }

  //         const fetchedTrip = await getTripById(tripId, token);
  //         setTrip(fetchedTrip.trip);
  //         console.log("Fetched Trip: ", fetchedTrip.trip);

  //         if (fetchedTrip.trip.activities) {
  //           setCurrentActivities(fetchedTrip.trip.activities);
  //         }
  //         if (fetchedTrip.trip.packingList) {
  //           //set each items to each category
  //           setClothesItems(
  //             fetchedTrip.trip.packingList.clothes || [...initialEmptyItems]
  //           );
  //           setFootwearItems(
  //             fetchedTrip.trip.packingList.footwear || [...initialEmptyItems]
  //           );
  //           setAccessoriesItems(
  //             fetchedTrip.trip.packingList.accessories || [...initialEmptyItems]
  //           );
  //           setPersonal_items(
  //             fetchedTrip.trip.packingList.personal_items || [
  //               ...initialEmptyItems,
  //             ]
  //           );
  //         } else {
  //           //if no items set each category to no items
  //           setClothesItems([...initialEmptyItems]);
  //           setFootwearItems([...initialEmptyItems]);
  //           setAccessoriesItems([...initialEmptyItems]);
  //           setPersonal_items([...initialEmptyItems]);
  //         }
  //       } catch (err) {
  //         console.error("Failed to fetch trip:", err.message || err);
  //         setError(err.message || "Failed to load trip details.");
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     } else if (!tripId && loggedIn) {
  //       console.log(
  //         "MyTrips: No specific tripId, probably rendering all trips."
  //       );
  //       setIsLoading(false);
  //     } else if (!loggedIn) {
  //       console.log("MyTrips: User not logged in.");
  //       setIsLoading(false);
  //     }
  //   };
  useEffect(() => {
    const fetchTripDetails = async () => {
      if (tripId && loggedIn) {
        setIsLoading(true);
        try {
          const token = localStorage.getItem("jwt");
          if (!token) {
            console.error("No token found for fetching trip details.");
            setIsLoading(false);
            return;
          }

          const fetchedTrip = await getTripById(tripId, token);
          setTrip(fetchedTrip.trip);
          console.log("Fetched Trip: ", fetchedTrip.trip);

          if (fetchedTrip.trip.activities) {
            setCurrentActivities(fetchedTrip.trip.activities);
          }
          const loadedClothes = fetchedTrip.trip.packingList?.clothes || [];
          setClothesItems([
            ...loadedClothes,
            ...initialEmptyItems.slice(loadedClothes.length),
          ]);

          // A safer way to ensure a fixed size (e.g., 9 total slots) and fill remaining with placeholders:
          const getPaddedList = (list) => {
            const items = list || [];
            const paddedItems = [...items];
            while (paddedItems.length < 9) {
              // Ensure at least 9 slots
              paddedItems.push({
                name: "Item",
                quantity: 0,
                isEmpty: true,
                isChecked: false,
              });
            }
            return paddedItems;
          };

          setClothesItems(getPaddedList(fetchedTrip.trip.packingList?.clothes));
          setFootwearItems(
            getPaddedList(fetchedTrip.trip.packingList?.footwear)
          );
          setAccessoriesItems(
            getPaddedList(fetchedTrip.trip.packingList?.accessories)
          );
          setPersonal_items(
            getPaddedList(fetchedTrip.trip.packingList?.personal_items)
          );
        } catch (err) {
          console.error("Failed to fetch trip:", err.message || err);
          setError(err.message || "Failed to load trip details.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchTripDetails();
  }, [tripId, loggedIn]);

  // useEffect(() => {
  //   if (currentUser && currentUser.email) {
  //     setEmailStatus("");
  //   } else {
  //     setEmailStatus("Please sign in to email your packing list.");
  //   }
  // }, [currentUser]);

  // const handleRemoveActivity = (index) => {
  //   if (onRemoveActivity) {
  //     onRemoveActivity(index);
  //   }
  // };

  // const handleDeleteItem = (category, indexToDelete) => {
  //   switch (category) {
  //     case "Clothes":
  //       setClothesItems((prevItems) => {
  //         const newItems = [...prevItems];
  //         newItems[indexToDelete] = { ...initialEmptyItems[0] };
  //         return newItems;
  //       });
  //       break;
  //     case "Footwear":
  //       setFootwearItems((prevItems) => {
  //         const newItems = [...prevItems];
  //         newItems[indexToDelete] = { ...initialEmptyItems[0] };
  //         return newItems;
  //       });
  //       break;
  //     case "Accessories":
  //       setAccessoriesItems((prevItems) => {
  //         const newItems = [...prevItems];
  //         newItems[indexToDelete] = { ...initialEmptyItems[0] };
  //         return newItems;
  //       });
  //       break;
  //     case "Personal Items":
  //       setPersonal_items((prevItems) => {
  //         const newItems = [...prevItems];
  //         newItems[indexToDelete] = { ...initialEmptyItems[0] };
  //         return newItems;
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // };
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
        setPersonal_items((prevItems) => {
          const newItems = [...prevItems];
          newItems[indexToDelete] = { ...initialEmptyItems[0] };
          return newItems;
        });
        break;
      default:
        break;
    }
  };

  const handleSaveTripChanges = useCallback(async () => {
    console.log("handleSaveTripChanges triggered.");
    console.log("Current clothesItems state:", clothesItems); // This should now show your updated item!
    console.log("Current footwearItems state:", footwearItems);
    console.log("Current accessoriesItems state:", accessoriesItems);
    console.log("Current personal_items state:", personal_items);

    if (!tripId || !loggedIn) {
      console.log(
        "Cannot save changes: Trip not loaded or user is not logged in."
      );
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("No token found for saving trip changes.");
        setIsLoading(false);
        return;
      }

      const packingListToSave = {
        clothes: clothesItems.filter((item) => !item.isEmpty),
        footwear: footwearItems.filter((item) => !item.isEmpty),
        accessories: accessoriesItems.filter((item) => !item.isEmpty),
        personal_items: personal_items.filter((item) => !item.isEmpty),
      };

      console.log(
        "packingListToSave prepared (should be sent to backend):",
        packingListToSave
      );
      console.log("Sending trip update data: ", {
        destination: trip.destination, // Assuming trip is always up-to-date or its relevant parts
        startDate: trip.trip_date
          ? new Date(trip.trip_date.replace(/[\[\]\)]/g, "").split(",")[0])
          : null,
        endDate: trip.trip_date
          ? new Date(trip.trip_date.replace(/[\[\]\)]/g, "").split(",")[1])
          : null,
        activities: currentActivities,
        packingList: packingListToSave,
      });

      const tripDataToUpdate = {
        destination: trip.destination,
        startDate: trip.trip_date
          ? new Date(trip.trip_date.replace(/[\[\]\)]/g, "").split(",")[0])
          : null,
        endDate: trip.trip_date
          ? new Date(trip.trip_date.replace(/[\[\]\)]/g, "").split(",")[1])
          : null,
        activities: currentActivities,
        packingList: packingListToSave,
      };

      const response = await updateTrip(tripId, tripDataToUpdate, token);
      console.log("Trip updated successfully: ", response);
    } catch (error) {
      console.error("Error saving trip changes:", error);
      // You might want to show an error message to the user
    } finally {
      setIsLoading(false);
    }
  }, [
    tripId,
    loggedIn,
    trip, // If you're reading `trip.destination` or `trip.trip_date` directly
    clothesItems,
    footwearItems,
    accessoriesItems,
    personal_items,
    currentActivities,
  ]);

  const handleAddItem = useCallback(
    (category) => {
      if (newItemName.trim()) {
        const newItem = {
          name: newItemName.trim(),
          quantity: newItemQuantity,
          isEmpty: false,
          isChecked: false,
        };

        // Determine which state setter to use based on category
        let setState;
        let currentItems;

        switch (category) {
          case "Clothes":
            setState = setClothesItems;
            currentItems = clothesItems;
            break;
          case "Footwear":
            setState = setFootwearItems;
            currentItems = footwearItems;
            break;
          case "Accessories":
            setState = setAccessoriesItems;
            currentItems = accessoriesItems;
            break;
          case "Personal Items":
            setState = setPersonal_items;
            currentItems = personal_items;
            break;
          default:
            console.warn(`Unknown category: ${category}`);
            return; // Exit if category is not recognized
        }

        const firstEmptyIndex = currentItems.findIndex((item) => item.isEmpty);
        if (firstEmptyIndex !== -1) {
          const updatedItems = [...currentItems];
          updatedItems[firstEmptyIndex] = newItem;
          setState(updatedItems);
        } else {
          setState([...currentItems, newItem]);
        }

        setNewItemName("");
        setNewItemQuantity(1);
        setIsAddingItem(false);

        setSavePending(true);
        setCurrentCategory(null);
      }
    },
    [
      // IMPORTANT: Include all state variables and setters that handleAddItem reads or uses
      newItemName,
      newItemQuantity,
      clothesItems,
      footwearItems,
      accessoriesItems,
      personal_items,
      setClothesItems,
      setFootwearItems,
      setAccessoriesItems,
      setPersonal_items,
      setNewItemName,
      setNewItemQuantity,
      setIsAddingItem,
      setCurrentCategory,
      handleSaveTripChanges,
      saveChangesTimeoutRef,
    ]
  );

  useEffect(() => {
    if (savePending) {
      // Clear any previous timeout if a new item was added quickly
      if (saveChangesTimeoutRef.current) {
        clearTimeout(saveChangesTimeoutRef.current);
      }

      saveChangesTimeoutRef.current = setTimeout(() => {
        console.log("Debounced save triggered by savePending flag.");
        handleSaveTripChanges(); // This should now see the latest state
        setSavePending(false); // Reset the flag after triggering save
      }, 500);
    }

    // Cleanup function: clear timeout if component unmounts or effect re-runs
    return () => {
      if (saveChangesTimeoutRef.current) {
        clearTimeout(saveChangesTimeoutRef.current);
      }
    };
  }, [
    savePending, // This effect runs when savePending changes
    handleSaveTripChanges, // This function should be stable (memoized with useCallback)
    saveChangesTimeoutRef, // The ref itself
  ]);

  const handleDeleteTrip = async (tripIdToDelete) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip? This action cannot be undone."
    );
    if (!confirmDelete) {
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("No token found for deleting trip.");
        setIsLoading(false);
        return;
      }

      await deleteTrip(tripIdToDelete, token);

      //1. After delete trigger re-fetch of all trips to update list
      if (onTripDeleted) {
        onTripDeleted();
      }

      //2. Navigate back to main page
      navigate("/");
    } catch (err) {
      console.error("Failed to delete trip: ", err.message || err);
      alert(`Error deleteing trip: ${err.message || "Something went wrong"}`);
    } finally {
      setIsLoading(false);
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
        const updatedPersonalItems = personal_items.map((item, index) =>
          index === indexToUpdate ? { ...item, quantity: newQuantity } : item
        );
        setPersonal_items(updatedPersonalItems);
        break;
      default:
        break;
    }
  };

  const handleItemCheck = (category, indexToUpdate) => {
    switch (category) {
      case "clothes":
        setClothesItems((prevItems) => {
          const updatedItems = prevItems.map((item, index) =>
            index === indexToUpdate
              ? { ...item, isChecked: !item.isChecked }
              : item
          );
          setTimeout(() => handleSaveTripChanges(), 0);
          return updatedItems;
        });
        break;
      case "footwear":
        setFootwearItems((prevItems) => {
          const updatedItems = prevItems.map((item, index) =>
            index === indexToUpdate
              ? { ...item, isChecked: !item.isChecked }
              : item
          );
          setTimeout(() => handleSaveTripChanges(), 0);
          return updatedItems;
        });
        break;
      case "accessories":
        setAccessoriesItems((prevItems) => {
          const updatedItems = prevItems.map((item, index) =>
            index === indexToUpdate
              ? { ...item, isChecked: !item.isChecked }
              : item
          );
          setTimeout(() => handleSaveTripChanges(), 0);
          return updatedItems;
        });
        break;
      case "personal_items": // <--- Updated category name
        setPersonal_items((prevItems) => {
          // <--- Updated state variable
          const updatedItems = prevItems.map((item, index) =>
            index === indexToUpdate
              ? { ...item, isChecked: !item.isChecked }
              : item
          );
          setTimeout(() => handleSaveTripChanges(), 0);
          return updatedItems;
        });
        break;
      default:
        break;
    }
  };

  const handleEmailPackingList = async () => {
    const recipientEmail = currentUser?.email;

    if (!recipientEmail) {
      alert("Error: User email not found. Please log in again.");

      return;
    }

    const packingList = {
      clothes: clothesItems.filter(
        (item) => !item.isEmpty && item.quantity > 0
      ),
      footwear: footwearItems.filter(
        (item) => !item.isEmpty && item.quantity > 0
      ),
      accessories: accessoriesItems.filter(
        (item) => !item.isEmpty && item.quantity > 0
      ),
      personal_items: personal_items.filter(
        (item) => !item.isEmpty && item.quantity > 0
      ),
    };
    const authToken = localStorage.getItem("jwt");

    if (!authToken) {
      alert("You must be logged in to email your packing list.");
      return "";
    }

    const tripName = trip?.destination || "Your Trip";
    let tripDates = "";
    if (trip?.trip_date) {
      tripDates = formatTripDates(trip.trip_date);
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

  // -- ACTIVITY HANDLERS --
  const handleAddActivity = (newActivityName) => {
    if (newActivityName.trim()) {
      setCurrentActivities((prevActivities) => {
        const updatedActivities = [...prevActivities, newActivityName.trim()];
        setTimeout(() => handleSaveTripChanges(), 0);
        return updatedActivities;
      });
    }
  };

  const handleRemoveActivity = (indexToRemove) => {
    setCurrentActivities((prevActivities) => {
      const updatedActivities = prevActivities.filter(
        (_, index) => index !== indexToRemove
      );
      setTimeout(() => handleSaveTripChanges(), 0);
      return updatedActivities;
    });
  };

  const destination = trip?.destination;
  const tripDateString = trip?.trip_date;
  const activities = trip?.activities;

  let weatherForecastDaysContent = null; // Initialize a variable to hold the JSX we want to render

  if (!tripDateString) {
    // If no tripDateString, set the content to the "No trip selected" message
    weatherForecastDaysContent = (
      <span>No trip selected or dates unavailable for weather forecast.</span>
    );
  } else {
    // If tripDateString exists, proceed with parsing and calculating dates
    const dateParts = tripDateString.replace(/[\[\]()]/g, "").split(",");
    const rawStartDate =
      dateParts.length > 0 ? new Date(dateParts[0].trim()) : null;

    if (!rawStartDate || isNaN(rawStartDate.getTime())) {
      // If parsing fails, set the content to the error message
      weatherForecastDaysContent = (
        <span>No valid trip dates for weather forecast (parsing failed)</span>
      );
    } else {
      // If dates are valid, calculate and prepare the JSX for the three days
      const day1Date = rawStartDate;
      const day2Date = new Date(day1Date.getTime() + 24 * 60 * 60 * 1000);
      const day3Date = new Date(day1Date.getTime() + 2 * 24 * 60 * 60 * 1000);

      weatherForecastDaysContent = (
        <>
          {/* Day 1 */}
          <li className="mytrips__weatherForecast-day">
            <img
              className="mytrips__weatherForecast-day-weather-image"
              src={Sunny}
              alt="Sunny weather icon"
            />
            <div className="mytrips__weatherForecast-day-details">
              <p className="mytrips__weatherForecast-day-details-text">Day 1</p>
              <p className="mytrips__weatherForecast-day-details-text">
                {formatDateDay(day1Date)}
              </p>
              <p className="mytrips__weatherForecast-day-details-text">
                Sunny, 80°
              </p>
            </div>
          </li>

          {/* Day 2 */}
          <li className="mytrips__weatherForecast-day">
            <img
              className="mytrips__weatherForecast-day-weather-image"
              src={PartlyCloudy}
              alt="Partly Cloudy weather icon"
            />
            <div className="mytrips__weatherForecast-day-details">
              <p className="mytrips__weatherForecast-day-details-text">Day 2</p>
              <p className="mytrips__weatherForecast-day-details-text">
                {formatDateDay(day2Date)}
              </p>
              <p className="mytrips__weatherForecast-day-details-text">
                Partly Cloudy, 76°
              </p>
            </div>
          </li>

          {/* Day 3 */}
          <li className="mytrips__weatherForecast-day">
            <img
              className="mytrips__weatherForecast-day-weather-image"
              src={ScatteredShowers}
              alt="Scattered Showers weather icon"
            />
            <div className="mytrips__weatherForecast-day-details">
              <p className="mytrips__weatherForecast-day-details-text">Day 3</p>
              <p className="mytrips__weatherForecast-day-details-text">
                {formatDateDay(day3Date)}
              </p>
              <p className="mytrips__weatherForecast-day-details-text">
                Scattered Showers, 83°
              </p>
            </div>
          </li>
        </>
      );
    }
  }

  return (
    <div className="mytrips">
      <div className="mytrips__location">
        {destination && (
          <p className="mytrips__location-destination">{destination} </p>
        )}
        {tripDateString && (
          <p className="mytrips__location-dates">
            {formatTripDates(tripDateString)}
          </p>
        )}
      </div>
      <div className="mytrips__weatherForecast">
        <p className="mytrips__weatherForecast-title">Weather Forecast</p>
        <div className="mytrips__weatherForecast-days">
          <ul className="mytrips__weatherForecast-days-list">
            {weatherForecastDaysContent}
          </ul>
        </div>
      </div>
      <div className="mytrips__suggested-packing-list">
        <p className="mytrips__suggested-packing-list-title">
          Suggested Packing List
        </p>
        <div className="mytrips__activities">
          {activities &&
            activities.map((activities, index) => (
              <span key={index} className="mytrips__activity-tag-inside">
                <button
                  type="button"
                  className="mytrips__remove-activity-inside"
                  onClick={() => handleRemoveActivity(index)}
                >
                  X
                </button>
                {activities}
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
                <div className="mytrips__item-category-add-item-form-input-controls">
                  <div className="mytrips__item-category-add-item-form-input-quantities">
                    <img
                      className="mytrips__quantity-buttons"
                      src={Decrement}
                      onClick={() =>
                        setNewItemQuantity(Math.max(1, newItemQuantity - 1))
                      }
                    />
                    <span className="mytrips__item-category__added-item-text">
                      {newItemQuantity}
                    </span>
                    <img
                      className="mytrips__quantity-buttons"
                      src={Increment}
                      onClick={() => setNewItemQuantity(newItemQuantity + 1)}
                    />
                  </div>

                  <button
                    className="mytrips__item-category-add-button"
                    onClick={() => handleAddItem("Clothes")}
                  >
                    Add
                  </button>
                </div>

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
                <div className="mytrips__item-category-add-item-form-input-controls">
                  <div className="mytrips__item-category-add-item-form-input-quantities">
                    <img
                      className="mytrips__quantity-buttons"
                      src={Decrement}
                      onClick={() =>
                        setNewItemQuantity(Math.max(1, newItemQuantity - 1))
                      }
                    />
                    <span className="mytrips__item-category__added-item-text">
                      {newItemQuantity}
                    </span>
                    <img
                      className="mytrips__quantity-buttons"
                      src={Increment}
                      onClick={() => setNewItemQuantity(newItemQuantity + 1)}
                    />
                  </div>

                  <button
                    className="mytrips__item-category-add-button"
                    onClick={() => handleAddItem("Clothes")}
                  >
                    Add
                  </button>
                </div>
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
                <div className="mytrips__item-category-add-item-form-input-controls">
                  <div className="mytrips__item-category-add-item-form-input-quantities">
                    <img
                      className="mytrips__quantity-buttons"
                      src={Decrement}
                      onClick={() =>
                        setNewItemQuantity(Math.max(1, newItemQuantity - 1))
                      }
                    />
                    <span className="mytrips__item-category__added-item-text">
                      {newItemQuantity}
                    </span>
                    <img
                      className="mytrips__quantity-buttons"
                      src={Increment}
                      onClick={() => setNewItemQuantity(newItemQuantity + 1)}
                    />
                  </div>

                  <button
                    className="mytrips__item-category-add-button"
                    onClick={() => handleAddItem("Clothes")}
                  >
                    Add
                  </button>
                </div>
                {/* <button onClick={() => setIsAddingItem(false)}>Cancel</button> */}
              </div>
            )}
          </li>
          <li className="mytrips__item-category">
            <p className="mytrips__item-category-title">Personal Items</p>
            {personal_items.map((item, index) => (
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
                <div className="mytrips__item-category-add-item-form-input-controls">
                  <div className="mytrips__item-category-add-item-form-input-quantities">
                    <img
                      className="mytrips__quantity-buttons"
                      src={Decrement}
                      onClick={() =>
                        setNewItemQuantity(Math.max(1, newItemQuantity - 1))
                      }
                    />
                    <span className="mytrips__item-category__added-item-text">
                      {newItemQuantity}
                    </span>
                    <img
                      className="mytrips__quantity-buttons"
                      src={Increment}
                      onClick={() => setNewItemQuantity(newItemQuantity + 1)}
                    />
                  </div>

                  <button
                    className="mytrips__item-category-add-button"
                    onClick={() => handleAddItem("Clothes")}
                  >
                    Add
                  </button>
                </div>
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
        <div className="mytrips__delete-trip">
          <button
            className="mytrips__delete-trip-button"
            onClick={() => handleDeleteTrip(trip.id)}
            disabled={isLoading}
          >
            Delete Trip
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyTrips;
