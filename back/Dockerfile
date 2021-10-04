FROM node:16

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm install -g npm@latest

RUN npm install

RUN npm install -g @nestjs/cli

EXPOSE 3000

CMD ["nest", "start", "--watch"]