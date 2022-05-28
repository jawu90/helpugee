#!/bin/bash

if [[ "${RESET_DB}" = "true" ]]; then
  echo "Resetting database"
  PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f /app/deleteTables.sql -f /app/users.sql -f /app/features.sql
else
  echo "No need to reset database (RESET_DB is not set to 'true')"
fi
