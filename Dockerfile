FROM node:22-alpine
RUN apt-get update && apt.get install -y \
    libreoffice-writer \
    libreoffice-core \
    --no-install-recommends \
     && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate --schema=./prisma/schema.prisma
RUN npm run build
RUN ls -la /app/
RUN ls -la /app/dist/
EXPOSE 3000
CMD ["node", "dist/src/main.js"]