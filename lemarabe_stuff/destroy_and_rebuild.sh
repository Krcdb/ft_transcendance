#!/bin/sh
docker-compose down --volumes
docker system prune -af
COMPOSE_HTTP_TIMEOUT=120 docker-compose up --build