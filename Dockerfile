# ========================
# 1. Build stage
# ========================

# Use an official Node.js runtime as a parent image
FROM node:22-alpine AS builder

# Set the working directory io the container
WORKDIR /app

# Copy the package.json and the package-lock.json into the cotainer
COPY package*.json .

# Install the dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the React frontend
RUN npm run build

# ========================
# 2. Production stage
# ========================

FROM node:22-alpine AS production
WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the application code and the built frontend from the builder stage
COPY . .
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["node", "./src/server.js"]