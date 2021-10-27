FROM node:16

WORKDIR /app

COPY package*.json /app/

RUN npm install -g npm@latest \
	&& npm install \
	&& npm install -g @nestjs/cli  \
	&& npm install --save @nestjs/config @nestjs/common @nestjs/core @nestjs/typeorm typeorm pg \
	&& npm install --save class-validator \
	&& npm install --save @nestjs/passport passport passport-42 \
	&& npm i -D @types/multer @types/node \
	&& npm i --save @nestjs/axios \
	&& npm install --save-dev @types/passport-jwt \
	&& npm install --save @nestjs/jwt passport-jwt


COPY . /app/

CMD ["nest", "start", "--watch"]

EXPOSE 3000