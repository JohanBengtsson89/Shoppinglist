# Stage 1: Build the React (Vite) app
FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Copy frontend files
COPY . .

# Install dependencies
RUN npm install

# Build the production-ready app
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:stable-alpine

# Copy build output to Nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a custom nginx config if you want (optional)

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
