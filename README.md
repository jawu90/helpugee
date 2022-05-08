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

Use `RESET_DB=true docker compose up helpugee-db-reset` to reset the database or initialize it.
