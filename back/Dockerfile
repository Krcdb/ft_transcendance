FROM node:16

WORKDIR /app

COPY package*.json /app/

RUN npm install -g npm@latest \
	&& npm install \
	&& npm install -g @nestjs/cli  \
	&& npm install --save @nestjs/config @nestjs/common @nestjs/core @nestjs/typeorm typeorm pg \
	&& npm install --save class-validator \
	&& npm i --save @nestjs/passport passport \
	&& npm install passport-42 \
	&& npm i -D @types/multer @types/node \
	&& npm i --save @nestjs/axios


COPY . /app/

CMD ["nest", "start", "--watch"]

EXPOSE 3000