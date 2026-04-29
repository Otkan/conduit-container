# Conduit Fullstack App (Docker Setup)

## Table of Contents

* [Overview](#-overview)
* [Repository Purpose](#-repository-purpose)
* [Tech Stack](#-tech-stack)
* [Quickstart](#-quickstart)
* [Usage](#-usage)

  * [Environment Configuration](#environment-configuration)
  * [Changing Ports](#changing-ports)
  * [Changing API URL](#changing-api-url)
* [Architecture](#-architecture)
* [Services](#-services)
* [Useful Commands](#-useful-commands)
* [Notes](#-notes)

---

## Overview

This repository contains a containerized fullstack web application based on the RealWorld "Conduit" example.

It includes:

* A frontend built with Angular
* A backend API built with Django
* A PostgreSQL database
* A Docker-based deployment setup

---

## Repository Purpose

The purpose of this repository is to demonstrate how a modern fullstack application can be:

* Containerized using Docker
* Configured via environment variables
* Structured into independent services
* Deployed in a reproducible way

It is designed as a learning project to understand container orchestration and fullstack integration.

---

## Tech Stack

* Frontend: Angular
* Backend: Django + Gunicorn
* Database: PostgreSQL
* Containerization: Docker & Docker Compose

---

## Quickstart

### Prerequisites

* Docker
* Docker Compose

### Start the application

```bash
docker compose up -d --build
```

### Access

* Frontend: http://localhost:8282
* Backend: http://localhost:8000/api

---

## Usage

### Environment Configuration

Create a `.env` file in the root directory:

```env
POSTGRES_DB=conduit
POSTGRES_USER=conduit
POSTGRES_PASSWORD=supersecurepassword
POSTGRES_HOST=database
POSTGRES_PORT=5432

BACKEND_PORT=8000
FRONTEND_PORT=8282

FRONTEND_API_URL=http://localhost:8000/api
```

---

### Changing Ports

You can change exposed ports by modifying:

```env
BACKEND_PORT=9000
FRONTEND_PORT=3000
```

Then rebuild:

```bash
docker compose up -d --build
```

---

### Changing API URL

The frontend API URL is injected during build time.

To change it:

```env
FRONTEND_API_URL=http://your-server-ip:8000/api
```

Rebuild required:

```bash
docker compose up -d --build
```

---

### How Configuration Works

1. `.env` defines variables
2. Docker Compose passes them as build arguments
3. Dockerfile injects them into Angular via:

```dockerfile
sed -i "s|__API_URL__|${FRONTEND_API_URL}|g"
```

4. Angular uses:

```ts
environment.apiUrl
```

---

## Architecture

```
[ Browser ]
     ↓
[ Frontend (Angular) ]
     ↓ HTTP
[ Backend (Django API) ]
     ↓
[ PostgreSQL Database ]
```

---

## Services

### Database

* Image: postgres:15-alpine
* Persistent volume storage

### Backend

* Django REST API
* Runs via Gunicorn
* Port: 8000

### Frontend

* Angular app served by Nginx
* Port: 8282

---

## Restart Policy

All services use:

```yaml
restart: unless-stopped
```

---

## Useful Commands

### Stop containers

```bash
docker compose down
```

### Rebuild

```bash
docker compose up -d --build
```

### Logs

```bash
docker compose logs -f
```

---

## Notes

* The API URL is not secret and is visible in the browser after build
* Changes in `.env` require rebuilding the containers
* Styling is loaded via external CDN
* CORS issues are resolved via backend configuration

---

## Status

* Application runs successfully
* Frontend ↔ Backend communication works
* No CORS issues
* Configurable via environment variables
