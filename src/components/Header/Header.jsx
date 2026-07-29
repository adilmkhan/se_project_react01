import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import signout from "../../assets/logout_home.svg";
import signoutSaved from "../../assets/logout.svg";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/token";

function Header({
  isLoggedIn,
  currentUser,
  handleLoginClick,
  setIsLoggedIn,
  isModalOpen,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  function logOut() {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
  }
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
        <div className="header__navigation-desktop">
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
                onClick={logOut}
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
        {/* Mobile hamburger button */}
        {!isModalOpen && (
          <button
            className={`header__menu-button ${isOnSavedNews ? "header__menu-button-saved" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "x" : "="}
          </button>
        )}
      </div>
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className={`mobile-modal ${isMobileMenuOpen ? "mobile-modal_opened" : ""}`}
        >
          <div
            className={`mobile-modal__container ${isOnSavedNews ? "mobile-modal__container-saved" : ""}`}
          >
            <div
              className={`mobile-modal__header ${isOnSavedNews ? "mobile-modal__header-saved" : ""}`}
            >
              <p
                className={`mobile-modal__title ${isOnSavedNews ? "mobile-modal__title-saved" : ""}`}
              >
                NewsExplorer
              </p>
              <button
                className={`mobile-modal__close-btn ${isOnSavedNews ? "mobile-modal__close-btn-saved" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                x
              </button>
            </div>
            <div className="mobile-modal__navigation">
              <NavLink
                to="/"
                className={`header__home-button ${isOnSavedNews ? "header__home-button-saved" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              {isLoggedIn ? (
                <>
                  <NavLink
                    to="/saved-articles"
                    className={`header__saved-articles-btn ${isOnSavedNews ? "header__saved-articles-btn-saved" : ""}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Saved articles
                  </NavLink>
                  <button
                    onClick={() => {
                      logOut();
                      setIsMobileMenuOpen(false);
                    }}
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
                  onClick={() => {
                    handleLoginClick();
                    setIsMobileMenuOpen(false);
                  }}
                  type="button"
                  className="header__signin-btn"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
export default Header;
