# just-server
  - Create `.env` file with own config
  - run postgres: `docker run -d --name pg -p <your port>:5432 -e POSTGRES_PASSWORD=<DB password> -e POSTGRES_USER=<DB username> -e POSTGRES_DB=<DB name> postgres` 
  - seeders/migrations: `npm run seed`
  
#### JENKIS
  - jenkins with docker
  - postgreSQL: running locally (otherwise run docker container with postgreSQL during pipeline and change `TYPEORM_HOST`)
  
