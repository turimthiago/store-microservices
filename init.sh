#!/bin/bash
BOLDGREEN="\033[1;92m"
BOLDBLUE='\033[1;94m'
ENDCOLOR="\e[0m"
GREE='\033[0;102m'
BLUE='\033[0;104m'
CYAN='\033[0;106m'

echo -e "\n\n${BOLDGREEN} ⚙️  BUILDING MICROSERVICES${ENDCOLOR}"
npm run build --prefix ./invoice/
echo -e "\n ➡️  ${BOLDBLUE}INVOICE BUILDED${ENDCOLOR}\n"
npm run build --prefix ./store/
echo -e "\n ➡️  ${BOLDBLUE}STORE BUILDED${ENDCOLOR}\n"
npm run build --prefix ./stock/
echo -e "\n ➡️  ${BOLDBLUE}STOCK BUILDED${ENDCOLOR}\n"
sleep 1
echo -e "\n\n${BOLDGREEN} ✨ FINISH BUILD MICROSERVICES${ENDCOLOR}"
sleep 2
if [ $# -eq 1 ] && [ $1 == 'build' ]
then 
    echo -e "\n\n${BOLDGREEN} 🏗️  REBUILD IMAGES${ENDCOLOR}"
    docker-compose up --build
else
    docker-compose up
fi
echo -e "\n${BOLDGREEN} 🚀 MICROSERVICES STARTED ${ENDCOLOR}"
sleep 2