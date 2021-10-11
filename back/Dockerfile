FROM node:16

WORKDIR /app

COPY package*.json /app/

RUN npm install -g npm@latest \
	&& npm install \
	&& npm install -g @nestjs/cli \
	&& npm install --save @nestjs/common @nestjs/core @nestjs/typeorm typeorm pg
	# && npm install --save @nestjs/passport passport passport-local \
	# && npm install --save-dev @types/passport-local

COPY . /app/

CMD ["nest", "start", "--watch"]

EXPOSE 3000