FROM node:latest

#Create app directory
WORKDIR /usr/src/app

RUN npm install nodemon -g

EXPOSE 8080
RUN  nodemon

