export const getNews = ({ news }, APIkey) => {
  return fetch().then((res) => {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  });
};
