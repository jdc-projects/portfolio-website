ARG IMAGE_TAG=20.5.1-alpine

# Install dependencies only when needed
FROM node:${IMAGE_TAG} AS deps
WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm ci --omit=dev

# Rebuild the source code only when needed
FROM node:${IMAGE_TAG} AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY ./ ./

# Next.js collects anonymous telemetry data about general usage, which we opt out from
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM node:${IMAGE_TAG} AS runner
WORKDIR /app

# Install PM2 to manage node processes
RUN npm install pm2 --location=global

# Disable telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED 1

# Leverage output traces to reduce image size
COPY --from=builder --chown=node /app/.next/standalone ./

USER node

EXPOSE 3000

CMD ["pm2-runtime", "node", "--", "server.js"]
