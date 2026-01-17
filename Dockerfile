# ================================
# STAGE 1: BUILD (NO CACHE)
# ================================
FROM registry.access.redhat.com/ubi9/openjdk-21 AS builder

# Build trong thư mục writable
WORKDIR /tmp/app

# Copy toàn bộ source
COPY . .

# Build Jmix KHÔNG cache
RUN sh gradlew \
    -Pvaadin.productionMode=true \
    bootJar \
    -x test \
    --no-daemon \
    --no-build-cache


# ================================
# STAGE 2: RUNTIME
# ================================
FROM registry.access.redhat.com/ubi9/openjdk-21-runtime

WORKDIR /deployments

COPY --from=builder /tmp/app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
