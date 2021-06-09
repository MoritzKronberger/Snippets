# from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_postgres_01

FROM postgres:latest AS builder

ARG WEB_DB

ENV POSTGRES_USER       postgres
ENV POSTGRES_PASSWORD   postgres
ENV POSTGRES_DB         postgres
ENV WEB_DB              $WEB_DB
ENV PGDATA              /var/lib/postgresql/custom

USER postgres

COPY custom-entrypoint.sh /usr/local/bin/
COPY init /docker-entrypoint-initdb.d/
COPY sql  /tmp

USER root

RUN chmod +x /usr/local/bin/custom-entrypoint.sh

USER postgres

RUN    mkdir "${PGDATA}" \ 
    && custom-entrypoint.sh postgres

ENTRYPOINT [ "custom-entrypoint.sh" ]
CMD [ "-c", "max_locks_per_transaction=512" ]



FROM postgres:latest

ENV POSTGRES_USER       postgres
ENV POSTGRES_PASSWORD   postgres
ENV POSTGRES_DB         postgres
ENV PGDATA              /var/lib/postgresql/data

VOLUME /var/lib/postgresql/data

COPY --from=builder /var/lib/postgresql/custom /var/lib/postgresql/data

HEALTHCHECK CMD ["CMD-SHELL", "pg_isready -U $DB_USER -d $DB_NAME"]
