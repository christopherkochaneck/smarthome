FROM node:lts

COPY package.json /app/package.json
WORKDIR /app
RUN ["npm", "install", "--force"]

COPY . /app

RUN ["npm", "run", "build"]

EXPOSE 3001