# Build stage
FROM node:18 AS builder

WORKDIR /app

COPY package*.json tsconfig.json vite.config.* ./
COPY . .

RUN npm install
RUN npm run build

# Serve stage (static files)
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config if needed
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
