# from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01a.git

FROM adminer:4.8.0

ENV ADMINER_DEFAULT_DB_DRIVER=pgsql
ENV ADMINER_DEFAULT_SERVER=postgres_db_webprog
ENV ADMINER_DEFAULT_USER=web
ENV ADMINER_DESIGN=rmsoft

COPY ./login-servers.php /var/www/html/plugins-enabled/login-servers.php
