# Use Node 20 LTS
FROM node:20

WORKDIR /app

# Copy root package files for caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy backend package.json
COPY backend/package.json ./backend/package.json

# Install pnpm and TypeScript globally
RUN npm install -g pnpm typescript

# Install root dependencies
RUN pnpm install

# Set working directory to backend
WORKDIR /app/backend

# Install backend dependencies (including devDependencies for build)
RUN pnpm install

# Copy backend source
COPY backend/src ./src
COPY backend/tsconfig.json ./tsconfig.json

# Copy shared folder for TypeScript
COPY shared ../shared

# Copy frontend dist
COPY frontend/dist ../frontend/dist

# Build backend
RUN tsc

EXPOSE 4000

# Start backend
CMD ["node", "-r", "tsconfig-paths/register", "dist/backend/src/index.js"]
