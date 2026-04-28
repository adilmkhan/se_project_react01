import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { apiKey, defaultNewsArticles } from "../../utils/constants";
import { getNews } from "../../utils/newsApi";
import { addArticle } from "../../utils/api";
import Saved from "../../components/Saved/Saved";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import { getToken } from "../../utils/token";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  //TODO--default shoud be an empty array like so: const  [newsData, setNewsData] = useState([]);
  const [newsData, setNewsData] = useState([]);

  //TODO -- default should be an empty array
  const [savedArticles, setSavedArticles] = useState(defaultNewsArticles);

  const [visibleCount, setVisibleCount] = useState(3);

  //Default = false
  const [newsResults, setNewsResults] = useState(false);

  //Deafult = false
  const [noNewsResults, setNoNewsResults] = useState(false);

  //Default = false
  const [newsIsLoading, setNewsIsLoading] = useState(false);

  const [activeModal, setActiveModal] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  //TODO-Changes needed to data-structure
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "Elise", //Testing
    avatar: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const baseUrl = "http://localhost:3001";

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
        source: cardData.source.name,
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

  // useEffect(() => {}, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <>
        <div className="page">
          <div className="page__content">
            <Header isLoggedIn={isLoggedIn} currentUser={currentUser} />
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
                    <Saved savedArticles={savedArticles} />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
        </div>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
