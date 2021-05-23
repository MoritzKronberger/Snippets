# from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01a.git

#!/usr/bin/env bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
CREATE USER web WITH LOGIN CREATEDB PASSWORD 'web'
EOSQL

FILES=/tmp/*.sql

for f in $FILES
do
  db=$(basename -- "$f")
  db="${db%.*}"
  echo "Creating Database $db"
  createdb --username web $db 
  psql -v ON_ERROR_STOP=1 --username web -f $f $db
done

echo "------------> 01_sql.sh has finished sucessfully"
