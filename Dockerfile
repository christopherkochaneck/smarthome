FROM node:16 as dependencies

COPY package.json yarn.lock ./

RUN npm install

FROM node:lts as builder
WORKDIR /var/www/smarthome
COPY . .
COPY --from=dependencies /var/www/smarthome/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /var/www/smarthome

COPY --from=builder /var/www/smarthome/next.config.js ./
COPY --from=builder /var/www/smarthome/public ./public
COPY --from=builder /var/www/smarthome/.next ./.next
COPY --from=builder /var/www/smarthome/node_modules ./node_modules
COPY --from=builder /var/www/smarthome/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]