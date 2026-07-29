import "./SearchForm.css";

function SearchForm({ onNewsRequest }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    const newsValue = { news: evt.target.news.value };
    onNewsRequest(newsValue);
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-form__input-container">
        <input
          type="text"
          className="search-form__input"
          id="news"
          name="news"
          placeholder="Enter News Request"
          required
          minLength="2"
          maxLength="30"
        />
        <button type="submit" className="search-form__button">
          Search
        </button>
      </div>
    </form>
  );
}
export default SearchForm;
