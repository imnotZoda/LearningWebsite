# Docker development

This project runs the MySQL database and Express API in Docker. The Expo frontend can stay on the host during development.

## First setup

1. Install and start Docker Desktop.
2. Optionally, from the repository root, copy the example environment file to override the local demo credentials:

```powershell
Copy-Item .env.example .env
```

Without a `.env` file, Docker Compose uses the demo password `change-me`.
This is intended only for local development; change it before exposing the
database or deploying the project. The root `.env` file is ignored by Git.

3. Start MySQL and the backend:

```powershell
docker compose up --build -d
```

4. Check the services:

```powershell
docker compose ps
curl.exe http://localhost:5000/api/topics
```

5. Start the frontend in another terminal:

```powershell
Set-Location frontend
npm install
$env:EXPO_PUBLIC_API_URL = "http://localhost:5000/api"
npm run web
```

Open `http://localhost:8081` in the browser.

## Useful commands

```powershell
# Follow backend logs
docker compose logs -f backend

# Stop containers but keep database data
docker compose down

# Stop containers and delete database data
docker compose down -v

# Rebuild after backend or Dockerfile changes
docker compose up --build -d
```

On first startup, MySQL creates the schema and runs the SQL files in
`backend/mysql-init/` in filename order. The complete saved database snapshot
is `014-seed-learningwebsite.sql`; it contains the LearningWebsite Python and
Robotics L1-L14 topics, quizzes, and YouTube links. The root-level
`learningwebsite-utf8.sql` is an identical copy for manual use, while
`learningwebsite.sql` is an additional supplied snapshot. The backend extracts
`topic_uploads.tar.gz` into the persistent uploads volume once.
Initialization scripts run only when the MySQL data volume is first created.
To apply them to a fresh database, use `docker compose down -v` and then start
the stack again.

These checked-in SQL files are snapshots; new or changed records in a running
database are not automatically copied into Git. Export and commit a refreshed
snapshot when transferring later database changes to another device.

For an already-initialized database volume, restore the LearningWebsite backup without deleting the database volume:

```powershell
docker compose exec -T db sh -c 'mysql -uroot -p"$MYSQL_ROOT_PASSWORD" --default-character-set=utf8mb4 learn_schema < /docker-entrypoint-initdb.d/014-seed-learningwebsite.sql'
docker compose exec -T db sh -c 'mysql -uroot -p"$MYSQL_ROOT_PASSWORD" --default-character-set=utf8mb4 learn_schema < /docker-entrypoint-initdb.d/015-normalize-learningwebsite-text.sql'
```

The SQL backup replaces the app's tables with the saved LearningWebsite snapshot; back up any newer account or lesson changes before restoring. Uploaded topic images are stored in the `topic_uploads` Docker volume.

## Networking

The backend connects to MySQL with `DB_HOST=db` and internal port `3306`, because `db` is the Compose service name. Docker publishes MySQL on host port `3307` to avoid conflicts with a locally installed MySQL server. The browser connects to the backend with `http://localhost:5000/api`, because port 5000 is published to the host.

For running the backend directly against a local MySQL instance, the defaults
are `localhost`, user `root`, password `change-me`, and database `learn_schema`.
Set `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` in
`backend/.env` to match your local database as needed.
