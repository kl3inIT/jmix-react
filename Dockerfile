# ================================
# STAGE 1: BUILD (Gradle)
# ================================
FROM registry.access.redhat.com/ubi9/openjdk-21 AS builder

# 🔥 BUILD TRONG /tmp (writable)
WORKDIR /tmp/app

# Copy gradle wrapper & config
COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./

# Ép user cache
RUN sh gradlew \
    -g /tmp/gradle \
    dependencies \
    --no-daemon || true

# Copy source
COPY . .

# 🔥 Project cache giờ nằm ở /tmp/app/.gradle → OK
RUN sh gradlew \
    -g /tmp/gradle \
    -Pvaadin.productionMode=true \
    bootJar \
    -x test \
    --no-daemon


# ================================
# STAGE 2: RUNTIME
# ================================
FROM registry.access.redhat.com/ubi9/openjdk-21-runtime

WORKDIR /deployments

COPY --from=builder /tmp/app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
