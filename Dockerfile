FROM node:12.19.0-alpine3.9 AS dev
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
COPY . .
CMD ["npm", "run", "start:dev"]

FROM dev as testing
COPY tests ./
ENV CI=true
CMD ["npm", "run", "test"]

FROM dev as prod
LABEL version="1.0" "com.example.image"="My Image"
CMD ["npm", "run", "start"]
