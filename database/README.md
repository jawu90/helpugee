# Setting Up the Database

## Prequesits
The following software is required and must be installed:
- Docker
- [Postgres Command Line Tools](https://www.postgresql.org/download/)
  - The Postgres installer includes the Command Line Tools (the rest can be ignored)
  - psql must then be added to the PATH system variable (Windows)


## Docker
1. Download the Postgres Docker image

`sudo docker pull postgis/postgis`

2. Creating the required container with username, password and database

`sudo docker run --name helpugee-postgres-db -p 5432:5432 -e POSTGRES_PASSWORD=pass -e POSTGRES_USER=admin -e POSTGRES_DB=helpugee -d postgis/postgis`

# Create Tables

For each table there is a sql script (e.g. "user.sql") that creates the corresponding relation and optional required initial data.

Note: The access data for the default users can be found in the backend readme.

## Run SQL Scripts

To run the SQL scripts you need to be in the "team1\database" directory and run the following script.
The password that is asked for is the same that was specified when creating the Docker container.

`bash .\init.cmd`

Alternatively, the command can be executed in the init.cmd file

`psql -h 127.0.0.1 -U admin -d helpugee -f deleteTables -f user.sql`


## New Tables
To create a new table, you need to create a .sql file and add it to the init file.
