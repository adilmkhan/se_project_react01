import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { apiKey, defaultNewsArticles } from "../../utils/constants";
import { getNews } from "../../utils/newsApi";
import {
  getCards,
  addArticle,
  deleteCard,
  getCurrentUser,
} from "../../utils/api";
import Saved from "../../components/Saved/Saved";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import { setToken, getToken } from "../../utils/token";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import RegisterSuccessModal from "../RegisterSuccessModal/RegisterSuccessModal";
import { useForm } from "../../hooks/useForm";
import * as auth from "../../utils/auth";

function App() {
  //TODO--default shoud be an empty array like so: const  [newsData, setNewsData] = useState([]);
  const [newsData, setNewsData] = useState([]);

  //TODO -- default should be an empty array
  const [savedArticles, setSavedArticles] = useState([]);

  const [visibleCount, setVisibleCount] = useState(3);

  //Default = false
  const [newsResults, setNewsResults] = useState(false);

  //Deafult = false
  const [noNewsResults, setNoNewsResults] = useState(false);

  //Default = false
  const [newsIsLoading, setNewsIsLoading] = useState(false);

  const [activeModal, setActiveModal] = useState(""); //Testing

  //TODO -- Deafult is false
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Deafault = true
  const [isAuthChecking, setIsAuthChecking] = useState(true); //TODO-Testing

  //TODO-Changes needed to data-structure
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "", //Testing
  });
  const { setErrors } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const baseUrl = "http://localhost:3001";

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleRegisterClick = () => {
    setActiveModal("signup");
  };

  const handleLoginClick = () => {
    setActiveModal("signin");
  };

  const handleNewsRequest = (searchFormData) => {
    const currentDate = new Date();
    const to = currentDate.toISOString().split("T")[0];
    const backDate = new Date(currentDate);
    backDate.setDate(currentDate.getDate() - 7);
    const from = backDate.toISOString().split("T")[0];

    setVisibleCount(3);
    setNewsIsLoading(true);
    setNewsResults(false);
    setNoNewsResults(false);
    getNews({ q: searchFormData.news, pageSize: 100 }, apiKey, from, to)
      .then((res) => {
        if (res.totalResults === 0) {
          setNewsResults(true);
          setNoNewsResults(true);
        } else {
          setNewsData(
            res.articles.map((item) => {
              return { ...item, keyword: searchFormData.news };
            }),
          );
          console.log(newsData);
          setNewsResults(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setNewsResults(false);
        setNoNewsResults(false);
      })
      .finally(() => {
        setNewsIsLoading(false);
      });
  };

  //TODO--API call for showmore...
  const handleShowMoreNews = () => {
    setVisibleCount((prev) => {
      return prev + 3;
    });
  };

  const handleAddArticle = (cardData) => {
    const jwt = getToken();
    addArticle(
      {
        title: cardData.title,
        description: cardData.description,
        urlToImage: cardData.urlToImage,
        publishedAt: cardData.publishedAt,
        source: cardData.source, //previously .source.name
        keyword: cardData.keyword,
      },
      baseUrl,
      jwt,
    )
      .then((res) => {
        setSavedArticles((prev) => [res.data, ...prev]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onRemoveItem = (inputItems) => {
    const jwt = getToken();
    deleteCard({ baseUrl, jwt, id: inputItems._id })
      .then(() => {
        closeActiveModal();
        setSavedArticles(
          savedArticles.filter((item) => item._id !== inputItems._id),
        );
      })
      .catch(console.error);
  };

  const handleRegister = (inputValues) => {
    auth
      .register(
        {
          name: inputValues.name,
          email: inputValues.email,
          password: inputValues.password,
        },
        baseUrl,
      )
      .then(() => {
        closeActiveModal();
        setActiveModal("registersuccess");
      })
      .catch((error) => {
        if (error.statusCode === 409) {
          setErrors({ server: "This email is not available" });
        } else {
          setErrors({ server: "Registration failed. Please try again." });
        }
      });
  };

  const handleLogin = (loginValues) => {
    if (!loginValues.email || !loginValues.password) {
      return;
    }

    auth
      .authorize(
        {
          email: loginValues.email,
          password: loginValues.password,
        },
        baseUrl,
      )
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setIsLoggedIn(true);
          closeActiveModal();
          getCurrentUser(baseUrl, data.token)
            .then((response) => {
              const { _id, name, avatar } = response.data;
              setCurrentUser({ _id, name, avatar });
              const redirectPath = location.state?.from?.pathname || "/";
              navigate(redirectPath);
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    getCards(baseUrl)
      .then((items) => {
        setSavedArticles(items.data);
      })
      .catch(console.error);
    const jwt = getToken();
    if (!jwt) {
      return setIsAuthChecking(false);
    }
    getCurrentUser(baseUrl, jwt)
      .then((response) => {
        setIsAuthChecking(false);
        const { _id, name } = response.data;
        setIsLoggedIn(true);
        setCurrentUser({ _id, name });
      })
      .catch((err) => {
        setIsAuthChecking(false);
        console.error(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <>
        <div className="page">
          <div className="page__content">
            <Header
              handleLoginClick={handleLoginClick}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              setIsLoggedIn={setIsLoggedIn}
            />
            {isAuthChecking ? (
              <div>Loading...</div>
            ) : (
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      newsData={newsData}
                      newsResults={newsResults}
                      onNewsRequest={handleNewsRequest}
                      isLoggedIn={isLoggedIn}
                      noNewsResults={noNewsResults}
                      newsIsLoading={newsIsLoading}
                      handleShowMoreNews={handleShowMoreNews}
                      visibleCount={visibleCount}
                      handleAddArticle={handleAddArticle}
                      savedArticles={savedArticles}
                    />
                  }
                />
                <Route
                  path="/saved-articles"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Saved
                        onRemoveItem={onRemoveItem}
                        savedArticles={savedArticles}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="*"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/saved-articles" replace />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              </Routes>
            )}

            <Footer />
          </div>
          <RegisterModal
            isOpen={activeModal === "signup"}
            handleCloseClick={closeActiveModal}
            onSignup={handleRegister}
            handleLoginClick={handleLoginClick}
          />
          <LoginModal
            isOpen={activeModal === "signin"}
            handleCloseClick={closeActiveModal}
            onSignin={handleLogin}
            handleRegisterClick={handleRegisterClick}
          />
          <RegisterSuccessModal
            isOpen={activeModal === "registersuccess"}
            handleLoginClick={handleLoginClick}
            handleCloseClick={closeActiveModal}
          />
        </div>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
