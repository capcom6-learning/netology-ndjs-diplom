# Stage 1: Build the application
FROM node:20 AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock if you use yarn)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS production

# Set working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built assets from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main.js"]
