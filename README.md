# Bloglist CI/CD

A full-stack blog listing application built as part of [Full Stack Open](https://fullstackopen.com) Part 11 (CI/CD) exercise.

The app is the Redux version of the Bloglist app from parts 4–7, restructured into a monorepo with a full CI/CD pipeline via GitHub Actions.

## Live App

🔗 [fullstackopen-bloglist-cicd-n0dk.onrender.com](https://fullstackopen-bloglist-cicd-n0dk.onrender.com)

## Test Account

To explore the app without registering:

- **Username:** `demo`
- **Password:** `demo123`

## Structure

```
├── backend/      # Express.js REST API + MongoDB
├── frontend/     # React + Redux + Vite
└── e2e-tests/    # Playwright end-to-end tests
```

## Tech Stack

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth  
**Frontend:** React, Redux Toolkit, React Router, MUI, Vite  
**Testing:** Vitest + React Testing Library (unit), Playwright (e2e)  
**CI/CD:** GitHub Actions → Render

## CI/CD Pipeline

On every push to `main`:

1. Backend lint + tests
2. Frontend lint + tests
3. Build frontend, serve via backend
4. Playwright e2e tests
5. Deploy to Render
6. Discord notification + version tag


## Related

This repo is part of the [fullstackopen-cicd](https://github.com/Akiz-Ivanov/fullstackopen-cicd) exercise set.