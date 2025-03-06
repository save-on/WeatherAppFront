import "./LocationSearch.css";
import SearchBar from "../SearchBar/SearchBar";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import searchIcon from "../../Images/magnifying-glass-solid.svg";

const LocationSearch = ({
  handleGetCityWeather,
  searchResults,
  handleSearchedData,
}) => {
  const { values, handleChanges, setValues } = useForm({
    location: "",
  });
  const [hideDropBox, setHideDropBox] = useState(true);
  const navigate = useNavigate();

  const handleSearchInfo = (result) => {
    handleSearchedData(result);
    navigate("/search/result");
    setHideDropBox(true);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (values["location"].length > 0) {
        handleGetCityWeather(values);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [values]);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (values["location"].length > 0) {
      return setHideDropBox(false);
    } else {
      return setHideDropBox(true);
    }
  }, [values]);

  return (
    <SearchBar onSubmit={onSubmit}>
      <div className="location_search-container">
        <div className="location_searchbar-container">
          <input
            type="text"
            name="location"
            id="location"
            className="location_search-bar"
            placeholder="Search city weather"
            value={values.location}
            onChange={handleChanges}
          />
        </div>
        {hideDropBox ? null : (
          <ul className="location_search-dropbox">
            {searchResults && searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <li className="location_search-results" key={index}>
                  <button
                    type="button"
                    className="location_search-result"
                    onClick={() => handleSearchInfo(result)}
                  >
                    <p className="location_search-name">{`${result.name} ${
                      result.state === undefined ? "" : `, ${result.state}`
                    }`}</p>
                    <p className="location_search-country">{result.country}</p>
                  </button>
                </li>
              ))
            ) : (
              <li className="location_search-no-results">
                <img
                  className="location_no-results-icon"
                  src={searchIcon}
                  alt="no results"
                />
                <p className="location_no-results-text">{`Search for "${values.location}" could not be found`}</p>
              </li>
            )}
          </ul>
        )}
      </div>
    </SearchBar>
  );
};

export default LocationSearch;
