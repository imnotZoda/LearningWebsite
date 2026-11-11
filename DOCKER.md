# Docker development

This project runs the MySQL database and Express API in Docker. The Expo frontend can stay on the host during development.

## First setup

1. Install and start Docker Desktop.
2. From the repository root, copy the example environment file and set a MySQL root password:

```powershell
Copy-Item .env.example .env
```

The example uses `change-me`; replace it with a strong local password before
starting the database. The root `.env` file is ignored by Git.

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

On first startup, MySQL creates the schema and imports the `learningwebsite-utf8.sql` backup, which contains the LearningWebsite Python and Robotics L1-L14 topics, quizzes, and YouTube links. The backend extracts the matching `topic_uploads.tar.gz` archive into the persistent uploads volume once. Initialization scripts run only when the MySQL data volume is created for the first time. To apply initialization changes to a fresh database, use `docker compose down -v` and then start the stack again.

For an already-initialized database volume, restore the LearningWebsite backup without deleting the database volume:

```powershell
docker compose exec -T db sh -c 'mysql -uroot -p"$MYSQL_ROOT_PASSWORD" --default-character-set=utf8mb4 learn_schema < /docker-entrypoint-initdb.d/014-seed-learningwebsite.sql'
docker compose exec -T db sh -c 'mysql -uroot -p"$MYSQL_ROOT_PASSWORD" --default-character-set=utf8mb4 learn_schema < /docker-entrypoint-initdb.d/015-normalize-learningwebsite-text.sql'
```

The SQL backup replaces the app's tables with the saved LearningWebsite snapshot; back up any newer account or lesson changes before restoring. Uploaded topic images are stored in the `topic_uploads` Docker volume.

## Networking

The backend connects to MySQL with `DB_HOST=db` and internal port `3306`, because `db` is the Compose service name. Docker publishes MySQL on host port `3307` to avoid conflicts with a locally installed MySQL server. The browser connects to the backend with `http://localhost:5000/api`, because port 5000 is published to the host.
