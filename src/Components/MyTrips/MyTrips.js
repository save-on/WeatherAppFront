import "./MyTrips.css";
import NewHeader from "../Header/NewHeader.js";

function MyTrips({ }) {
  return (
    <div className="mytrips">
        <div className="mytrips__location">
        <p className="mytrips__location-destination">Location</p>
        <p className="mytrips__location-dates">Dates</p>
        </div>
        <div className="mytrips__weatherForecast">
        <p className="mytrips__weatherForecast-title">Weather Forecast</p>
        <div className="mytrips__weatherForecast-days">
            <ul className="mytrips__weatherForecast-days-list">
                <li className="mytrips__weatherForecast-day">Day 1</li>
                <li className="mytrips__weatherForecast-day">Day 2</li>
                <li className="mytrips__weatherForecast-day">Day 3</li>
            </ul>
        </div>
        </div>
           <div className="mytrips__suggested-packing-list">
            <p className="mytrips__suggested-packing-list-title">Suggested Packing List</p>
            <div className="mytrips__activities">Activities</div>
            <ul className="mytrips__suggested-packing-list-items-container">
                <li className="mytrips__item-category">
                    <p className="mytrips__item-category-title">Clothes</p></li>
                <li className="mytrips__item-category">
                    <p className="mytrips__item-category-title">Footwear</p></li>
                <li className="mytrips__item-category">
                    <p className="mytrips__item-category-title">Accessories</p></li>
                <li className="mytrips__item-category">
                    <p className="mytrips__item-category-title"> Personal Items</p></li>
            </ul>
        </div>
        <div className="mytrips__other-items">
            
            <div className="mytrips__other-items-container">
<p className="mytrips__other-items-text">Other Items You May Need:</p>
            </div>
        </div>
        <div className="mytrips__email-packing-list">
            <button className="mytrips__email-submit-button">Email Packing List</button>
        </div>
      
    </div>
  );
}

export default MyTrips;
