# Development mode Dockerfile for Vite React app
FROM node:20-alpine

WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package*.json ./

# Install dependencies (including dev dependencies for development)
RUN npm ci

# Copy source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start development server with host binding for Docker access
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]