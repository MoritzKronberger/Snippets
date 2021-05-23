# from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01a.git

#!/usr/bin/env bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
CREATE EXTENSION pgcrypto;
EOSQL

echo "------------> 02_extensions.sh has finished sucessfully"
