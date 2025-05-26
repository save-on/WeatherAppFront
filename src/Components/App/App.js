import "./App.css";
import Header from "../Header/Header.js";
import NewHeader from "../Header/NewHeader.js";
import Main from "../Main/Main.js";
import NewMain from "../Main/NewMain.js";
import Footer from "../Footer/Footer.js";
import Profile from "../Profile/Profile.js";
import MyTrips from "../MyTrips/MyTrips.js";

import PackingListList from "../PackingListList/PackingListList.js";
import CreatePackingListModal from "../PackingListsModal/CreatePackingListModal.js";
import PackingListCard from "../PackingListCard/PackingListCard.js";
import PackingListDetailsModal from "../PackingListDetailsModal/PackingListDetailsModal.js";
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
import { Routes, Route, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

//Utility imports
import {
  getForecastWeather,
  filterWeatherData,
} from "../../Utils/WeatherAPI.js";
import {
  getItems,
  postItems,
  getPackingLists,
  postPackingList,
  deleteItems,
  addCardLike,
  removeCardLike,
  getCityLocationData,
  postTripWithPackinglist,
  getTripById,
  getTrips,
} from "../../Utils/Api.js";
import { login, update, register, getUserData } from "../../Utils/Auth.js";
import {
  checkLoggedIn,
  getTempUnit,
  removeToken,
  setTempUnit,
  setToken,
} from "../../Utils/token.js";
import getCoords from "../../Utils/geolocationapi.js";
import LikesPage from "../LikesPage/LikesPage.jsx";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: undefined, C: undefined },
    city: "",
  });
  const [videoSrc, setVideoSrc] = useState("");
  const [currentTemperatureUnit, setCurrentTempUnit] = useState(
    getTempUnit() || "F"
  );
  const [clothingItems, setClothingItems] = useState([]);
  const [packingLists, setPackingLists] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTrips, setIsLoadingTrips] = useState(false);
  const [coords, setCoords] = useState({});
  const [isPackingListModalOpen, setIsPackingListModalOpen] = useState(false);
  const [isCreatePackingListModalOpen, setIsCreatePackingListModalOpen] =
    useState(false);
  const [selectedPackingList, setSelectedPackingList] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchedCity, setSearchedCity] = useState({});
  const [savedCity, setSavedCity] = useState({ name: "" });
  const [locationData, setLocationData] = useState({
    locationAccess: false,
    notice: "",
  });
  const [errMessage, setErrMessage] = useState("");
  const [tripDetails, setTripDetails] = useState({
    location: "",
    activities: [],
    travelDates: { startDate: null, endDate: null },
  });
  const [pendingTripData, setPendingTripData] = useState(null);
  const [isPendingTripModal, setIsPendingTripModal] = useState(false);
  const [userTrips, setUserTrips] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  let elementStyle;

  if (location.pathname === "/mytrips") {
    elementStyle = "style-for-mytrips-page";
  }

  const handleCreatePackingList = () => {
    setActiveModal("createPackingList");
  };
  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleDeleteModal = () => {
    setActiveModal("delete");
  };

  const handleDeleteCard = (card) => {
    setIsLoading(true);
    const token = checkLoggedIn();
    deleteItems(card.id, token)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item.id !== card.id));
        handleCloseModal();
      })
      .catch((err) => console.error(err.message))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setErrMessage("");
    setIsPendingTripModal(false);
    console.log("DEBUG: isPendingTripModal set to false on modal close");
  };

  const handleRemoveActivityFromTrip = (indexToRemove) => {
    setTripDetails((prevDetails) => ({
      ...prevDetails,
      activities: prevDetails.activities.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
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

  // const handleTripDetailsSubmit = (newDetails) => {
  //   handleNewTripAttempt(newDetails);
  // };

  const handleOpenItemModal = () => {
    setActiveModal("preview");
  };

  const handleOpenLoginModal = () => {
    setActiveModal("login");
    setIsPendingTripModal(false);
    console.log("DEBIG: isPendingTripModal set to false on normal login open");
  };

  const handleOpenRegisterModal = () => {
    setActiveModal("register");
    setIsPendingTripModal(false);
    console.log(
      "DEBUG: isPendingTripModal set to false on normal register open"
    );
  };

  const handleOpenEditProfileModal = () => {
    setActiveModal("edit");
  };

  const handleOpenDropbox = () => {
    setActiveModal("dropbox");
  };

  const handleOpenTripDropbox = () => {
    setActiveModal("tripdropbox");
  };

  const handleOpenLoginDropbox = () => {
    setActiveModal("logindropbox");
  };

  const handleOpenAddTripModal = () => {
    setActiveModal("addTripModal");
  }

  const registerUser = (values) => {
    console.log("Values: ", values);
    setIsLoading(true);
    register(values)
      .then((res) => {
        if (res.token) {
          setToken(res.token);
          loginUser(values);
        } else {
          console.error("Register successful but no token received.");
          setErrMessage(
            "Registration successful, but login failed. Please try logging in."
          );
          setActiveModal("login");
          setIsPendingTripModal(false);
        }
      })
      .catch((err) => {
        console.error(err.message);
        setErrMessage(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  const loginUser = (user) => {
    setIsLoading(true);
    login(user)
      .then((res) => {
        if (res.token) {
          setToken(res.token); //Storing token
          setCurrentUser(res);
          setLoggedIn(true);
          handleCloseModal();

          const storedTrips = JSON.parse(
            localStorage.getItem("userSavedTrips") || "[]"
          );
          setUserTrips(storedTrips);
          console.log("DEBUG: Logged in. Loaded user trips: ", storedTrips);

          const storedPendingTrip = localStorage.getItem("pendingTrip");
          if (storedPendingTrip) {
            const parsedTripData = JSON.parse(storedPendingTrip);
            console.log(
              "User logged in with pending trip data. Saving now: ",
              parsedTripData
            );
            handleSaveTrip(parsedTripData, true);
            localStorage.removeItem("pendingTrip");
            setPendingTripData(null);
          } else {
            navigate("/mytrips");
          }
        } else {
          console.error("Login successful but no token received.");
          setErrMessage("Login successful, but no token. Please try again.");
        }
      })
      .catch((err) => {
        console.error(err.message);
        setErrMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateUser = (values) => {
    const token = checkLoggedIn();
    setIsLoading(true);
    update(values, token)
      .then((res) => {
        setCurrentUser(res);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err.message);
        setErrMessage(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  const onSignOut = () => {
    removeToken();
    setCurrentUser({});
    setLoggedIn(false);
    setUserTrips([]);
    localStorage.removeItem("userSavedTrips");
    navigate("/");
  };

  // Handling trip save and trip details attempt for "paywall"
  const handleNewTripAttempt = (tripData) => {
    if (!loggedIn) {
      //User not logged in
      localStorage.setItem("pendingTrip", JSON.stringify(tripData)); //store pending trip data
      setPendingTripData(tripData);
      navigate("/mytrips");
      setActiveModal("register");
      setIsPendingTripModal(true);
    } else {
      console.log("User logged in. Saving trip directly.");
      handleSaveTrip(tripData);
    }
  };

  const handleSaveTrip = (tripData, isPendingSave = false) => {
    console.log(
      "handleSaveTrip (actual save) called. Trip data: ",
      tripData,
      "Is Pending Save: ",
      isPendingSave
    );

    const token = checkLoggedIn();
    if (!token) {
      console.error(
        "Cannot save trip: User token not found. This shouldn't happen if handleNewAttempt works correctly."
      );
      return;
    }
    //set up data to send to backend for trip
    const dataForBackend = {
      destination: tripData.destination,
      startDate: tripData.startDate,
      endDate: tripData.endDate,
      activities: tripData.activities,
    };

    //check for user token

    //call api to send tripData to backend
    setIsLoading(true);
    postTripWithPackinglist(dataForBackend, token)
      .then((res) => {
        console.log("Trip and packing list saved successfully: ", res);
        const dateString = res.trip.trip_date.replace(/[\[\]\)]/g, "");
        const [backendStartDate, backEndDate] = dateString.split(",");
        const savedTripFromBackend = {
          id: res.trip._id || res.trip.id,
          destination: res.trip.destination || tripData.location,
          startDate: backendStartDate || tripData.travelDates.startDate,
          endDate: backEndDate || tripData.travelDates.endDate,
          activities: res.trip.activities,
          packinglistId: res.packinglist?._id || "generated-packing-list-id",
        };
        setTripDetails(res);

        //update user trips
        const updatedUserTrips = [...userTrips, savedTripFromBackend];
        setUserTrips(updatedUserTrips);
        localStorage.setItem(
          "userSavedTrips",
          JSON.stringify(updatedUserTrips)
        );
        console.log(
          "DEBUG: userTrips state and localStorage updated: ",
          updatedUserTrips
        );
        console.log(
          "DEBUB Appjs: Navigating to: ",
          `/mytrips/${savedTripFromBackend.id}`
        );
        if (!isPendingSave) {
          navigate(`mytrips/${savedTripFromBackend.id}`);
        }
      })
      .catch((err) => {
        console.error("Failed to save trip and packing list: ", err);
        setErrMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardLike = (id, isLiked) => {
    const token = checkLoggedIn();
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) =>
            setClothingItems((cards) =>
              cards.map((item) => (item.id === id ? updatedCard : item))
            )
          )
          .catch((err) => console.error(err.message))
      : removeCardLike(id, token)
          .then((updatedCard) =>
            setClothingItems((cards) =>
              cards.map((item) => (item.id === id ? updatedCard : item))
            )
          )
          .catch((err) => console.error(err.message));
  };

  const handleGetCityWeather = (search) => {
    getCityLocationData(search)
      .then((res) => setSearchResults(res))
      .catch((err) => console.error(err.message));
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

  // This is to preview the packing list
  const handlePackingListCardClick = (packingList) => {
    setSelectedPackingList(packingList);
    setIsPackingListModalOpen(true);
  };

  // This is to close the packing list preview
  const closePackingListModal = () => {
    setIsPackingListModalOpen(false);
    setSelectedPackingList(null);
  };

  const closeCreatePackingListModal = () => {
    setIsCreatePackingListModalOpen(false);
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTempUnit("C")
      : setCurrentTempUnit("F");
  };

  useEffect(() => {
    setTempUnit(currentTemperatureUnit);
  }, [currentTemperatureUnit]);

  const onAddItem = (formData) => {
    const token = checkLoggedIn();
    postItems(formData, token)
      .then((res) => {
        setClothingItems((items) => [res, ...items]);
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => {
        handleCloseModal();
      });
  };

  const onCreatePackingList = (formData) => {
    const token = checkLoggedIn();
    setIsLoading(true);
    postPackingList(formData, token)
      .then((res) => {
        setPackingLists((packingLists) => [res, ...packingLists]);
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Error creating packing list: ", err);
      })
      .finally(() => {
        setIsLoading(false);
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
        .catch((err) => console.error(err.message));
    } else {
      handleGetCoords();
    }
  }, [coords]);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => console.error(err.message));
  }, [coords]);

  useEffect(() => {
    const token = checkLoggedIn();
    if (token && loggedIn) {
      getPackingLists(token)
        .then((data) => {
          setPackingLists(data);
        })
        .catch((err) => {
          console.error("Error fetching packing lists: ", err);
        });
    } else if (!token) {
      setPackingLists([]);
    }
  }, [loggedIn]);

  useEffect(() => {
    
    const token = checkLoggedIn();
    

    if (token) {
     
      getUserData(token)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser({ ...res, token: token });
          const storedTrips = JSON.parse(
            localStorage.getItem("userSavedTrips") || "[]"
          );
          setUserTrips(storedTrips);
     
        })
        .catch((err) => {
          console.log(
            "DEBUG: App.js - Error fetching user data on load: ",
            err.message
          );
          localStorage.removeItem("jwt");
          setLoggedIn(false);
          setCurrentUser(null);
          setUserTrips([]);
          console.log("DEBUG: App.js - isLoggedIn set to false due to error.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // If no token, explicitly set states to default logged-out values
      setLoggedIn(false);
      setCurrentUser(null);
      setUserTrips([]);
      setIsLoading(false);
      console.log("App.js: No token found. isLoggedIn set to false.");
    }
  }, []);

  const fetchAllUserTrips = async () => {
    if (!loggedIn) {
      setUserTrips([]);
      return;
    }
    setIsLoadingTrips(true);
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("App.ks: No token found for fetching all user trips.");
        setUserTrips([]);
        return;
      }
      const tripsData = await getTrips(token);
      setUserTrips(tripsData);
    } catch (error) {
      console.error(
        "App.js: Failed to fetch all user trips: ",
        error.message || error
      );
      setUserTrips([]);
    } finally {
      setIsLoadingTrips(false);
    }
  };

  useEffect(() => {
    fetchAllUserTrips();
  }, [loggedIn]);

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

  const handleSelectTrip = (tripId) => {
    console.log("DEBUG: Navigating to packing list for trip ID: ", tripId);
    navigate(`/mytrips/${tripId}`);
  };

  return (
    <div className="app">
      <CurrentUserContext.Provider
        value={{
          currentUser,
          loggedIn,
          loginUser,
          onSignOut,
          setCurrentUser,
          setLoggedIn,
        }}
      >
        <NewHeader
          onRegister={handleOpenRegisterModal}
          loggedIn={loggedIn}
          isLoading={isLoading}
          activeModal={activeModal}
          handleOpenDropbox={handleOpenDropbox}
          handleOpenTripDropbox={handleOpenTripDropbox}
          handleCloseModal={handleCloseModal}
          onSignOut={onSignOut}
          onLogin={handleOpenLoginModal}
          customStyle={elementStyle}
          userTrips={userTrips}
          isLoadingTrips={isLoadingTrips}
          onSelectTrip={handleSelectTrip}
          handleOpenAddTripModal={handleOpenAddTripModal}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <NewMain
                loggedIn={loggedIn}
                //onTripDetailsSubmit={handleNewTripAttempt}
                onNewTripAttempt={handleNewTripAttempt}
                userTrips={userTrips}
                onSelectTrip={handleSelectTrip}
              />
            }
          />
          <Route
            path="/mytrips"
            element={
              //<ProtectedRoute path="mytrips" loggedIn={loggedIn}>
              <MyTrips
                customStyle={elementStyle}
                tripDetails={tripDetails}
                onRemoveActivity={handleRemoveActivityFromTrip}
                userTrips={userTrips}
                onSelectTrip={handleSelectTrip}
                onTripDeleted={fetchAllUserTrips}
              />
              //</ProtectedRoute>
            }
          />
          <Route
            path="/mytrips/:tripId"
            element={
              <ProtectedRoute path="mytrips/:tripId" loggedIn={loggedIn}>
                <MyTrips
                  customStyle={elementStyle}
                  tripDetails={tripDetails}
                  onRemoveActivity={handleRemoveActivityFromTrip}
                  userTrips={userTrips}
                  onSelectTrip={handleSelectTrip}
                  onTripDeleted={fetchAllUserTrips}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/packing-lists"
            element={
              <ProtectedRoute path="/profile/packing-lists" loggedIn={loggedIn}>
                <PackingListList
                  onSelectedCard={handleSelectedCard}
                  clothingItems={clothingItems}
                  handleOpenItemModal={handleOpenItemModal}
                  loggedIn={loggedIn}
                  onEditProfile={handleOpenEditProfileModal}
                  onSignOut={onSignOut}
                  onDeleteClick={handleDeleteCard}
                  handleCardLike={handleCardLike}
                  onOpenCreatePackingListModal={handleCreatePackingList}
                  onSelectedPackingList={handlePackingListCardClick}
                  isPackingListModalOpen={isPackingListModalOpen}
                  selectedPackingList={selectedPackingList}
                  closePackingListModal={closePackingListModal}
                  packingLists={packingLists}
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
                  locationData={locationData}
                />
              </RouteRerouter>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute path="/favorites" loggedIn={loggedIn}>
                <LikesPage
                  handleSelectedCard={handleSelectedCard}
                  clothingItems={clothingItems}
                  handleCardLike={handleCardLike}
                  loggedIn={loggedIn}
                  handleGetCityWeather={handleGetCityWeather}
                  searchResults={searchResults}
                  handleSearchedData={handleSearchedData}
                />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* <Footer customStyle={elementStyle}/> */}

        {activeModal === "login" && (
          <LoginModal
            onClose={handleCloseModal}
            loginUser={loginUser}
            openRegisterModal={handleOpenRegisterModal}
            isLoading={isLoading}
            errMessage={errMessage}
            setErrMessage={setErrMessage}
            isBlurredBackground={isPendingTripModal}
          />
        )}

        {activeModal === "register" && (
          <RegisterModal
            onClose={handleCloseModal}
            registerUser={registerUser}
            openLoginModal={handleOpenLoginModal}
            isLoading={isLoading}
            errMessage={errMessage}
            setErrMessage={setErrMessage}
            isBlurredBackground={isPendingTripModal}
          />
        )}

        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={onAddItem}
            isLoading={isLoading}
            errMessage={errMessage}
          />
        )}

        {activeModal === "createPackingList" && (
          <CreatePackingListModal
            isOpen={activeModal === "createPackingList"}
            onClose={closeCreatePackingListModal}
            isLoading={isLoading}
            onCreatePackingList={onCreatePackingList}
          />
        )}

        {isPackingListModalOpen && (
          <PackingListDetailsModal
            packingList={selectedPackingList}
            onClose={closePackingListModal}
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
            isLoading={isLoading}
            errMessage={errMessage}
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
        {/* </CurrentTemperatureUnitContext.Provider> */}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
