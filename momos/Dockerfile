FROM node:14-alpine3.15 as base

RUN mkdir /home/node/app

RUN mkdir /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY *.json /home/node/app/


USER node

RUN echo "Done setting up the base image configuration and files"

# 
FROM base as intermediate
RUN ls -a 
RUN npm install --legacy-peer-deps  && echo "Done setting up the intermediate image"

FROM intermediate
WORKDIR /home/node/app
COPY --chown=node:node . /home/node/app/
RUN echo "Building production ready application" && npm run build
RUN ls -l

EXPOSE 16800

ENTRYPOINT [ "npm", "start" ]