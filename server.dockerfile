FROM node:12.13.0-alpine

WORKDIR /f

COPY . .

RUN npm install
RUN npm run prod
EXPOSE 3001

CMD ["npm", "run", "test"]