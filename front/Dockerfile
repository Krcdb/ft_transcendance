FROM node:16

WORKDIR /app

COPY package*.json /app/

RUN npm install -g npm@latest \
	&& npm install \
	&& npm install -g @vue/cli \
	&& npm install vuex --save \
	&& npm install vue-3-socket.io --save \
	&& npm install vue-socket.io --save \
	&& npm install --save axios vue-property-decorator \
	&& npm i mdb-ui-kit

COPY . /app/

CMD ["npm", "run", "serve"]

EXPOSE 8080
