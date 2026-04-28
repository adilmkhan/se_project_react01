import "./SavedNewsCard.css";
import defaultImage from "../../assets/placeholder_image.avif";

function SavedNewsCard({ article }) {
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
        <button type="button" className="news-card__delete-btn"></button>
        <h2 className="news-card__image-description">{article.keyword}</h2>
        <img
          src={article.urlToImage || defaultImage}
          alt={article.title}
          className="news-card__image"
        />
      </div>
      <div className="news-card__content">
        <div className="news-card__meta">
          <time className="news-card__date">
            {formatDate(article.publishedAt)}
          </time>
        </div>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__description">{article.description}</p>
        <p className="news-card__source">{article.source.name}</p>
      </div>
    </li>
  );
}

export default SavedNewsCard;
