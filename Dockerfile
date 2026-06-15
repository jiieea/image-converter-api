FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate --schema=./prisma/schema.prisma
RUN npm run build
RUN ls -la /app/
RUN ls -la /app/dist/
EXPOSE 3000
CMD ["node", "dist/main.js"]