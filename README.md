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

## Deployment and Infrastructure

The application was deployed to AWS using a combination of Terraform and manual application deployment steps. Terraform was used to provision the core cloud infrastructure, including the VPC, public subnet, route table, internet gateway, security group, EC2 instance, SSH key pair, and Elastic IP.

The EC2 server was bootstrapped with Node.js, MongoDB, PM2, Nginx, UFW, and Certbot. Nginx serves the built React frontend and reverse proxies API requests to the Express backend. HTTPS was configured with Certbot, and the frontend production build was uploaded to the server using `scp`.

This deployment helped separate infrastructure setup from application deployment while making the AWS environment repeatable and easier to manage.

---

## License

This project was developed as part of the TripleTen Software Engineering program.

### Click **[here](https://www.loom.com/share/6481984d0c1641d9842be63592b4c638)** to be directed to Project Pitch.

### Click **[here](https://github.com/adilmkhan/se_project_express01/pull/1)** to be directed to Express Backend Server Pull Request.

### Click **[here](https://the-newsapp.blinklab.com/)** to be directed to the News App Webpage.
