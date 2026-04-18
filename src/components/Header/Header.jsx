import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <p className="header__title">NewsExplorer</p>
      <div className="header__content-container">
        <NavLink to="/" className="header__home-button">
          Home
        </NavLink>
        <button type="button" className="header__signin-btn">
          Sign In
        </button>
      </div>
    </header>
  );
}
export default Header;
