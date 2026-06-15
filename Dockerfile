FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++ vips-dev
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
RUN ls -la /app/
RUN ls -la /app/dist/
EXPOSE 3000
CMD ["node", "dist/main.js"]