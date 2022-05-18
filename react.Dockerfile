FROM node:18-alpine
WORKDIR /app
COPY ./notify-frontend .
RUN yarn install
CMD ["yarn", "start"]   