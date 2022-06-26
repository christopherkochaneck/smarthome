FROM node:16 as dependencies

RUN npm install

FROM node:lts as builder

RUN yarn build

FROM node:lts as runner

EXPOSE 3000
CMD ["yarn", "start"]