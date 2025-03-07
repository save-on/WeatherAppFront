import "./App.css";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import Profile from "../Profile/Profile.js";
import DeleteItem from "../DeleteItem/DeleteItem.js";
import ItemModal from "../ItemModal/ItemModal.js";
import LoginModal from "../LoginModal/LoginModalForm.js";
import RegisterModal from "../RegisterModal/RegisterModal.js";
import EditProfileModal from "../EditProfileModal/EditProfileModal.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import AddItemModal from "../AddItemModal/AddItemModal.js";
import SearchedCity from "../SearchedCity/SearchedCity.jsx";
import RouteRerouter from "../RouteRerouter/RouteRerouter.jsx";

//Videos
import clearDay from "../../Videos/clear-day.mp4";
import cloudsDay from "../../Videos/clouds-day.mp4";
import fogDay from "../../Videos/fog-day.mp4";
import rainDay from "../../Videos/rain-day.mp4";
import snowDay from "../../Videos/Snow-Cabin.mp4";
import thunderStormday from "../../Videos/thunderstorm-day.mp4";
import clearNight from "../../Videos/clear-night.mp4";
import cloudsnight from "../../Videos/clouds-night.mp4";
import fogNight from "../../Videos/fog-night.mp4";
import rainNight from "../../Videos/rain-night.mp4";
import snowNight from "../../Videos/snow-night.mp4";
import thunderstormNight from "../../Videos/thunderstorm-night.mp4";
import mistDay from "../../Videos/mist-day.mp4";
import mistNight from "../../Videos/mist-night.mp4";

//Context imports
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../Contexts/CurrentUserContext.js";

//React imports
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";

