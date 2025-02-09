import "./App.css";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import Profile from "../Profile/Profile.js";

//Videos
import Clouds from "../../Videos/Cloudy-Sky.mp4";
import NightMountain from "../../Videos/Night-Mountain.mp4";
import SnowCabin from "../../Videos/Snow-Cabin.mp4";
import SunnyDay from "../../Videos/Sunny-Day.mp4";
import SunsetCastle from "../../Videos/Sunset-Castle.mp4";
import SunsetLake from "../../Videos/Sunset-Lake.mp4";
import SunsetTrain from "../../Videos/Sunset-Train.mp4";
import Rain from "../../Videos/Animated-Rain.mp4";

//Context imports
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../Contexts/CurrentUserContext.js";

//React imports
import { useEffect, useState, useRef } from "react";
import { Routes, Route } from "react-router";

//Utility imports
import {
  getForecastWeather,
  filterWeatherData,
  changeVideoBackground,
} from "../../Utils/WeatherAPI.js";

import {
  getItems,
  postItems,
  deleteItems,
  addCardLike,
  removeCardLike,
} from "../../Utils/Api.js";

import { login, update, register, getUserData } from "../../Utils/Auth.js";

import { checkLoggedIn } from "../../Utils/token.js";
import getCoords from "../../Utils/geolocationapi.js";

import DeleteItem from "../DeleteItem/DeleteItem.js";
import ItemModal from "../ItemModal/ItemModal.js";
import LoginModal from "../LoginModal/LoginModalForm.js";
import RegisterModal from "../RegisterModal/RegisterModal.js";
import EditProfileModal from "../EditProfileModal/EditProfileModal.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import AddItemModal from "../AddItemModal/AddItemModal.js";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: undefined, C: undefined },
    city: "",
    condition: "",
    
  });
  const [videoSrc, setVideoSrc] = useState(Clouds);
  const [currentTemperatureUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  // const history = useNavigate("");
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [coords, setCoords] = useState(null);
  const videoRef = useRef();

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
        checkLoggedIn(res.token);
        setToken(res.token);
        localStorage.setItem("jwt", res.token);
        setCurrentUser(res);
        // history.push("/profile");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoggedIn(true);
        setIsLoading(false);
        handleCloseModal();
      });
  };

  const updateUser = (values) => {
    const jwt = localStorage.getItem("jwt");
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

  // const handleCardLike = (id, isLiked) => {
  //   const token = localStorage.getItem("jwt");
  //   if (isLiked) {
  //     removeCardLike(id, token)
  //       .then((data) => {
  //         setClothingItems((cards) =>
  //           cards.map((c) => (c._id === id ? data.data : c))
  //         );
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     addCardLike(id, token)
  //       .then((data) => {
  //         setClothingItems((cards) =>
  //           cards.map((c) => (c._id === id ? data.data : c))
  //         );
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

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
    const token = localStorage.getItem("jwt");
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
    } catch (error) {
      console.error("Error getting coordinates:", error);
    }
  };

  const videoMapping = {
    "sunny": SunnyDay,
    "rain": Rain,
    "snow": SnowCabin,
    "clouds": Clouds,
    "nightmountain": NightMountain, 
    "sunsetcastle": SunsetCastle,
    "sunsetlake": SunsetLake,
  }

  const weatherMapping = {
    "clear sky" : "Clear",
    "few clouds": "Clouds", 
    "scattered clouds": "Clouds", 
    "broken clouds": "Clouds", 
    "shower rain": "Rain",
    "rain": "Rain", 
    "thunderstorm": "Thunderstorm", 
    "snow": "Snow", 
    "mist": "fog",
  }
  

    // useEffect(() => {
    //   if (coords) {
    //     getForecastWeather(coords)
    //     .then((data) => {
    //       const filteredData = filterWeatherData(data);
    //       setWeatherData(filteredData);

    //       const newVideo = videoMapping[filteredData.type] || SunnyDay;
    //       setVideoSrc(newVideo);
    //     })
    //     .catch(console.error);
    //   }
    // }, [coords, weatherData.type]);

  useEffect(() => {
    console.log("Weather Type from Api: ", weatherData.type);
    

    const availableKeys = Object.keys(videoMapping);
    console.log("Available keys in VideoMapping: ", availableKeys);
    if (coords === null) {
      handleGetCoords();
    } else {
      getForecastWeather(coords)
        .then((data) => {
          const filteredData = filterWeatherData(data);;
          setWeatherData(filteredData);

          // const newVideo = (videoMapping[filteredData.type]);
          // console.log("filteredData: ", filteredData);
          // console.log("videoMapping[weatherData.type: ", videoMapping[weatherData.type]);
          // setVideoSrc(newVideo);
          const normalizedType = weatherData.type.trim().toLowerCase();
          console.log("Normalized Type: ", normalizedType);
          const mappedType = weatherMapping[normalizedType] || "Clouds";
          console.log("Weather Mapping: ", weatherMapping[normalizedType]);
          setVideoSrc(videoMapping[mappedType] || Clouds);
       
        })
        .catch(console.error);
    }
  }, [coords, weatherData.type]);

  useEffect(() => {
    if (weatherData.type) {
      changeVideoBackground(weatherData.type);
    }
  }, [weatherData.type]);

  // .then((data) => {
  //   const weatherCondition = data.weather[0].main.toLowerCase();
  //   changeVideoBackground(weatherCondition);
  // })
  // .catch((error) => {
  //   console.error("Failed to fetch weather data", error);
  // });

  useEffect(() => {
    videoRef.current?.load();
  }, [videoSrc]);

  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data.reverse()))
      .catch(console.error);
  }, []);

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

  return (
    <CurrentUserContext.Provider value={currentUser}>
         <video
        id="background-video"
        autoPlay
        loop
        muted
        className="background-video"
        ref={videoRef}
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
                coords={coords}
                // handleCardLike={handleCardLike}
                handleOpenItemModal={handleOpenItemModal}
                // onCardLike={handleCardLike}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute path="/profile" loggedIn={loggedIn}>
                <Profile
                  onSelectCard={handleSelectedCard}
                  onCreate={handleCreateModal}
                  clothingItems={clothingItems}
                  handleOpenItemModal={handleOpenItemModal}
                  loggedIn={loggedIn}
                  onEditProfile={handleOpenEditProfileModal}
                  onSignOut={onSignOut}
                  onDeleteClick={handleDeleteCard}
                  // onCardLike={handleCardLike}
                />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>

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

        <Footer />

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
  );
}

export default App;
