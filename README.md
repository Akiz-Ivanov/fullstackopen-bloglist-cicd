# Bloglist CI/CD & Containerization

A full-stack blog listing application built as part of [Full Stack Open](https://fullstackopen.com) Part 11 (CI/CD) and Part 12 (Docker containerization).

The app is the Redux version of the Bloglist app from parts 4–7, restructured into a monorepo with a full CI/CD pipeline via GitHub Actions, and containerized for both local development and production.

## Live App

🔗 [fullstackopen-bloglist-cicd-n0dk.onrender.com](https://fullstackopen-bloglist-cicd-n0dk.onrender.com)

## Test Account

To explore the live app without registering:

- **Username:** `demo`
- **Password:** `demo123`

## Structure

```
├── backend/              # Express.js REST API + MongoDB
│   ├── mongo/             # Mongo image + init script (scoped DB user)
│   ├── dev.Dockerfile
│   ├── requests/          # REST Client requests (incl. test user creation)
│   └── Dockerfile
├── frontend/              # React + Redux + Vite
│   ├── dev.Dockerfile
│   └── Dockerfile
├── e2e-tests/             # Playwright end-to-end tests
├── nginx.dev.conf
├── nginx.conf
├── docker-compose.dev.yml
└── docker-compose.yml
```

## Tech Stack

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth
**Frontend:** React, Redux Toolkit, React Router, MUI, Vite
**Testing:** Vitest + React Testing Library (unit), Playwright (e2e)
**CI/CD:** GitHub Actions → Render
**Containerization:** Docker, Docker Compose, nginx

## Running with Docker

### Development

```
docker compose -f docker-compose.dev.yml up --build
```

App: [http://localhost:8080](http://localhost:8080) — hot reload enabled on both frontend and backend.

### Production

```
docker compose -f docker-compose.yml up --build
```

App: [http://localhost:8080](http://localhost:8080) — static frontend build served via nginx, backend running without dev tooling.

### Seeding local data

No data ships with a fresh local database. Seed a test user and sample blogs using the app's own models (correctly bcrypt-hashed, not hand-faked):

```
docker compose -f <docker-compose.dev.yml|docker-compose.yml> run --rm backend npm run seed
```

Seeds: `testuser` / `testpass123`, plus two sample blogs.

Alternatively, create a user manually via `requests/create_new_user.rest` (REST Client extension) or:

```
curl -X POST http://localhost:3003/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","name":"Test User","password":"testpass123"}'
```

## CI/CD Pipeline

On every push to `main`:

1. Backend lint + tests
2. Frontend lint + tests
3. Build frontend, serve via backend
4. Playwright e2e tests
5. Deploy to Render
6. Discord notification + version tag

## Related

- [fullstackopen-cicd](https://github.com/Akiz-Ivanov/fullstackopen-cicd) — Part 11 exercise set
- [fullstackopen-containers](https://github.com/Akiz-Ivanov/fullstackopen-containers) — Part 12 exercise set