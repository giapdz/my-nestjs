FROM node:12.19.0-alpine3.9 

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --silent

COPY . .

CMD ["npm", "run", "start:dev"]


