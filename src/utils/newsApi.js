export const getNews = ({ q, pageSize }, apiKey, from, to) => {
  return fetch(
    `https://newsapi.org/v2/everything?q=${q}&from=${from}&to=${to}&${pageSize}&apiKey=${apiKey}`,
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  });
};
