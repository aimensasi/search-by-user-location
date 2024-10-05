# Build stage
FROM node:18-bullseye AS builder

ENV DEBIAN_FRONTEND noninteractive
ENV LC_ALL en_US.UTF-8
ENV LANG ${LC_ALL}

# Install necessary build tools and dependencies
RUN apt-get update -y && \
    apt-get install -y build-essential python3 && \
    apt-get clean && \
    update-alternatives --install /usr/local/bin/python python /usr/bin/python3 20 && \
    npm install -g pnpm && \
    sync

WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml (if available)
COPY package.json pnpm-lock.yaml* ./

# Install all dependencies, including devDependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN pnpm run build

# Rebuild bcrypt from source
RUN npm rebuild bcrypt --build-from-source

# Production stage
FROM node:18-bullseye-slim

ENV NODE_ENV production
ENV PORT 80

WORKDIR /usr/src/app

# Copy built assets from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./

# Expose the port the app runs on
EXPOSE 3006

# Run the application
CMD ["node", "dist/src/main.js"]


