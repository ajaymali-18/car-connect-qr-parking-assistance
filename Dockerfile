# Stage 1: Build the Spring Boot application
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and pre-fetch dependencies for better Docker layer caching
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and compile jar
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create a minimal JRE runtime image
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Create a non-root user for security
RUN groupadd -r spring && useradd -r -g spring spring

# Copy compiled jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Set correct ownership
RUN chown -R spring:spring /app
USER spring

# Render dynamically passes PORT; fallback to 8080
ENV PORT=8080
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT} -jar app.jar"]
