FROM node:16-alpine
RUN apk update
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY build /app
RUN ls -a
RUN npm install
EXPOSE 3050
CMD [ "npm", "run", "start" ]