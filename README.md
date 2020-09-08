# Desafio-Database-upload
docker run --name gostack-postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
docker run gostack-postgres

yarn typeorm migration:run
