FROM node:12.8.0-alpine
COPY . .

RUN npm install

EXPOSE 3001
RUN npm run server

CMD [ "npm", "run", "tests" ]