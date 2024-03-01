FROM node:21 AS ng-builder

RUN npm i -g @angular/cli

WORKDIR /ngapp

# . represents to use the same name e.g. /ngapp/package*.json
# frontend is the file name in this case
# Need to do this as your dockerfile is at the same level as your frontend/backend folder.
COPY client/package*.json .
COPY client/angular.json .
COPY client/tsconfig.* .
COPY client/src src

# Commands in the cli
RUN npm ci && ng build

# Start 2nd stage
# Starting with this Linux server
FROM maven:3-eclipse-temurin-21 AS sb-builder

## Build the application
# Create a directory call /app
# go into the directory cd /app
WORKDIR /sbapp

# everything after this is in /app
# Same as above, but we are using articles in this case (use "backend" in assessment plssss)
COPY mvnw .
COPY mvnw.cmd .
COPY pom.xml .
COPY .mvn .mvn
COPY src src
COPY --from=ng-builder /ngapp/dist/client-side/browser/ src/main/resources/static

# Build the application
RUN mvn package -Dmaven.test.skip=true

# Start 3rd stage
FROM openjdk:21-jdk-bullseye

WORKDIR /app 

COPY --from=sb-builder /sbapp/target/articles-0.0.1-SNAPSHOT.jar emart-app.jar

## Run the application
# Define environment variable 
ENV PORT=8080 
ENV SPRING_DATA_MONGODB_URI=

# Expose the port
EXPOSE ${PORT}

# Run the program
ENTRYPOINT SERVER_PORT=${PORT} java -jar emart-app.jar