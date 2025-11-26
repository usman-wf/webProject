# Nexus

Nexus is a modern social media platform built with Next.js and Django, featuring real-time messaging, posts, stories, notifications, and user interactions.

## 🌐 Live Deployment

- **Domain**: [https://www.nexuswebsite.me](https://www.nexuswebsite.me)
- **Frontend**: [https://www.nexuswebsite.me](https://www.nexuswebsite.me)
- **Backend API**: [https://nexus-ri4c.onrender.com](https://nexus-ri4c.onrender.com)

## 🏗️ Project Structure

This project consists of two main components:

### Frontend (`nexus/`)

A Next.js 14 application that provides the user interface and client-side functionality.

**Tech Stack:**

- **Framework**: Next.js 14.2.7
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Real-time Communication**: Socket.IO
- **HTTP Client**: Axios
- **State Management**: React Hooks
- **Authentication**: JWT tokens with cookies

**Key Features:**

- User authentication (login/signup)
- Dashboard with posts and stories
- Real-time messaging with Socket.IO
- User profiles and search
- Notifications system
- Post creation and interaction
- Story creation and viewing
- Support system

### Backend (`nexus-web/nexus_backend/`)

A Django REST API that handles all server-side logic, database operations, and business logic.

**Tech Stack:**

- **Framework**: Django 5.1.1
- **API**: Django REST Framework + Django Ninja
- **Authentication**: JWT (django-ninja-jwt, djangorestframework-simplejwt)
- **Database**: PostgreSQL (production) / SQLite (development)
- **Task Queue**: Celery with Redis
- **CORS**: django-cors-headers

**Key Features:**

- RESTful API endpoints
- JWT-based authentication
- User management
- Post and story management
- Real-time messaging support
- Notification system
- Background task processing with Celery
- File upload handling (images for posts, stories, profiles)

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.10 or higher)
- **PostgreSQL** (for production)
- **Redis** (for Celery tasks)

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd nexus
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)

### Backend Setup

1. Navigate to the backend directory:

```bash
cd nexus-web/nexus_backend
```

2. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Set up environment variables:

   - Create a `.env` file in `nexus-web/nexus_backend/`
   - Add required variables (SECRET_KEY, DATABASE_URL, etc.)

5. Run migrations:

```bash
python manage.py migrate
```

6. Create a superuser (optional):

```bash
python manage.py createsuperuser
```

7. Run the development server:

```bash
python manage.py runserver
```

The backend API will be available at [http://localhost:8000](http://localhost:8000)

## 📦 Build for Production

### Frontend

```bash
cd nexus
npm run build
npm start
```

### Backend

The backend is configured to run with Gunicorn in production. Use your preferred WSGI server configuration.

## 🔧 Development

- Frontend hot-reloads automatically when you edit files in `nexus/src/`
- Backend uses Django's development server with auto-reload
- Socket.IO server runs alongside the Next.js server for real-time features

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Socket.IO Documentation](https://socket.io/docs/)

## 📝 License

This project is private and proprietary.
