FROM node:16-alpine
RUN apk update
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY build /app
RUN ls -a
RUN npm install
EXPOSE 3030
CMD [ "node", "invoice/dist/main/index.js" ]