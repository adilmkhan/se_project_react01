import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import signout from "../../assets/logout_home.svg";
import signoutSaved from "../../assets/logout.svg";

function Header({ isLoggedIn, currentUser, handleLoginClick }) {
  const location = useLocation();
  const isOnSavedNews = location.pathname === "/saved-articles";
  return (
    <header className={`header ${isOnSavedNews ? "header-saved" : ""}`}>
      <p
        className={`header__title ${isOnSavedNews ? "header__title-saved" : ""}`}
      >
        NewsExplorer
      </p>
      <div className="header__content-container">
        <NavLink
          to="/"
          className={`header__home-button ${isOnSavedNews ? "header__home-button-saved" : ""}`}
        >
          Home
        </NavLink>
        {isLoggedIn ? (
          <>
            <NavLink
              to="/saved-articles"
              className={`header__saved-articles-btn ${isOnSavedNews ? "header__saved-articles-btn-saved" : ""}`}
            >
              Saved articles
            </NavLink>
            <button
              type="button"
              className={`header__signout-btn ${isOnSavedNews ? "header__signout-btn-saved" : ""}`}
            >
              {currentUser.name}
              {isOnSavedNews ? (
                <img
                  src={signoutSaved}
                  alt="signout"
                  className="header__signout-btn-image"
                />
              ) : (
                <img
                  src={signout}
                  alt="signout"
                  className="header__signout-btn-image"
                />
              )}
            </button>
          </>
        ) : (
          <button
            onClick={handleLoginClick}
            type="button"
            className="header__signin-btn"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
export default Header;
