FROM node:17-alpine3.12 as base

RUN mkdir /home/node/app

RUN mkdir /home/node/app/node_modules && chown -R node:node /home/node/app

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
RUN npm install -g typescript

WORKDIR /home/node/app

COPY *.json /home/node/app/


USER node

RUN echo "Done setting up the base image configuration and files"

# 
FROM base as intermediate
RUN ls -a 
RUN npm install && echo "Done setting up the intermediate image"

FROM intermediate
USER node
COPY --chown=node:node . /home/node/app/
RUN tsc &&  ls -l

EXPOSE 16700

ENTRYPOINT [ "npm", "start" ]