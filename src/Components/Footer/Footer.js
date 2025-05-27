import "./Footer.css";
import Instagram from "../../Images/instagram.svg";
import Facebook from "../../Images/facebook.svg"

const Footer = ({ customStyle }) => {
  return (
    <footer className={`footer ${customStyle}`}>
     
        <p className="footer__text">About Us</p>
        <p className="footer__text">Contact Us</p>
        <p className="footer__text">Privace Policy</p>
        <img className="footer__icon" src={Instagram}/>
        <img className="footer__icon" src={Facebook}/>
      
    </footer>
  );
};

export default Footer;

// fix footer
