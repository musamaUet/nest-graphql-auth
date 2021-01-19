FROM node:10

WORKDIR /usr/app
# copy package.json from local directory to WORKDIR
COPY ./package.json ./
RUN npm install
COPY ./ ./
EXPOSE 3000
CMD ["npm", "start"]
