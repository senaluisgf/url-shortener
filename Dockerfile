ARG NODE_VERSION=$NODE_VERSION
ARG NODE_ENV=$NODE_ENV
ARG PORT=$BACKEND_PORT

FROM node:$NODE_VERSION-alpine

WORKDIR /app

COPY . .

RUN npm install

COPY scripts/entrypoint.sh /app/entrypoint.sh

RUN chmod +x /app/entrypoint.sh

# Expose port using ARG
EXPOSE $PORT

CMD ["sh", "/app/entrypoint.sh"]