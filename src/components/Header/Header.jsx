import { NavLink } from "react-router-dom";
import "./Header.css";
import signout from "../../assets/logout_home.svg";

function Header({ isLoggedIn, currentUser }) {
  return (
    <header className="header">
      <p className="header__title">NewsExplorer</p>
      <div className="header__content-container">
        <NavLink to="/" className="header__home-button">
          Home
        </NavLink>
        {isLoggedIn ? (
          <>
            <NavLink
              to="/saved-articles"
              className="header__saved-articles-btn"
            >
              Saved articles
            </NavLink>
            <button type="button" className="header__signout-btn">
              {currentUser.name}
              <img
                src={signout}
                alt="signout"
                className="header__signout-btn-image"
              />
            </button>
          </>
        ) : (
          <button type="button" className="header__signin-btn">
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
export default Header;
