# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json tsconfig.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript -> JavaScript
RUN npm run build

# Expose port (tuỳ theo server bạn chạy ở cổng nào, ví dụ: 5000)
# EXPOSE 8080

# Start server
CMD ["npm", "run", "dev"]
