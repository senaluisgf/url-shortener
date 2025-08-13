#!/bin/bash

npx prisma migrate deploy
npx prisma generate
npx prisma migrate dev
npm run start:prod
exec "$@"