FROM node:16.15-slim
WORKDIR /app
COPY . /app
RUN npm install
CMD ["npm", "start"]