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
import { defaultNewsArticles } from "../../utils/constants";

function App() {
  const [newsData, setNewsData] = useState(defaultNewsArticles);
  return (
    <>
      <div className="page">
        <div className="page__content">
          <Header />
          <Routes>
            <Route path="/" element={<Main newsData={newsData} />} />
          </Routes>
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
}

export default App;
