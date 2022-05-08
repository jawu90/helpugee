## Production build

For a production build, run the following command:

```
docker-compose -f docker-compose.production.yml up --build
```

This builds a static version of the sveltekit applications and serves them through the backend.

## Development

For development, run the following command:

```
docker-compose up --build
```

This runs the dev servers for the webadmin, the webapp and backend where the backend can 

### Resetting the database

Add a `RESET_DB=true` to `.env` file and run `docker compose run helpugee-db-reset`.
