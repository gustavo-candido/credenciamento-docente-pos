FROM node

WORKDIR /sistema_cred/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev:server"]