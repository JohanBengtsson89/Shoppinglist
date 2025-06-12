# Stage 1: Build
FROM maven:3.9.6-amazoncorretto-17 AS build

WORKDIR /app

# Copy Maven wrapper scripts and project files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Pre-download dependencies
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# Copy the actual source code
COPY src src

# Build the project
RUN ./mvnw package -DskipTests

# Stage 2: Run
FROM amazoncorretto:17

WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
