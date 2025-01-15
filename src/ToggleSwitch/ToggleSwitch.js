import React, { useState, useContext } from "react"; // useState not used?
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContex } from "../../contexts/CurrentTemperatureUnitContex";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContex
  );
  return (
    <label className="switch" htmlFor="temperature-switch">
      <input
        className="switch__box"
        id="temperature-switch"
        type="checkbox"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider switch__slider-C"
            : "switch__slider switch__slide-F"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTemperatureUnit === "F" && "swtich__active-F"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTemperatureUnit === "C" && "swtich__active-C"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
