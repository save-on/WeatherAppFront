import "./MyTrips.css";
import { handleRemoveActivity } from "../Main/NewMain.js";
import Sunny from "../../Images/sunny.svg";
import PartlyCloudy from "../../Images/partly-cloudy.svg";
import ScatteredShowers from "../../Images/scattered-showers.svg";

function MyTrips({ tripDetails, onRemoveActivity }) {
  const formatDate = (date) => {
    if (date instanceof Date) {
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    }
    return "";
  };

  const handleRemoveActivity = (index) => {
    if (onRemoveActivity) {
      onRemoveActivity(index);
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
                  Specific Date
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
                  Specific Date
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
                  Specific Date
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
          </li>
          <li className="mytrips__item-category">
            <p className="mytrips__item-category-title">Footwear</p>
          </li>
          <li className="mytrips__item-category">
            <p className="mytrips__item-category-title">Accessories</p>
          </li>
          <li className="mytrips__item-category">
            <p className="mytrips__item-category-title"> Personal Items</p>
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
