const newsApiBaseUrl = import.meta.env.PROD
  ? "https://nomoreparties.co/news/v2/everything"
  : "https://newsapi.org/v2/everything";

export const getNews = ({ q, pageSize }, apiKey, from, to) => {
  return fetch(
    `${newsApiBaseUrl}?q=${q}&from=${from}&to=${to}&${pageSize}&apiKey=${apiKey}`,
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};
