FROM node:16

WORKDIR /app

COPY package*.json /app

RUN npm install -g npm@latest \
	&& npm install \
	&& npm install -g @nestjs/cli \
	&& npm install --save @nestjs/common @nestjs/core @nestjs/typeorm typeorm pg

COPY . /app

CMD ["nest", "start", "--watch"]

EXPOSE 3000