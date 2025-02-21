import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const RouteRerouter = ({ children, path }) => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const searchedCity = localStorage.getItem("lastSearchedCity");

  useEffect(() => {
    if (!searchedCity && location === path) {
      navigate("/");
    }
  }, [searchedCity, location, path]);

  return searchedCity && location === path ? children : navigate("/");
};
export default RouteRerouter;
