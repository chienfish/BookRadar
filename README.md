# BookRadar

<h4 align="center"> BookRadar is a full-stack web application for discovering and managing books.<br/>  
The project uses a Django REST backend and a React frontend, with authentication handled using JWT tokens.</h4> 

<p align="center">
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#live-demo">Live Demo</a> •
  <a href="#design">Design</a> •
  <a href="#authentication">Authentication</a> •
  <a href="#local-development">Local Development</a> •
  <a href="#features">Features</a> •
  <a href="#contact">Contact</a>
</p>

<br>

[![Watch the demo](https://img.youtube.com/vi/HyxhJ6mfm_Q/maxresdefault.jpg)](https://youtu.be/HyxhJ6mfm_Q)
<br>

---

<!-- Tech Stack -->
## Tech Stack

**Backend**
- ![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
- ![Django REST](https://img.shields.io/badge/Django_REST_Framework-ff1709?style=for-the-badge&logo=django&logoColor=white)
- ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

**Frontend**
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**Deployment**
- ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)
- ![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-121013?style=for-the-badge&logo=github&logoColor=white)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- Live Demo -->
## Live Demo

Frontend  
https://chienfish.github.io/BookRadar/

Backend API  
https://bookradar-api.onrender.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- Design -->
## Design

Figma  
https://www.figma.com/design/BxjMpTsyuoEbDSISjrDV31/BookRadar?node-id=0-1&p=f&t=hhtrdZXDsm9gmyHS-0


<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- Authentication -->
## Authentication

The system uses **JWT-based authentication**.

- **Access Token** – valid for 30 minutes  
- **Refresh Token** – valid for 24 hours  

Workflow:

1. User logs in and receives an access token and refresh token.
2. The access token is used for authenticated API requests.
3. When the access token expires, the refresh token can be used to obtain a new one.
4. If the refresh token expires, the user must log in again.

Users must be authenticated to access the main application pages.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- Local Development -->
## Local Development

### Backend

```bash
cd BookRadar/backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend runs at:

- http://127.0.0.1:8000

---

### Frontend

```bash
cd BookRadar/frontend
npm install
npm run dev
```

Frontend runs at:

- http://localhost:5173

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- Features -->
## Features

- User registration and login
- JWT-based authentication
- Book discovery and management
- Protected routes for authenticated users
- Separate frontend and backend architecture

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- Contact -->
## Contact

Lin Chien-Yu  ttnrgjgui@gmail.com  

Project:  https://github.com/chienfish/real-time-bidding

<p align="right">(<a href="#readme-top">back to top</a>)</p>
