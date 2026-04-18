import SearchForm from "../../components/SearchForm/SearchForm";
import NewsCard from "../../components/NewsCard/NewsCard";
import "./Main.css";

function Main({ newsData }) {
  return (
    <main className="main">
      <section className="main__search-section">
        <div className="main__search-container">
          <h1 className="main__title">What's going in the world</h1>
          <p className="main__subtitle">
            Find the latest news on any topic them in your personal account
          </p>
          <SearchForm />
        </div>
      </section>
      <section className="main__results-section">
        <ul className="main__results-container">
          {newsData.map((article) => {
            return <NewsCard key={article.id} article={article} />;
          })}
        </ul>
      </section>
    </main>
  );
}
export default Main;
