# News Explorer (Frontend)

News Explorer is a React-based client application that allows users to search for recent news articles by keyword and view them in an interactive card-based interface. Articles are fetched from a public News API and displayed in batches. Authenticated users can save articles and manage them from a dedicated saved articles page.

This repository contains the **React frontend** for the application. A separate backend service handles authentication and persistent article storage.

---

## Features

- Search for news articles by keyword
- Articles fetched from the News API
- Results rendered as responsive card components
- Results revealed in batches using a **Show More** button
- Loading indicator during API requests
- "No results found" state for empty searches
- User authentication interface (login and registration modals)
- Ability to save articles when logged in
- Dedicated **Saved Articles** route for viewing saved content
- Responsive layout for desktop, tablet, and mobile

---

## Tech Stack

**Frontend**

- React
- React Router
- JavaScript (ES6+)
- CSS
- BEM Methodology
- Vite

**External APIs**

- NewsAPI (for retrieving news articles)

**Backend (separate repository)**

- Node.js
- Express
- MongoDB
- JWT Authentication

The backend service provides authentication and endpoints for saving and deleting articles.

---

## How the Application Works

1. The user enters a keyword into the search bar.
2. The application sends a request to the News API with the search term.
3. The API returns articles matching the query.
4. Articles are displayed as cards in the UI.
5. Initially only a small batch of articles is displayed.
6. Clicking **Show More** loads additional articles.
7. Logged-in users can save articles.
8. Saved articles appear on the **Saved Articles** page.

---

## Project Structure

```text
src/
├── components/
│   ├── Header/
│   ├── Main/
│   ├── SearchForm/
│   ├── NewsCard/
│   ├── SavedNewsCard/
│   ├── Saved/
│   ├── Footer/
│   ├── LoginModal/
│   ├── RegisterModal/
│   ├── RegisterSuccessModal/
│   └── Preloader/
├── contexts/
│   └── CurrentUserContext.js
├── hooks/
│   └── useForm.js
├── utils/
│   ├── api.js
│   ├── newsApi.js
│   ├── auth.js
│   └── token.js
├── assets/
└── App.jsx
```

---

## Future Improvements

- AI-generated article summaries
- Personalized article recommendations
- Improved article filtering
- Enhanced mobile UX
- Pagination for large result sets

---

## License

This project was developed as part of the TripleTen Software Engineering program.

### Click **[here](https://github.com/adilmkhan/se_project_express01/pull/1)** to be directed to Express Backend Server Pull Request.
