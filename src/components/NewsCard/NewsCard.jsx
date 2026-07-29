import "./NewsCard.css";
import defaultImage from "../../assets/placeholder_image.avif";

function NewsCard({ article, isLoggedIn, onNewsAdd, isSaved, savedId }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  function handleSubmit() {
    const newsValues = {
      title: article.title,
      description: article.description,
      urlToImage:
        article.urlToImage ||
        "https://images.unsplash.com/photo-1495020689067-958852a7765e",
      publishedAt: article.publishedAt,
      source: article.source.name,
      url: article.url,
      keyword: article.keyword,
    };
    onNewsAdd({ isSaved, savedId }, newsValues);
  }
  return (
    <li className="news-card">
      <div className="news-card__image-container">
        <img
          src={article.urlToImage || defaultImage}
          alt={article.title}
          className="news-card__image"
        />
        {isLoggedIn ? (
          <button
            onClick={handleSubmit}
            type="button"
            className={`news-card__save-btn ${isSaved ? "news-card__saved-btn-saved" : ""}`}
          ></button>
        ) : (
          <button
            type="button"
            className="news-card__inactive-save-btn"
          ></button>
        )}
      </div>

      <div className="news-card__content">
        <div className="news-card__meta">
          <time className="news-card__date">
            {formatDate(article.publishedAt)}
          </time>
        </div>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__description">{article.description}</p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="news-card__url"
        >
          <p className="news-card__source">{article.source.name}</p>
        </a>
      </div>
    </li>
  );
}

export default NewsCard;
