FROM node:16-alpine
RUN apk update
WORKDIR /app/core-store
COPY package*.json ./
COPY tsconfig.json ./
COPY src /app/src
RUN ls -a
RUN npm install
RUN npm run build
WORKDIR /app/seller-api
COPY package*.json ./
COPY tsconfig.json ./
COPY src /app/src
RUN ls -a
RUN npm install
EXPOSE 3030
CMD [ "npm", "run", "start" ]