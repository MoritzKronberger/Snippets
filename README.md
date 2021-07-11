# Gruppenprojekt Webprogrammierung

This is a SNS, where users can share short code snippets and like and comment different posts. They can also like the comments. The displayed posts can be sorted (most liked, newest, most liked in the last 24h, most liked in the last 7 days), and filtered for categories.
While writing a post, the user chooses a programming language to add syntax highlighting to their code and adds categories, split by spaces. A user can also adjust their username and password.
The application consists of a Vue-Server, an Express Server and a Postgres Database.

## Start Vue-Server

### Change into app directory

```bash
cd frontend/app
```

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

## Start Postgres with Docker

### Change into postgres directory

```bash
cd backend/postgres_db
```

### Build and run containers

```bash
npm run build 

# or:

docker compose up --build
```

### If db-container is built and up-to-date

```bash
npm run serve

# or:

docker compose up
```

### Stop docker containers

```bash
npm run stop

# or: 

docker compose down
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

### Reset Docker Container and Volumes after changes to SQL commands

```bash
npm run reset

# or:

docker compose down
docker stop `docker ps -a -q` && docker rm `docker ps -a -q`; docker volume prune 
docker compose up --build
```

## Start Express-Server

### Change into express directory

```bash
cd backend/express_server
npm install
```

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
npm run serve
```

For development:

```bash
npm run dev
```
