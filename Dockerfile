# syntax = docker/dockerfile:1.2

FROM node:lts-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

# Installer le module dotenv
RUN yarn add dotenv
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Production image, copy all the files and run next
FROM node:lts-alpine AS runner
WORKDIR /app

COPY package.json yarn.lock ./

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/schema.graphql ./

USER root
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

USER nextjs

ENV NODE_ENV=production

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

# Charger les variables d'environnement à partir de dotenv
CMD ["yarn", "start"]