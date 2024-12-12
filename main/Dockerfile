FROM node:22.12.0

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4444

CMD ["node", "index.js"]