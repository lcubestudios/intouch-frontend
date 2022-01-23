FROM node:14.18.2-alpine

#create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

#update and install dependency
RUN apk update && apk upgrade
RUN apk add git

#copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN yarn install

#build necessary, even if no static files are needed, 
#since it builds the server as well
RUN yarn build
RUN yarn generate
RUN yarn generate --fail-on-error

#exposer 5000 on container
EXPOSE 5000

#set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
#set app port 
ENV NUXT_PORT=5000

#start the app
CMD ["yarn","start"]

##commands to docker //docker build -t dennystest . 
#                    //docker run -it -p 5000:5000 dennystest%