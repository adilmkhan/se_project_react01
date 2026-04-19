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
        <a
          href="https://github.com/adilmkhan"
          className="footer__github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={github}
            alt="github-image"
            className="footer__github-image"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/adilmkhan89/"
          className="footer__linkedin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={linkedin}
            alt="linkedin-image"
            className="footer__linkedin-image"
          />
        </a>
      </div>
    </footer>
  );
}
export default Footer;
