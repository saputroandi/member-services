FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

ENV SECRET_KEY ""
ENV APP_PORT 3000
ENV MESSAGE_BROKER_HOST "your_broker_host"
ENV DB_HOST "your_db_host"
ENV DB_NAME "member_services"
ENV DB_USERNAME "your_db_username"
ENV DB_PASSWORD "your_db_password"

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]