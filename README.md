# LearningWebsite

A learning website project with an Expo frontend, an Express API, a MySQL
database, quiz content, and topic image uploads.

## Project layout

- `frontend/` - Expo and React Native application, including web support.
- `backend/` - Express API and MySQL initialization scripts.
- `backend/seeds/` - Quiz seed data.
- `backend/mysql-init/` - Database schema, migrations, and demo content.
- `topic_uploads.tar.gz` - Topic images loaded into the Docker uploads volume.
- `learningwebsite.sql` and `learningwebsite-utf8.sql` - Supplied database
  snapshots.

## Run with Docker

Requirements: Docker Desktop with Docker Compose.

1. Optionally copy the example environment file to override the local demo credentials:

   ```powershell
   Copy-Item .env.example .env
   ```

   Without a `.env` file, Docker Compose uses the local demo password
   `change-me`. Change it before exposing the database or deploying the project.

2. Start the database and API from the project root:

   ```powershell
   docker compose up --build -d
   ```

3. Check that the services are running and the API responds:

   ```powershell
   docker compose ps
   curl.exe http://localhost:5000/api/topics
   ```

The database initialization scripts import the supplied demo content when the
MySQL data volume is first created. The backend loads `topic_uploads.tar.gz`
into its persistent uploads volume on first startup.

## Run the frontend

In another terminal:

```powershell
Set-Location frontend
npm ci
$env:EXPO_PUBLIC_API_URL = "http://localhost:5000/api"
npm run web
```

Open `http://localhost:8081`. For a physical device, set
`EXPO_PUBLIC_API_URL` to an address reachable from that device.

## Local backend development

For a local MySQL instance, create `backend/.env` from the example and configure the database connection:

```powershell
Copy-Item backend/.env.example backend/.env
Set-Location backend
npm ci
npm start
```

`backend/.env` is ignored by Git. The backend defaults to the local demo
credentials (`localhost`, `root`, `change-me`, and `learn_schema`); set
`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` as needed to
match your MySQL instance.

## Restore the database snapshot

The initialization scripts are applied only when the MySQL data volume is
created for the first time. To recreate it and apply them again:

```powershell
docker compose down -v
docker compose up --build -d
```

For more Docker commands, networking details, and restore guidance, see
[DOCKER.md](./DOCKER.md).

## Included data

The supplied SQL snapshots, seed content, and topic image archive are kept in
the repository to make transfers and project setup reproducible. These assets
are intended as demonstration/project data; review their contents and ensure
you have permission to publish them before distributing this public repository.
