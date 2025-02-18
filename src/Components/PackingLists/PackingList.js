import CurrentUserContext from "../../Contexts/CurrentUserContext.js";
import "./PackingList.css";
import { useContext } from "react";


const PackingList = ({ }) => {
    const currentUser= useContext(CurrentUserContext);
    
    return (
        <li className="packing__list">
         
        </li>
    )
};

export default PackingList;