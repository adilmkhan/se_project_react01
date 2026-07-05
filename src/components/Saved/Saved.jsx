import "./Saved.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SavedNewsCard from "../SavedNewsCard/SavedNewsCard";
import { useContext } from "react";

function Saved({ savedArticles, onRemoveItem, summary }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="saved">
      <section className="saved__info">
        <p className="saved__info-header">Saved articles</p>
        <h1 className="saved__info-consumer">
          {currentUser.name}, you have{" "}
          {savedArticles.filter((item) => {
            return item.owner === currentUser._id;
          })?.length || "no"}{" "}
          saved articles
        </h1>
        <p className="saved__info-keywords">
          By keywords:{" "}
          <span className="saved__info-karticles">
            {savedArticles.filter((item) => {
              return item.owner === currentUser._id;
            }).length >= 2 ? (
              <>
                {savedArticles[0].keyword}, {savedArticles[1].keyword}, and{" "}
                {savedArticles.length - 2} other
              </>
            ) : savedArticles.length === 1 ? (
              savedArticles[0].keyword
            ) : (
              "No saved articles"
            )}
          </span>
        </p>
      </section>
      <section className="main__results-section">
        {savedArticles.filter((item) => {
          return item.owner === currentUser._id;
        }).length === 0 ? (
          <h1 className="main__no-saved-articles">No Saved Articles</h1>
        ) : (
          <ul className="main__results-container">
            {savedArticles
              .filter((item) => {
                return item.owner === currentUser._id;
              })
              .map((article) => {
                return (
                  <SavedNewsCard
                    onRemoveItem={onRemoveItem}
                    key={article._id}
                    article={article}
                    summary={summary}
                  />
                );
              })}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Saved;
