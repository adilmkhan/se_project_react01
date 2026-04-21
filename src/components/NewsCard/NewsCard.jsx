import "./NewsCard.css";

function NewsCard({ article, isLoggedIn }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <li className="news-card">
      <div className="news-card__image-container">
        <img
          src={article.urlToImage || "/images/placeholder-image.jpg"}
          alt={article.title}
          className="news-card__image"
        />
        {isLoggedIn ? (
          <button type="button" className="news-card__save-btn"></button>
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
          className="news-card__link"
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="news-card__source">{article.source.name}</p>
        </a>
      </div>
    </li>
  );
}

export default NewsCard;
