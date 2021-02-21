FROM node:14

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN npm install -g nodemon

RUN mkdir -p /usr/src/_temp

WORKDIR /usr/src/_temp

COPY package*.json ./
RUN npm ci

WORKDIR /usr/src/app/

RUN ln -s /usr/src/_temp/node_modules /usr/src/app/node_modules

COPY . .

CMD [ "npm", "run", "start" ]