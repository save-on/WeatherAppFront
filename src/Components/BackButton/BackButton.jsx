import "./BackButton.css";
import backBtn from "../../Images/arrow-left-solid.svg";
import { useNavigate } from "react-router";
const BackButton = ({ type }) => {
  const navigate = useNavigate();

  const handleBtn = () => {
    if (type === "prev") {
      return navigate(-1);
    } else if (type === "home") {
      localStorage.removeItem("lastSearchedCity");
      return navigate("/");
    }
  };

  return (
    <button
      className="back-button"
      onClick={() => {
        handleBtn();
      }}
    >
      <img src={backBtn} alt={type} />
    </button>
  );
};

export default BackButton;
