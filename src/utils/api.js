export const addArticle = (
  { title, description, urlToImage, publishedAt, source },
  baseUrl,
  jwt,
) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      title,
      description,
      urlToImage,
      publishedAt,
      source,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};
