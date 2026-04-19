import SearchForm from "../../components/SearchForm/SearchForm";
import NewsCard from "../../components/NewsCard/NewsCard";
import "./Main.css";
import About from "../About/About";

function Main({ newsData }) {
  return (
    <main className="main">
      <section className="main__search-section">
        <div className="main__search-container">
          <h1 className="main__title">What's going in the world?</h1>
          <p className="main__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm />
        </div>
      </section>
      <section className="main__results-section">
        <h1 className="main__results-section-title">Search Results</h1>
        <ul className="main__results-container">
          {newsData.map((article) => {
            return <NewsCard key={article.id} article={article} />;
          })}
        </ul>
      </section>
      <section className="about">
        <About />
      </section>
    </main>
  );
}
export default Main;
