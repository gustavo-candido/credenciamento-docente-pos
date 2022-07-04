FROM node:16.15.1-alpine

RUN apk add g++ make py3-pip

WORKDIR /sistema_cred/app

COPY package.json ./

RUN npm install --omit=dev

COPY ./dist ./dist

EXPOSE 3000

CMD ["npm", "run", "prod:server"]