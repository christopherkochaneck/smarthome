FROM node:16

WORKDIR /var/app
COPY . /var/app

RUN npm install

RUN npm run build

EXPOSE 3000
CMD ["yarn", "start"]