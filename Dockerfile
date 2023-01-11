FROM node:lts-alpine
# --platform=arm64 
# The requested image's platform (linux/arm64) does not match the detected host platform (linux/amd64)

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