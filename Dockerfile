FROM node:alpine

# create directory

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install dependencies

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN npm install -s --global yarn
RUN yarn install

# build source

COPY source source
RUN yarn run build

# install production dependencies

RUN rm -r source/ node_modules/
RUN yarn install --production
RUN npm remove --global yarn

# expose ports

EXPOSE 8080

# run

CMD ["node", "build/server"]
