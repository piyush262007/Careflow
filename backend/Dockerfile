# Build Stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -DskipTests

# Runtime Stage
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
RUN addgroup --system careflow && adduser --system --ingroup careflow careflow
COPY --from=build /app/target/careflow-backend-0.0.1-SNAPSHOT.jar app.jar
RUN mkdir -p /app/uploads && chown -R careflow:careflow /app
USER careflow

EXPOSE 8080
ENV SPRING_PROFILES_ACTIVE=prod

ENTRYPOINT ["java", "-jar", "-Djava.security.egd=file:/dev/./urandom", "app.jar"]
