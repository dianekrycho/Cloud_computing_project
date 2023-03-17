FROM node:18-alpine

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

#port de lancement
EXPOSE 3000

#commande extraite de package/json : script => start
CMD [ "node", "index.js" ]