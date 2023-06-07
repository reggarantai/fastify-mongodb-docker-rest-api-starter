FROM node:18-alpine
WORKDIR /usr/app
RUN apk add dumb-init
RUN chown node:node /usr/app
USER node
COPY --chown=node:node ./package*.json /usr/app
RUN npm install
COPY --chown=node:node . /usr/app
CMD ["dumb-init", "npm", "run", "server"]