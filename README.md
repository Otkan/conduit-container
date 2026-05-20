# Conduit Containerized Application

A fully containerized version of the Conduit application using Docker Compose.
The project consists of a frontend (Angular), backend (Django), and a PostgreSQL database, all running as isolated services.

---

## Table of Contents

* [Architecture Overview](#architecture-overview)
* [Prerequisites](#prerequisites)
* [Quickstart](#quickstart)
* [Usage](#usage)
* [Deployment](#deployment)
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
git clone git@github.com:Otkan/conduit-container.git
cd conduit-container
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

## Deployment

The project includes a GitHub Actions workflow for automated deployment to a cloud VM via SSH.

The deployment workflow is located in:

```bash
.github/workflows/deployment.yaml
```

### Deployment Process

The workflow performs the following steps:

1. Opens an SSH connection to the target server
2. Navigates to the project directory
3. Pulls the latest changes from the repository
4. Stops running containers
5. Rebuilds and starts the updated containers using Docker Compose

### GitHub Secrets

The deployment workflow uses GitHub repository secrets for sensitive configuration.

Required secrets:

| Secret Name     | Description                                          |
| --------------- | ---------------------------------------------------- |
| SSH_HOST        | Server IP or hostname                                |
| SSH_USER        | SSH username                                         |
| SSH_PRIVATE_KEY | Private SSH key used for deployment                  |
| PROJECT_PATH    | Absolute path to the project directory on the server |

### Trigger Deployment

Deployment is triggered automatically on push to the `main` branch.

### Start Deployment Manually

```bash
git push origin main
```

### Verify Deployment

After deployment, verify the running containers:

```bash
docker compose ps
```

View logs:

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
├── conduit-backend/              # Django backend
├── conduit-frontend/             # Angular frontend
├── .github/workflows/            # GitHub Actions workflows
├── docker-compose.yaml           # Service orchestration
├── .env.example                  # Example configuration
├── README.md                     # Documentation
```

---

## Implementation Details

* Multi-stage builds are used for both frontend and backend
* Backend runs with Gunicorn instead of Django’s development server
* Frontend build injects API URL at build time
* Database is persisted using Docker volumes
* Services communicate via an internal Docker network
* Restart policy is set to `unless-stopped`
* Deployment is automated using GitHub Actions and SSH

---

## Notes

* The backend connects to PostgreSQL using environment variables
* The frontend dynamically receives the API URL during build
* No sensitive data is stored in the repository
* `.env` is excluded via `.gitignore`
* SSH credentials are handled via GitHub repository secrets
* The deployment workflow automatically updates the running containers on the server

---

## Summary

This setup provides a clean and production-oriented container architecture with:

* Separation of concerns
* Secure configuration handling
* Scalable service structure
* Automated deployment workflow

---
