FROM node:latest

#Create app directory
WORKDIR /usr/src/app

RUN npm install nodemon -g

RUN npm install -g @angular/cli

EXPOSE 8080
RUN  nodemon

