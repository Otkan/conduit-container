# Conduit Containerized Application

This repository contains a containerized version of the Conduit application.
It consists of a frontend (Angular), a backend (Django), and a PostgreSQL database, all orchestrated using Docker Compose.

The goal of this project is to demonstrate containerization, multi-stage builds, environment-based configuration, and service orchestration.

---

## Table of Contents

* [Quickstart](#quickstart)
* [Usage](#usage)
* [Configuration](#configuration)
* [Repository Contents](#repository-contents)

---

## Quickstart

### Requirements

* Docker
* Docker Compose

### Start the application

```bash
cp .env.example .env
docker compose up -d --build
```

### Access the application

* Frontend: http://localhost:8282
* Backend API: http://localhost:8001/api

---

## Usage

### Start services

```bash
docker compose up -d
```

### Stop services

```bash
docker compose down
```

### Rebuild containers

```bash
docker compose up -d --build
```

### View logs

```bash
docker compose logs -f
```

### Test API

```bash
curl http://localhost:8001/api/articles
curl http://localhost:8001/api/tags
```

---

## Configuration

Configuration is handled via the `.env` file.

### Important variables

```env
POSTGRES_DB=conduit
POSTGRES_USER=conduit
POSTGRES_PASSWORD=your_password
POSTGRES_HOST=database
POSTGRES_PORT=5432

BACKEND_PORT=8001
FRONTEND_PORT=8282

FRONTEND_API_URL=http://localhost:8001/api
```

### Notes

* `FRONTEND_API_URL` is injected during the frontend build process
* No sensitive data is stored in the repository
* `.env` is ignored via `.gitignore`

---

## Repository Contents

```
.
├── conduit-backend/        # Django backend
├── conduit-frontend/       # Angular frontend
├── docker-compose.yaml     # Service orchestration
├── .env.example            # Example configuration
├── README.md               # Documentation
```

---

## Architecture Overview

* **Frontend:** Angular app served via Nginx
* **Backend:** Django application running with Gunicorn (WSGI)
* **Database:** PostgreSQL with persistent volume
* **Networking:** Internal Docker network

---

## Notes

* The backend uses Gunicorn instead of Django’s development server
* Multi-stage builds are used for both frontend and backend
* Restart policy is set to `unless-stopped` for stability
* Database data is persisted using Docker volumes
