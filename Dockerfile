# =====================================
# STAGE 1: BUILD (Gradle, non-root safe)
# =====================================
FROM registry.access.redhat.com/ubi9/openjdk-21 AS builder

WORKDIR /app

# Copy Gradle wrapper & config trước để cache dependency
COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./

# ÉP Gradle cache vào /tmp (writable trên OpenShift)
RUN sh gradlew \
    -g /tmp/gradle \
    dependencies \
    --no-daemon || true

# Copy toàn bộ source
COPY . .

# Build Jmix (Vaadin production)
RUN sh gradlew \
    -g /tmp/gradle \
    -Pvaadin.productionMode=true \
    bootJar \
    -x test \
    --no-daemon


# =====================================
# STAGE 2: RUNTIME (small, secure)
# =====================================
FROM registry.access.redhat.com/ubi9/openjdk-21-runtime

WORKDIR /deployments

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

# OpenShift inject random UID → OK
ENTRYPOINT ["java","-jar","app.jar"]
