# Use whatever version you are running locally (see node -v)
FROM node:12.18

WORKDIR /app

# Install dependencies (you are already in /app)
COPY package.json package-lock.json ./
RUN npm ci

# Add rest of the client code
# .dockerignore needs to skip node_modules
COPY . /app

EXPOSE 3000

CMD ["npm", "start"]