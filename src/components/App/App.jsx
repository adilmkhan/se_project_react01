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
import { defaultNewsArticles } from "../../utils/constants";
import { getNews } from "../../utils/newsApi";

function App() {
  //TODO--default shoud be an empty array like so: const  [newsData, setNewsData] = useState([]);
  const [newsData, setNewsData] = useState(defaultNewsArticles);

  //Default = false
  const [newsResults, setNewsResults] = useState(true);

  //Deafult = false
  const [noNewsResults, setNoNewsResults] = useState(false);

  //Default = false
  const [newsIsLoading, setNewsIsLoading] = useState(false);

  const [activeModal, setActiveModal] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //TODO-Changes needed to data-structure
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "",
    avatar: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleNewsRequest = (searchFormData) => {
    setNewsIsLoading(true);
    setNewsResults(false);
    setNoNewsResults(false);
    getNews({ news: searchFormData.value }, APIkey)
      .then((data) => {
        if (data.totalResults === 0) {
          setNewsResults(true);
          setNoNewsResults(true);
        } else {
          const firstThreeArticles = data.articles.slice(0, 3);
          setNewsData(firstThreeArticles);
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

  //TODO--Possible API call for showmore...
  const handleShowmoreNews = () => {
    getNews({ news: searchFormData.value }, APIkey)
      .then((data) => {
        if (data.totalResults === 0) {
          return;
        } else {
          const firstThreeArticles = data.articles.slice(0, 3);
          setNewsData(firstThreeArticles);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // useEffect(() => {}, []);

  return (
    <>
      <div className="page">
        <div className="page__content">
          <Header />
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
                />
              }
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
