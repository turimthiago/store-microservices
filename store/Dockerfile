FROM node:16-alpine
RUN apk update
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY build /app
EXPOSE 3040
ENTRYPOINT [ "node" ]
CMD [  "store/dist/main/index.js" ]