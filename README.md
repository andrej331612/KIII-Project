# Book Library Management — CI/CD & Kubernetes Project

A three-tier Book Library Management application, built as the project for the **Continuous Integration and Delivery (КИИИ)** course at FINKI. The project takes an existing monolithic Spring Boot + Thymeleaf application and converts it into a modern three-service architecture — Angular frontend, Spring Boot REST API backend, and PostgreSQL database — fully containerized, with an automated CI pipeline and a complete Kubernetes deployment.

## Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Angular   │ ───► │ Spring Boot │ ───► │  PostgreSQL │
│  (frontend) │      │  (backend)  │      │  (database) │
└─────────────┘      └─────────────┘      └─────────────┘
```

- **Frontend** — Angular 21 (standalone components, signals, zoneless), served as a static build via Nginx
- **Backend** — Spring Boot 4 REST API (Java 21), Spring Data JPA, Spring Security (CORS only, no auth)
- **Database** — PostgreSQL 16

The application manages **Authors**, **Books**, and **Book Reservations**, with full CRUD support for authors and books, and create/list support for reservations.

> This project started life as a server-rendered Spring Boot + Thymeleaf application from a separate course. It was restructured into this three-service architecture specifically to satisfy this course's requirement of at least three services, including a database.

## Repository Structure

```
KIII-Project/
├── backend/              Spring Boot REST API
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/             Angular application
│   ├── src/
│   ├── package.json
│   ├── Dockerfile
│   └── nginx.conf
├── k8s/                  Kubernetes manifests
│   ├── namespace.yaml
│   ├── postgres-secret.yaml
│   ├── postgres-configmap.yaml
│   ├── postgres-statefulset.yaml
│   ├── postgres-service.yaml
│   ├── backend-configmap.yaml
│   ├── backend-secret.yaml
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   └── ingress.yaml
├── .github/workflows/
│   └── ci-cd.yml         GitHub Actions pipeline
├── docker-compose.yml
├── .env.example
└── README.md
```

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 21, TypeScript, standalone components, Signals |
| Backend | Java 21, Spring Boot 4, Spring Data JPA, Spring Security, Lombok |
| Database | PostgreSQL 16 |
| Containerization | Docker, multi-stage builds |
| Orchestration (local) | Docker Compose |
| CI/CD | GitHub Actions, Docker Hub |
| Orchestration (cluster) | Kubernetes (tested with k3d / k3s) |
| Ingress controller | Traefik (bundled with k3d) |

## Running Locally Without Docker

Useful for active development on either side individually.

**Backend** (requires Java 21, a running Postgres instance):

```bash
cd backend
export DB_HOST=localhost
export DB_PASSWORD=postgres
./mvnw spring-boot:run
```

**Frontend** (requires Node 20+):

```bash
cd frontend
npm install
ng serve
```

Frontend dev server runs at `http://localhost:4200`, proxying API calls to `http://localhost:8080`.

## Running with Docker Compose

This is the simplest way to run the entire stack — backend, frontend, and a fresh Postgres instance — with one command.

1. Copy the example environment file and adjust if needed:

   ```bash
   cp .env.example .env
   ```

2. Bring up the stack:

   ```bash
   docker compose up --build
   ```

3. Open the app:

   - Frontend: [http://localhost:8081](http://localhost:8081)
   - Backend API: [http://localhost:8080/api/authors](http://localhost:8080/api/authors)

4. Stop everything:

   ```bash
   docker compose down
   ```

   Add `-v` to also delete the Postgres data volume and start completely fresh next time.

### Environment Variables

Set in `.env` (read automatically by Docker Compose):

| Variable | Purpose | Example |
|---|---|---|
| `DB_HOST` | Postgres hostname | `postgres` (Compose service name) |
| `DB_PORT` | Postgres port | `5432` |
| `DB_NAME` | Database name | `books` |
| `DB_USERNAME` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | — |
| `CORS_ALLOWED_ORIGIN` | Origin allowed to call the backend API | `http://localhost:8081` |

## CI/CD Pipeline

Every push to `main` triggers `.github/workflows/ci-cd.yml`, which:

1. Checks out the repository
2. Logs in to Docker Hub using repository secrets
3. Builds the backend image and pushes it to Docker Hub
4. Builds the frontend image and pushes it to Docker Hub

**Required GitHub repository secrets:**

| Secret | Value |
|---|---|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | A Docker Hub access token (Account Settings → Security → Personal Access Tokens) |

Images are published as:

- `<dockerhub-username>/book-library-backend:latest`
- `<dockerhub-username>/book-library-frontend:latest`

## Running on Kubernetes

Tested with [k3d](https://k3d.io/) (lightweight k3s-in-Docker), which ships with the Traefik ingress controller built in.

### 1. Create a cluster

```bash
k3d cluster create kiii-cluster --port "8080:80@loadbalancer"
```

### 2. Apply the manifests, in order

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/postgres-secret.yaml
kubectl apply -f k8s/postgres-configmap.yaml
kubectl apply -f k8s/postgres-statefulset.yaml
kubectl apply -f k8s/postgres-service.yaml
kubectl apply -f k8s/backend-configmap.yaml
kubectl apply -f k8s/backend-secret.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
kubectl apply -f k8s/ingress.yaml
```

### 3. Verify everything is running

```bash
kubectl get pods -n book-library
kubectl get ingress -n book-library
```

All pods should show `1/1 Running`.

### 4. Open the app

```
http://localhost:8080
```

Both the frontend and `/api/*` backend routes are served through this single Ingress entry point — no CORS configuration needed in this setup, since frontend and backend share the same origin once routed through Traefik.

### Tearing down

```bash
k3d cluster delete kiii-cluster
```

### Kubernetes Resources Summary

| Resource | Purpose |
|---|---|
| `Namespace` (`book-library`) | Isolates all project resources from the rest of the cluster |
| `StatefulSet` (postgres) | Runs Postgres with stable identity and a dedicated `PersistentVolumeClaim`, so data survives pod restarts |
| `Deployment` (backend, frontend) | Stateless, replicable workloads for the API and the static frontend |
| `Service` (postgres — headless, backend, frontend — ClusterIP) | Stable internal DNS names and load balancing between pods |
| `ConfigMap` / `Secret` | Non-sensitive config (DB name, host, port) vs. sensitive values (passwords), injected as environment variables |
| `Ingress` | Routes `/api/*` to the backend Service and everything else to the frontend Service, through Traefik |

## Key Design Decisions

- **StatefulSet, not Deployment, for Postgres.** Unlike the stateless backend/frontend, the database needs stable storage and identity across restarts — a `StatefulSet` with a `volumeClaimTemplate` is the correct primitive for this, not a `Deployment` with a manually-attached volume.
- **All configuration is environment-variable driven.** Database host/port/credentials and the CORS allowed origin are never hardcoded — they're injected via `${VAR:default}` placeholders in `application.properties` (backend) and via `ConfigMap`/`Secret`/`.env` depending on the environment (local, Compose, Kubernetes). This is what allows the exact same Docker image to run correctly across all three environments without rebuilding.
- **SSR was disabled on the Angular side.** The project was scaffolded with Angular SSR enabled by default; since the app doesn't need server-side rendering and it would have required running a Node server in production rather than a lightweight Nginx static-file server, SSR was removed in favor of a plain static build.
- **Seed data uses idempotent inserts.** `data.sql` guards every insert with `WHERE NOT EXISTS`, so the same seed script can safely run on every application startup without creating duplicate rows.

## License

Academic project — FINKI, Continuous Integration and Delivery course.
