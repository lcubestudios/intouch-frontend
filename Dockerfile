FROM node:14.18.2

#create destination directory
RUN mkdir -p /intouch/
WORKDIR /intouch

#update and install dependency
#RUN apk update && apk upgrade

#copy the app, note .dockerignore
COPY . /intouch
COPY package*.json /intouch
RUN yarn install

#build necessary, even if no static files are needed, 
#since it builds the server as well
#RUN yarn build

#RUN yarn generate
#RUN yarn generate --fail-on-error

#exposer 8080 on container
EXPOSE 8080

#start the app
CMD ["yarn","serve"]