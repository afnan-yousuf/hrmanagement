# Add image for node
FROM node:22-alpine

# Working directory setting
WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build the project
RUN npm run build

# Expose Port
EXPOSE 3000

# Run App
CMD ["npm","start"]