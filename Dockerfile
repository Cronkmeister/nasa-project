FROM node:lts-alpine

WORKDIR /app

# copy files from 'nasa-project' to app working directory 
COPY package*.json ./ 

# only install production dependencies in Docker Image
COPY client/package*.json client/
RUN npm run install-client --omit=dev

COPY server/package.json server/
RUN npm run install-server --omit=dev

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node

CMD [ "npm", "start", "--prefix", "server" ]

EXPOSE 8000