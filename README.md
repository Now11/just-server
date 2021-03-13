### To run the server
  - Create `.env` file with own config
  - run postgres: `docker run -d --name pg -p <your_port>:5432 -e POSTGRES_PASSWORD=<DB password> -e POSTGRES_USER=<DB username> -e POSTGRES_DB=pet_db postgres` 
  - migrations: `npm run migrations`
