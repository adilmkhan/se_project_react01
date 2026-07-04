import "./SavedNewsCard.css";
import defaultImage from "../../assets/placeholder_image.avif";

function SavedNewsCard({ article, onRemoveItem }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <li className="saved-news-card">
      <div className="news-card__image-container">
        <button
          onClick={() => onRemoveItem(article)}
          type="button"
          className="news-card__delete-btn"
        ></button>
        <button type="button" className="news-card__summary-btn"></button>
        <h2 className="saved-news-card__image-description">
          {article.keyword}
        </h2>
        <img
          src={article.urlToImage || defaultImage}
          alt={article.title}
          className="saved-news-card__image"
        />
      </div>
      <div className="saved-news-card__content">
        <div className="news-card__meta">
          <time className="saved-news-card__date">
            {formatDate(article.publishedAt)}
          </time>
        </div>
        <h3 className="saved-news-card__title">{article.title}</h3>
        <p className="saved-news-card__description">{article.description}</p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="saved-news-card__url"
        >
          <p className="saved-news-card__source">{article.source}</p>
        </a>
      </div>
    </li>
  );
}

export default SavedNewsCard;
