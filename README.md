
## Development

For development, run the following command:

```
docker-compose up --build
```

### Resetting the database

Add a `RESET_DB=true` to `.env` file and run `docker compose run helpugee-db-reset`.
