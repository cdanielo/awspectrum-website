FROM node:20.12.0-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production && cp -r node_modules /app/node_modules_prod && npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src ./src
RUN npm run build

FROM node:20.12.0-alpine AS runtime

WORKDIR /app

RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup

COPY --from=build /app/node_modules_prod ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist ./dist

RUN npx prisma generate

USER appuser

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
