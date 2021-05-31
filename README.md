# Gruppenprojekt Webprogrammierung

## Docker for Postgres

### Build and run containers

```bash
cd backend/postgres_db
docker compose up --build
```

### If db-container is built and up-to-date

```bash
cd backend/postgres_db
docker compose up
```

### Access Adminer

On: <http://localhost:11000>

Login:

```bash
Server: PostgresSQL
User: web
Password: web
Database: db_v1
```

Or faster:

<http://localhost:11000/?pgsql=PostgreSQL&username=web&db=db_v1&ns=public>

### Start Express-Server

On: <http://localhost:3000>

```bash
cd backend/express_server
npm run serve
```

For development:

```bash
cd backend/express_server
npm run dev
```
