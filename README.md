# Conduit Containerized Application

A fully containerized version of the Conduit application using Docker Compose.
The project consists of a frontend (Angular), backend (Django), and a PostgreSQL database, all running as isolated services.

---

## Table of Contents

* [Architecture Overview](#architecture-overview)
* [Prerequisites](#prerequisites)
* [Quickstart](#quickstart)
* [Usage](#usage)
* [Test API](#test-api)
* [Configuration](#configuration)
* [Repository Structure](#repository-structure)
* [Implementation Details](#implementation-details)
* [Notes](#notes)
* [Summary](#summary)

---

## Architecture Overview

* Frontend: Angular application served via Nginx
* Backend: Django application running with Gunicorn
* Database: PostgreSQL with persistent volume
* Networking: Internal Docker network

---

## Prerequisites

Make sure you have installed:

* Docker
* Docker Compose

---

## Quickstart

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-repo-name>
```

---

### 2. Setup environment variables

```bash
cp .env.example .env
```

> [!IMPORTANT]
> You must create a `.env` file before starting the application.

---

### 3. Start the application

```bash
docker compose up -d --build
```

---

### 4. Access the application

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

---

## Test API

```bash
curl http://localhost:8001/api/articles
curl http://localhost:8001/api/tags
```

---

## Configuration

All configuration is handled via the `.env` file.
An example configuration file is provided here: [.env.example](.env.example)

Copy it to create your own environment file:

```bash
cp .env.example .env
```

```bash
### Environment Variables

| Variable          | Description                         |
| ----------------- | ----------------------------------- |
| POSTGRES_DB       | Name of the PostgreSQL database     |
| POSTGRES_USER     | Database user                       |
| POSTGRES_PASSWORD | Database password                   |
| POSTGRES_HOST     | Database host (Docker service name) |
| POSTGRES_PORT     | Database port                       |
| BACKEND_PORT      | Port exposed by backend             |
| FRONTEND_PORT     | Port exposed by frontend            |
| FRONTEND_API_URL  | API URL used by frontend            |
| SECRET_KEY        | Django secret key                   |
| DEBUG             | Enable/disable debug mode           |
| ALLOWED_HOSTS     | Allowed Django hosts                |


```
> [!WARNING]
> Never commit your `.env` file to GitHub.

---

## Repository Structure
```bash
.
├── conduit-backend/        # Django backend
├── conduit-frontend/       # Angular frontend
├── docker-compose.yaml     # Service orchestration
├── .env.example            # Example configuration
├── README.md               # Documentation
```

---

## Implementation Details

* Multi-stage builds are used for both frontend and backend
* Backend runs with Gunicorn instead of Django’s development server
* Frontend build injects API URL at build time
* Database is persisted using Docker volumes
* Services communicate via an internal Docker network
* Restart policy is set to `unless-stopped`

---

## Notes

* The backend connects to PostgreSQL using environment variables
* The frontend dynamically receives the API URL during build
* No sensitive data is stored in the repository
* `.env` is excluded via `.gitignore`

---

## Summary

This setup provides a clean and production-oriented container architecture with:

* Separation of concerns
* Secure configuration handling
* Scalable service structure

---
