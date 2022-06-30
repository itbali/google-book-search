FROM node:16.14.2-buster
WORKDIR /google-book-search

COPY package.json .
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn","start"]
