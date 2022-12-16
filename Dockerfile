# syntax = docker/dockerfile:1.2

# Install dependencies only when needed
FROM node:alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update && apk add --no-cache libc6-compat && apk add git
WORKDIR /app

# Copy "package.json" and "yarn.lock" before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package.json yarn.lock ./

RUN yarn install --immutable --immutable-cache --check-cache

# Install PM2 globally
#RUN yarn global add pm2

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app

#RUN --mount=type=secret,id=DATABASE_URL \
#  --mount=type=secret,id=NEXT_PUBLIC_PROD_WEB_ROOT \
#  --mount=type=secret,id=NEXT_PUBLIC_TEST \
#   export DATABASE_URL=$(cat /run/secrets/DATABASE_URL) && \
#   export NEXT_PUBLIC_PROD_WEB_ROOT=$(cat /run/secrets/NEXT_PUBLIC_PROD_WEB_ROOT) \
#   export NEXT_PUBLIC_TEST=$(cat /run/secrets/NEXT_PUBLIC_TEST)

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_PUBLIC_TEST=$NEXT_PUBLIC_TEST
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_PROD_WEB_ROOT=$NEXT_PUBLIC_PROD_WEB_ROOT

RUN yarn build

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /app

ENV NODE_ENV production

#RUN addgroup -g 1001 -S nodejs
#RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration.
# Copy all necessary files used by nex.config as well otherwise the build will fail.
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/schema.graphql ./schema.graphql

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
#COPY --from=builder --chown=bloguser:nextjs /app/.next/standalone ./
#COPY --from=builder --chown=bloguser:nextjs /app/.next/static ./.next/static

# TODO temporally run with root privileges (default)
# Run container as non-root (unprivileged) user
#USER nextjs

ENV PORT 80
EXPOSE 80

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

CMD [ "yarn", "start", "-p", "80" ]

