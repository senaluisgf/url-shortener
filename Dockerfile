ARG NODE_VERSION=$NODE_VERSION
ARG NODE_ENV=$NODE_ENV
ARG PORT=$BACKEND_PORT

# Build stage
FROM node:$NODE_VERSION-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate
RUN npx prisma migrate dev

# Build the application
RUN npm run build

# Production stage
FROM node:$NODE_VERSION-alpine AS production

WORKDIR /app

# Set runtime environment variables
ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT

# Copy package files
COPY package*.json ./

# Install only production dependencies
# RUN npm ci --omit=dev
RUN npm ci

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Change ownership of the app directory
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expose port using ARG
EXPOSE $PORT

# Start the application using ENV variable
CMD ["node", "dist/main.js"] 