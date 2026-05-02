# Stage 1: install production dependencies
FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev


# Stage 2: production runtime
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY src ./src

USER node

EXPOSE 5001

CMD ["npm", "start"]
