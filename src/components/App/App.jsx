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
import { defaultNewsArticles, apiKey } from "../../utils/constants";
import { getNews } from "../../utils/newsApi";

function App() {
  //TODO--default shoud be an empty array like so: const  [newsData, setNewsData] = useState([]);
  const [newsData, setNewsData] = useState([]);

  const [visibleCount, setVisibleCount] = useState(3);

  //Default = false
  const [newsResults, setNewsResults] = useState(false);

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
      .then((data) => {
        if (data.totalResults === 0) {
          setNewsResults(true);
          setNoNewsResults(true);
        } else {
          setNewsData(data.articles);
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
                  handleShowMoreNews={handleShowMoreNews}
                  visibleCount={visibleCount}
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
