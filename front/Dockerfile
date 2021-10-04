FROM node:16

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm install -g npm@latest

RUN npm install

RUN npm install -g @vue/cli

EXPOSE 8080

CMD ["npm", "run", "serve"]