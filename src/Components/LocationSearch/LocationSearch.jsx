import "./LocationSearch.css";
import SearchBar from "../SearchBar/SearchBar";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const LocationSearch = ({ handleGetCityWeather, searchResults }) => {
  const { values, handleChanges } = useForm({
    location: "",
  });
  const [hideDropBox, setHideDropBox] = useState(true);
  const navigate = useNavigate();

  const handleSearchInfo = (result) => {
    console.log(result);
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
    navigate("/search/results");
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
                    <p className="location_search-name">{`${result.name}, ${result.state}`}</p>
                    <p className="location_search-country">{result.country}</p>
                  </button>
                </li>
              ))
            ) : (
              <li className="location_search-no-results">
                No results could be found
              </li>
            )}
          </ul>
        )}
      </div>
    </SearchBar>
  );
};

export default LocationSearch;
