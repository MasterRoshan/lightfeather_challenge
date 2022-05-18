FROM node:18-alpine
WORKDIR /app
COPY ./notify-frontend .
CMD ["yarn", "start"]   