FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000

CMD [ "npm", "start" ]


# How to run with Docker: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
# The app need a API Key, as a Env Var, so pass it 
# This should run the npm start so the app will run.
# docker run -p 49160:3000 -d -e QUANDL_API_KEY=YouAPIKeyHere <yourUsername>/node-web-app 