//Utility imports
import {
  getForecastWeather,
  filterWeatherData,
} from "../../Utils/WeatherAPI.js";
import {
  getItems,
  postItems,
  deleteItems,
  addCardLike,
  removeCardLike,
  getCityLocationData,
} from "../../Utils/Api.js";
import { login, update, register, getUserData } from "../../Utils/Auth.js";
import { checkLoggedIn } from "../../Utils/token.js";
import getCoords from "../../Utils/geolocationapi.js";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: undefined, C: undefined },
    city: "",
  });
  const [videoSrc, setVideoSrc] = useState("");
  const [currentTemperatureUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  // const history = useNavigate("");
  const [token, setToken] = useState(checkLoggedIn() || "");
  const [isLoading, setIsLoading] = useState(false);
  const [coords, setCoords] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [searchedCity, setSearchedCity] = useState({});
  const [savedCity, setSavedCity] = useState({ name: "" });
  const [locationData, setLocationData] = useState({
    locationAccess: false,
    notice: "",
  });

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleDeleteModal = () => {
    setActiveModal("delete");
  };

  const handleDeleteCard = (card) => {
    deleteItems(card.id, token)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item.id !== card.id));
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  function handleOpenItemModal() {
    setActiveModal("preview");
  }

  const handleOpenLoginModal = () => {
    setActiveModal("login");
  };

  const handleOpenRegisterModal = () => {
    setActiveModal("register");
  };

  const handleOpenEditProfileModal = () => {
    setActiveModal("edit");
  };

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(handleCloseModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const registerUser = (values) => {
    handleSubmit(() =>
      register(values)
        .then(() => loginUser(values))
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setCurrentUser(values);
        })
    );
  };

  const loginUser = (user) => {
    setIsLoading(true);
    login(user)
      .then((res) => {
        if (res.token) {
          setToken(res.token);
          localStorage.setItem("jwt", res.token);
          setCurrentUser(res);
          setLoggedIn(true);
          handleCloseModal();
        }
        // history.push("/profile");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateUser = (values) => {
    const jwt = checkLoggedIn();
    handleSubmit(() =>
      update(values, jwt).then((res) => {
        setCurrentUser(res);
      })
    );
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setLoggedIn(false);
    // history.push("/");
  };

  const handleCardLike = (id, isLiked) => {
    const token = checkLoggedIn();
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item.id === id ? updatedCard : item))
            );
          })
          .catch(console.error)
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item.id === id ? updatedCard : item))
            );
          })
          .catch(console.error);
  };

  const handleGetCityWeather = (search) => {
    getCityLocationData(search).then((res) => {
      setSearchResults(res);
    });
  };

  const handleSearchedData = (cityInfo) => {
    if (!cityInfo) return;
    localStorage.setItem("lastSearchedCity", JSON.stringify(cityInfo));

    const coords = {
      latitude: cityInfo.lat,
      longitude: cityInfo.lon,
    };
    getForecastWeather(coords).then((data) => {
      const filteredData = filterWeatherData(data);
      setSearchedCity(filteredData);
      setSavedCity(cityInfo);
    });
  };

  useEffect(() => {
    const saved = localStorage.getItem("lastSearchedCity");
    if (saved) {
      handleSearchedData(JSON.parse(saved));
    }
  }, []);

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTempUnit("C")
      : setCurrentTempUnit("F");
  };

  const onAddItem = (values) => {
    const token = checkLoggedIn();
    postItems(values, token)
      .then((res) => {
        setClothingItems((items) => [res, ...items]);
      })
      .catch(console.error)
      .finally(() => {
        handleCloseModal();
      });
  };

  const handleGetCoords = async () => {
    try {
      const data = await getCoords();
      setCoords(data);
      setLocationData({
        locationAccess: true,
        notice: "",
      });
    } catch (error) {
      const errData = {
        locationAccess: false,
        notice: error.message,
      };
      setLocationData(errData);
    }
  };

  useEffect(() => {
    if (
      coords.hasOwnProperty("latitude") &&
      coords.hasOwnProperty("longitude")
    ) {
      getForecastWeather(coords)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch(console.error);
    } else {
      handleGetCoords();
    }
  }, [coords]);

  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch(console.error);
  }, [coords]);

  useEffect(() => {
    const jwt = checkLoggedIn();
    if (jwt) {
      getUserData(jwt)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
        })
        .catch(console.error);
    }
  }, []);

  const videoMapping = {
    ["clear-day"]: clearDay,
    ["clouds-day"]: cloudsDay,
    ["fog-day"]: fogDay,
    ["rain-day"]: rainDay,
    ["snow-day"]: snowDay,
    ["thunderstorm-day"]: thunderStormday,
    ["clear-night"]: clearNight,
    ["clouds-night"]: cloudsnight,
    ["fog-night"]: fogNight,
    ["rain-night"]: rainNight,
    ["snow-night"]: snowNight,
    ["thunderstorm-night"]: thunderstormNight,
    ["mist-day"]: mistDay,
    ["mist-night"]: mistNight,
  };

  const handleBackgroundVideoChange = (option) => {
    setVideoSrc(
      videoMapping[`${option?.type}-${option?.day ? "day" : "night"}`]
    );
  };

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <video
          key={videoSrc}
          id="background-video"
          autoPlay
          loop
          muted
          className="background-video"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            onCreateModal={handleCreateModal}
            weatherData={weatherData}
            loggedIn={loggedIn}
            onLogin={handleOpenLoginModal}
            onRegister={handleOpenRegisterModal}
            locationData={locationData}
            searchedCity={searchedCity}
            savedCity={savedCity}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onSelectedCard={handleSelectedCard}
                  clothingItems={clothingItems}
                  handleCardLike={handleCardLike}
                  handleOpenItemModal={handleOpenItemModal}
                  loggedIn={loggedIn}
                  handleBackgroundVideoChange={handleBackgroundVideoChange}
                  handleGetCityWeather={handleGetCityWeather}
                  searchResults={searchResults}
                  handleSearchedData={handleSearchedData}
                  locationData={locationData}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute path="/profile" loggedIn={loggedIn}>
                  <Profile
                    onSelectedCard={handleSelectedCard}
                    onCreate={handleCreateModal}
                    clothingItems={clothingItems}
                    handleOpenItemModal={handleOpenItemModal}
                    loggedIn={loggedIn}
                    onEditProfile={handleOpenEditProfileModal}
                    onSignOut={onSignOut}
                    onDeleteClick={handleDeleteCard}
                    handleCardLike={handleCardLike}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search/result"
              element={
                <RouteRerouter path={"/search/result"}>
                  <SearchedCity
                    searchedCity={searchedCity}
                    handleBackgroundVideoChange={handleBackgroundVideoChange}
                    clothingItems={clothingItems}
                    handleSelectedCard={handleSelectedCard}
                    handleCardLike={handleCardLike}
                    loggedIn={loggedIn}
                    savedCity={savedCity}
                    handleGetCityWeather={handleGetCityWeather}
                    searchResults={searchResults}
                    handleSearchedData={handleSearchedData}
                  />
                </RouteRerouter>
              }
            />
          </Routes>
          <Footer />
          {activeModal === "login" && (
            <LoginModal
              onClose={handleCloseModal}
              loginUser={loginUser}
              openRegisterModal={handleOpenRegisterModal}
            />
          )}

          {activeModal === "register" && (
            <RegisterModal
              onClose={handleCloseModal}
              registerUser={registerUser}
              openLoginModal={handleOpenLoginModal}
            />
          )}

          {activeModal === "create" && (
            <AddItemModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "create"}
              onAddItem={onAddItem}
              isLoading={isLoading}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              selectedCard={selectedCard}
              onDeleteClick={handleDeleteModal}
              onClose={handleCloseModal}
              loggedIn={loggedIn}
              weatherData={weatherData}
            />
          )}
          {activeModal === "edit" && (
            <EditProfileModal
              isOpen={activeModal === "edit"}
              onClose={handleCloseModal}
              updateUser={updateUser}
            />
          )}

          {activeModal === "delete" && (
            <DeleteItem
              onClose={handleCloseModal}
              onDeleteClick={handleDeleteCard}
              selectedCard={selectedCard}
              isLoading={isLoading}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
