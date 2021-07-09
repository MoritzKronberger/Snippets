# Gruppenprojekt Webprogrammierung

## Start Vue-Server

### Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

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

Or pre-filled via:

<http://localhost:11000/?pgsql=PostgreSQL&username=web&db=db_v1&ns=public>

### Reset Docker Container and Volumes after changes to the SQL commands

```bash
docker compose down
docker stop `docker ps -a -q` && docker rm `docker ps -a -q`; docker volume prune 
docker compose up --build
```

## Start Express-Server

### Create dotenv-file

```bash
node
> console.log(require('crypto').randomBytes(64).toString('hex'))
> .exit

echo HOST=http://localhost > .env
echo PORT=3000 >> .env
echo TOKEN_SECRET=... >> .env
```

### Start Server

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
