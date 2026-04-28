import "./Saved.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
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
          By keywords: {savedArticles[0].keyword}, {savedArticles[1].keyword},
          and {savedArticles.length - 2} others
        </p>
      </section>
      <section className="saved__results"></section>
    </div>
  );
}

export default Saved;
