import "./NewMain.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm.js";
import { useForm } from "../../hooks/useForm.js";

function NewMain({}) {
  const { values, handleChanges, setValues } = useForm({
    location: "",
    date: "",
    activity: "",
  });

  return (
    <div className="newMain">
      <div className="newMain__title">
        <p className="newMain__title-text">Pack Smarter. Travel Lighter.</p>
      </div>
      <div className="newMain__title-description">
        <p>
          From city escapes to backcountry hikes, your perfect packing list is a
          click away.
        </p>
      </div>
      <div className="newMain__container">
        <ul className="newMain__inputs">
          <label className="newMain__input-header" htmlFor="location">
            Where
          </label>
          <li className="newMain__list__inputs">
            <input
              className="newMain__input"
              type="text"
              name="location"
              minLength="2"
              maxLength="50"
              required
              placeholder="Destination"
              id="location"
              value={values.location}
              onChange={handleChanges}
            />
          </li>
          <label className="newMain__input-header" htmlFor="date">
            When
          </label>
          <li className="newMain__list__inputs">
            <input
              className="newMain__input"
              type="text"
              name="date"
              minLength="2"
              maxLength="30"
              placeholder="Dates"
              id="date"
              value={values.date}
              onChange={handleChanges}
            />
          </li>
          <label className="newMain__input-header" htmlFor="activity">
            <p className="newMain__input__activity__title-text">
              What will you be doing?
            </p>{" "}
            <p className="newMain__input__activity-text">(Optional)</p>
          </label>
          <li className="newMain__list__inputs">
            <input
              className="newMain__input"
              type="text"
              name="activity"
              placeholder="Activities"
              id="activity"
              onChange={values}
            />
          </li>
        </ul>
        <div className="newMain__submitButton">
            <button className="submitButton">
                Create My Packing List
            </button>
        </div>
      </div>
    </div>
  );
}

export default NewMain;
