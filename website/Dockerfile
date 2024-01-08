# First stage: Build the Actix app
FROM rust:1.56 as builder
WORKDIR /usr/src/myapp
COPY . .
RUN cargo install --path .

# Second stage: Set up the Node.js environment
FROM node:14
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

RUN rustup target add wasm32-unknown-unknown
# Install Node.js dependencies
RUN npm install

# Copy the built Actix app from the first stage
COPY --from=builder /usr/local/cargo/bin/myapp .

# Copy the rest of your Node.js app's source code
COPY . .
# Open the necessary port (adjust as needed)
EXPOSE 3000
# Define the runtime command
CMD [ "trunk", "serve", "npm run start"]