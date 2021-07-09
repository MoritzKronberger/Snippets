# from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01
#!/usr/bin/env bash
set -e
db=$WEB_DB

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
CREATE USER web WITH LOGIN CREATEDB PASSWORD 'web'
EOSQL

FILES=/tmp/*.sql

echo "Creating Database $db"
createdb --username web $db 

for f in $FILES
do
  echo "Inserting schema and data into $db"
  psql -v ON_ERROR_STOP=1 --username web -f $f $db
done

echo "------------> 10_databases.sh has finished successfully"
