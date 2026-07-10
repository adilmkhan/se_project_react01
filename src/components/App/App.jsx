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
import { apiKey } from "../../utils/constants";
import { getNews } from "../../utils/newsApi";
import {
  getCards,
  addArticle,
  deleteCard,
  getCurrentUser,
  getSummary,
} from "../../utils/api";
import Saved from "../../components/Saved/Saved";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import { setToken, getToken } from "../../utils/token";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import RegisterSuccessModal from "../RegisterSuccessModal/RegisterSuccessModal";
import SummaryModal from "../SummaryModal/SummaryModal";
import * as auth from "../../utils/auth";

const baseUrl = import.meta.env.PROD
  ? "https://api.the-newsapp.blinklab.com"
  : "http://localhost:3001";

function App() {
  const [newsData, setNewsData] = useState([]);

  const [savedArticles, setSavedArticles] = useState([]);

  const [selectedArticle, setSelectedArticle] = useState({});

  const [visibleCount, setVisibleCount] = useState(3);

  const [newsResults, setNewsResults] = useState(false);

  const [noNewsResults, setNoNewsResults] = useState(false);

  const [newsIsLoading, setNewsIsLoading] = useState(false);

  const [activeModal, setActiveModal] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isAuthChecking, setIsAuthChecking] = useState(() =>
    Boolean(getToken()),
  );

  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleRegisterClick = () => {
    setActiveModal("signup");
  };

  const handleLoginClick = () => {
    setActiveModal("signin");
  };

  const handleSummaryRequest = (article) => {
    //TODO setActiveModal, summary API call
    const jwt = getToken();

    getSummary({ description: article.description }, baseUrl, jwt)
      .then((res) => {
        setSelectedArticle({ ...article, summary: res.summary });
        setActiveModal("summarymodal");
      })
      .catch((error) => {
        console.error(error);
      });
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

  const handleShowMoreNews = () => {
    setVisibleCount((prev) => {
      return prev + 3;
    });
  };

  const handleAddArticle = ({ isSaved, savedId }, cardData) => {
    const jwt = getToken();

    if (isSaved) {
      deleteCard({ baseUrl, jwt, id: savedId })
        .then(() => {
          setSavedArticles((prev) =>
            prev.filter((item) => item._id !== savedId),
          );
        })
        .catch(console.error);
      return;
    }

    addArticle(
      {
        title: cardData.title,
        description: cardData.description,
        urlToImage: cardData.urlToImage,
        publishedAt: cardData.publishedAt,
        source: cardData.source,
        url: cardData.url,
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

  const handleRegister = (inputValues, setErrors) => {
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
        if (error.status === 409) {
          setErrors((prev) => ({
            ...prev,
            server: "This email is not available",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            server: "Registration failed. Please try again.",
          }));
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
      return;
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
              isModalOpen={activeModal !== ""}
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
                      currentUser={currentUser}
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
                        summary={handleSummaryRequest}
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
          <SummaryModal
            isOpen={activeModal === "summarymodal"}
            handleCloseClick={closeActiveModal}
            article={selectedArticle}
          />
        </div>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
