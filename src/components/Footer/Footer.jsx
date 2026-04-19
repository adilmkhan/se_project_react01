import "./Footer.css";
import github from "../../assets/github.svg";
import linkedin from "../../assets/LinkedIn.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__content">@ 2024 NewSite, Powered by News Api</p>
      <div className="footer__navigation">
        <p className="footer__home-navigation">Home</p>
        <p className="footer__tripleten-navigation">TripleTen</p>
        <a href="" className="footer__github">
          <img src={github} alt="" className="footer__github-image" />
        </a>
        <a href="" className="footer__linkedin">
          <img src={linkedin} alt="" className="footer__linkedin-image" />
        </a>
      </div>
    </footer>
  );
}
export default Footer;
