#!/bin/bash
echo "building microservices"
npm run build --prefix ./invoice/
echo "[invoice builded]"
npm run build --prefix ./store/
echo "[store builded]"
echo "builded microservices"
echo "-------------------------------------------------------------------------"
echo "microservices container starting"
docker-compose up --build