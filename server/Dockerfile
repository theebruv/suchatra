# Base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy source code
COPY . .

# Expose port
EXPOSE 4000

# Start server
CMD ["yarn", "start"]
