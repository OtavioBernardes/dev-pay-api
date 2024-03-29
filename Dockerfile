FROM node:14

WORKDIR /home/Development/dev-pay-api

COPY package.json .

COPY .env .
RUN npm install

COPY . .

CMD npm run dev