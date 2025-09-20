# Development mode Dockerfile for Vite React app
FROM node:18

WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package*.json ./

# Install dependencies (including dev dependencies for development)
# RUN npm ci
RUN npm install

# Copy source code
COPY . .

# Expose Vite dev server port
# EXPOSE 8080

# Start development server with host binding for Docker access
CMD ["npm", "run", "dev"]