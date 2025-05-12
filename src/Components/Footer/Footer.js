import "./Footer.css";

const Footer = ({ customStyle }) => {
  return (
    <footer className={`footer ${customStyle}`} >
      <p className="footer_text">Developed By Sayvon & Sergio © 2025</p>
    </footer>
  );
};

export default Footer;

// fix footer
