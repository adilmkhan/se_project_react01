import "./Saved.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SavedNewsCard from "../SavedNewsCard/SavedNewsCard";
import { useContext } from "react";

function Saved({ savedArticles }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="saved">
      <section className="saved__info">
        <p className="saved__info-header">Saved articles</p>
        <h1 className="saved__info-consumer">
          {currentUser.name}, you have {savedArticles?.length || "no"} saved
          articles
        </h1>
        <p className="saved__info-keywords">
          By keywords:{" "}
          <span className="saved__info-karticles">
            {savedArticles[0].keyword}, {savedArticles[1].keyword}, and{" "}
            {savedArticles.length - 2} other
          </span>
        </p>
      </section>
      <section className="main__results-section">
        <ul className="main__results-container">
          {savedArticles.map((article) => {
            return <SavedNewsCard key={article._id} article={article} />;
          })}
        </ul>
      </section>
    </div>
  );
}

export default Saved;
