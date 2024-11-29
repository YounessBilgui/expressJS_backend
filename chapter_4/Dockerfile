# user an official node.js runtime as a parten image

FROM node:22-alpine

# set the working dir in the container

WORKDIR /app

# copy the package.json and the package-lock.json files to the container

COPY package*.json .

# install the dependencies

RUN npm install

# copy the rest of the application de 

COPY . .

# expose the port that the app runs on 

EXPOSE 5003

# difine the command to run your app 
CMD ["node", "./src/server.js"]