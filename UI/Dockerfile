#https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md / node user is available here
FROM node:14 AS builder
#create folder structure with the appropriate permissions -R node:node = -R user:group in linux
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
#change current directory to the app
WORKDIR /home/node/app
COPY --chown=node:node ["package.json", ".env-cmdrc.json", "dev-build.js", "yarn.lock", "./"]
COPY --chown=node:node public ./public
#change the user
USER node
RUN yarn install --frozen-lockfile && yarn dev-build
RUN rm -r ./public  

FROM nginx
#copy nginx configuration file to the docker image
COPY ./nginx-conf /etc/nginx/conf.d
#remove nginx default configuration file from the image
RUN rm /etc/nginx/conf.d/default.conf
#remove default files in the html
RUN rm -r /usr/share/nginx/html
#get the parcel build content and place in the nginx server
COPY --from=builder /home/node/app/dist /usr/share/nginx/html/