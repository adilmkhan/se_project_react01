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
  const [newsData, setNewsData] = useState(defaultNewsArticles);

  const [newsResults, setNewsResults] = useState(true);

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
    getNews({ news: searchFormData.value }, APIkey)
      .then((data) => {
        setNewsData(data.articles || data);
        setNewsResults(true);
      })
      .catch((error) => {
        console.error(error);
        setNewsResults(false);
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
