FROM vuejs/ci

WORKDIR /usr/src/vue-app

# we only need to install dependencies for dev since the volume is bound at runtime
COPY package.json ./

RUN yarn install

EXPOSE 8080

CMD ["yarn", "run", "serve"]