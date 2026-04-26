import SearchForm from "../../components/SearchForm/SearchForm";
import NewsCard from "../../components/NewsCard/NewsCard";
import "./Main.css";
import About from "../About/About";
import notFound from "../../assets/not-found_v1.svg";
import Preloader from "../Preloader/Preloader";

function Main({
  newsData,
  newsResults,
  onNewsRequest,
  isLoggedIn,
  noNewsResults,
  newsIsLoading,
  handleShowMoreNews,
  visibleCount,
  handleAddArticle,
  savedArticles,
}) {
  return (
    <main className="main">
      <section className="main__search-section">
        <div className="main__search-container">
          <h1 className="main__title">What's going on in the world?</h1>
          <p className="main__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm onNewsRequest={onNewsRequest} />
        </div>
      </section>
      {newsIsLoading ? (
        <Preloader />
      ) : newsResults ? (
        noNewsResults ? (
          <div className="no-results">
            <img src={notFound} alt="notFound" className="no-results__image" />
            <h1 className="no-results__title">Nothing Found</h1>
            <p className="no-results__description">
              Sorry, but nothing matched your search terms.
            </p>
          </div>
        ) : (
          <section className="main__results-section">
            <h1 className="main__results-section-title">Search Results</h1>
            <ul className="main__results-container">
              {newsData.slice(0, visibleCount).map((article) => {
                const isSaved = savedArticles.some(
                  (savedArticle) =>
                    savedArticle.title === article.title &&
                    savedArticle.description === article.description,
                );
                return (
                  <NewsCard
                    key={`${article.id}-${article.source.name}`}
                    article={article}
                    isLoggedIn={isLoggedIn}
                    onNewsAdd={handleAddArticle}
                    isSaved={isSaved}
                  />
                );
              })}
            </ul>
            {newsData.length > visibleCount ? (
              <button
                type="button"
                onClick={handleShowMoreNews}
                className="showmore-btn"
              >
                Show more
              </button>
            ) : null}
          </section>
        )
      ) : null}
      <section className="about">
        <About />
      </section>
    </main>
  );
}
export default Main;
