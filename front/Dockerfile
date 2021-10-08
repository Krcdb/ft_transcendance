FROM node:16

WORKDIR /app

COPY package*.json /app/

RUN npm install -g npm@latest \
	&& npm install \
	&& npm install -g @vue/cli \
	&& npm install --save axios

COPY . /app/

CMD ["npm", "run", "serve"]

EXPOSE 8080
