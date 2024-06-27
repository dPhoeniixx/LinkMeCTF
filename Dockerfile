FROM node:18

# Set the working directory
WORKDIR /app

# Install wget and necessary libraries for Google Chrome
RUN apt-get update && apt-get install -y wget \
    fonts-liberation libappindicator3-1 xdg-utils \
    libasound2 libatk-bridge2.0-0 libatk1.0-0 libcups2 libdbus-1-3 \
    libgdk-pixbuf2.0-0 libnspr4 libnss3 libx11-xcb1 libxcomposite1 \
    libxdamage1 libxrandr2 x11-utils

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build && npx prisma generate && npx prisma migrate dev --name init

# Expose the port the app runs on
EXPOSE 3000
ENV NODE_ENV=production

# Define the command to run the app
CMD ["npm", "start"]