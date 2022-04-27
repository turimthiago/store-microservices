FROM node:16-alpine
RUN apk update
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY build /app
RUN ls -a
RUN npm install
EXPOSE 3040
CMD [ "node", "store/dist/main/index.js" ]