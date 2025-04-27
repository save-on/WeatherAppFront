import AvatarDefault from "../../Images/profile_default.svg";
import "./NewHeader.css";

function NewHeader({
    onRegister,
}) {
    return (
        <div className="newHeader">
            <p className="newHeader__title">Packly</p>
            <div className="newHeader__profile">
            <button className="newHeader__signUp_button" onClick={onRegister}>
                <p className="newHeader__signUp_button-text">Sign Up For Free</p>
            </button>
            <img className="newHeader__avatar_image" src={AvatarDefault} />
            </div>
        </div>
    )
}

export default NewHeader;