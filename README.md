
# 🔄 Follow Insight – React Frontend

**Follow Insight** is a powerful and user-friendly web application built with **React** for the frontend and **Django REST Framework** for the backend.

It provides visual insights into your social network:
- See who follows you, but you don’t follow back
- See mutual followers
- Track unfollowers and inactive users
- Upload your data (CSV or from API)
- Clean, responsive UI built for performance and ease-of-use

---

## ⚙️ Tech Stack

### 🖥️ Frontend
- **React.js** (v18+)
- **Axios** – for API calls
- **React Router v6** – page navigation
- **Tailwind CSS / Material UI** – modern styling (optional)
- **Framer Motion** – smooth UI animations (optional)
- **Context API** – authentication and global state
- **Chart.js / Recharts** – (for future analytics dashboards)

### 🧠 Backend
- **Django** + **Django REST Framework**
- **JWT Authentication** or Token Auth
- **CORS** support for frontend integration
- **SQLite / PostgreSQL** DB
- **CSV data parser** for importing follow data

---

## 🧪 Key Features

- 🔐 User login and protected dashboard (token-based)
- 📂 Upload follower/following data
- 🔁 Display mutual follows and one-sided follows
- 📊 Display counts of each category
- 🎨 Clean responsive design (mobile/tablet/desktop)
- 📤 Future plan: Live Instagram/Twitter API integration
- 🌙 Optional Dark Mode support

---

## 📁 Project Structure (Frontend Only)

```
follow-insight/
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   │   └── api.js         # Axios instance
    │   ├── context/
    │   │   └── AuthContext.js # Token/auth context
    │   ├── App.js
    │   └── index.js
    └── README.md
```

---

## 🚀 Getting Started (Frontend Setup)

### Prerequisites

- Node.js >= 16
- npm or yarn
- Django backend running on `http://localhost:8000`

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/follow-insight.git
cd follow-insight/frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

> The app will run on `http://localhost:3000`

---

## 🔗 Backend Connection (Django API)

This frontend talks to a Django backend running on port `8000`. Enable CORS on the Django side:

### Backend settings

```bash
pip install django-cors-headers
```

In `settings.py`:

```python
INSTALLED_APPS = [
    ...,
    "corsheaders",
    ...
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    ...
]

CORS_ALLOW_ALL_ORIGINS = True
```

---

## 🔐 Authentication Flow

- User logs in via email & password
- Django backend returns a **token**
- Token is saved to `localStorage`
- All future API requests use:

```js
axios.get("/api/mutuals", {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
```

---

## 📡 API Endpoints (Used by Frontend)

| Method | Endpoint               | Description                                      |
|--------|------------------------|--------------------------------------------------|
| POST   | `/api/login/`          | User login                                       |
| POST   | `/api/register/`       | User registration                                |
| GET    | `/api/followers/`      | Fetch uploaded followers                         |
| GET    | `/api/following/`      | Fetch uploaded following                         |
| GET    | `/api/mutuals/`        | Show mutual follow relationships                 |
| GET    | `/api/nonfollowers/`   | You follow them, but they don’t follow back     |
| GET    | `/api/nofollowback/`   | They follow you, but you don’t follow back      |
| POST   | `/api/upload/`         | Upload CSV data of followers/following          |

---

## 📦 Example `.env` for Frontend

Create a `.env` file in the `frontend` folder:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

In your `api.js` Axios file:

```js
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
```

---

## 🧪 Running Tests (Frontend)

```bash
npm test
```

> Uses React Testing Library + Jest  
> You can test individual components and API logic.

---

## 🛠️ Useful Scripts

| Script          | Description                              |
|-----------------|------------------------------------------|
| `npm start`     | Starts development server                 |
| `npm run build` | Builds frontend for production            |
| `npm test`      | Runs tests                                |
| `npm run lint`  | Lints code for issues (optional)          |

---

## 🚀 Deployment

You can deploy the frontend on:

- **Vercel**
- **Netlify**
- **GitHub Pages**
- **Render (full-stack deploy)**

Make sure to update `REACT_APP_API_URL` to your production backend domain in `.env`.

---

## 📈 Future Roadmap

- [ ] Real-time social media API integration (Instagram, Twitter)
- [ ] PDF or Excel export
- [ ] Charts showing growth / engagement over time
- [ ] OAuth login (Google, Facebook)
- [ ] Admin panel (React + Django Admin combo)
- [ ] PWA: Install the app on your phone

---

## 🧑‍💻 Author

Made with 💙 by **[Your Name]**

- GitHub: [https://github.com/yourusername](https://github.com/yourusername)
- Email: youremail@example.com
- LinkedIn: [linkedin.com/in/yourname](https://linkedin.com/in/yourname)

---

## 📝 License

This project is licensed under the [MIT License](../LICENSE).

---

## 🙌 Acknowledgments

- Django & React communities  
- Tailwind / Material UI teams  
- Open-source libraries used  
- YouTube tutorials that inspired UI

---

## ⭐ Support

If you found this project helpful, please consider:

- ⭐ Starring the repo
- 📤 Sharing with your network
- 🧠 Giving feedback or contributing

> Let's make analytics and social insights more accessible 💡

